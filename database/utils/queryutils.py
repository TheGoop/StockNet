from firebase_admin import firestore

from database.payloadClasses.authenticationEntry import AuthenticationEntry
from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.payloadClasses.userprofileentry import UserProfileEntry


def storePost(db,postID,postContent):
    postID = str(postID)
    db.collection('Posts').document(postID).set(postContent.to_dict())

def addComment(db,postID,commentEntry):
    postID = str(postID)
    try:
        db.collection('Posts').document(postID).update({'comments': firestore.ArrayUnion([commentEntry.to_dict()])})
    except Exception:
        raise KeyError("Post ID not found in database", postID)


def readPostbyID(db,postID):
    postID = str(postID)
    doc_ref = db.collection('Posts').document(postID)
    doc = doc_ref.get()
    if doc.exists:
        return PostContentEntry.from_dict(doc.to_dict())
    else:
        raise KeyError("Post ID not found in database",postID)


def deletePostEntry(db, postID):
    db.collection('Posts').document(postID).delete()

def storePostTag(db,tag, taggedPostEntry):
    #document 'tag' format
    transaction = db.transaction()
    postRef = db.collection("Tags").document(tag)
    result = __transactionalPostTagStore(transaction,postRef,taggedPostEntry)
    if not result:
        raise KeyError("Post ID attempting to be stored is already in the database", taggedPostEntry.postID)


def checkForRepeatedPostIDs(prevPosts, postID):
    for post in prevPosts:
        if post['postID'] == postID:
            return False

    return True


@firestore.transactional
def __transactionalPostTagStore(transaction, postRef, taggedPostEntry):
    snapshot = postRef.get(transaction=transaction)
    prevPosts = []
    if snapshot.exists:
        prevPosts = snapshot.to_dict()['posts']
        if not checkForRepeatedPostIDs(prevPosts,taggedPostEntry.postID):
            return False
        currTime = taggedPostEntry.time
        inserted = False
        for (i, prevPostEntries) in enumerate(prevPosts):
            if currTime >= prevPostEntries["time"]:
                prevPosts.insert(i,taggedPostEntry.to_dict())
                inserted = True
                break
        if not inserted:
            prevPosts.append(taggedPostEntry.to_dict())
        transaction.update(postRef,{
            'posts': prevPosts
        })
        return True
    else:
        prevPosts.append(taggedPostEntry.to_dict())
        transaction.set(postRef,{
            'posts' : prevPosts
        })
        return True

def fetchDocumentsUnderTag(db,tag):
    tagRef = db.collection('Tags').document(tag)
    tagData = tagRef.get()
    if tagData.exists:
        return tagData.to_dict()['posts']
    else:
        raise KeyError("No posts found under tag", tag)

def fetchPostsUnderTag(db,tag):
    docs = fetchDocumentsUnderTag(db,tag)
    if not docs:
        raise KeyError("No posts found under tag",tag)
    postContents = []
    for doc in docs:
        postContents.append(readPostbyID(db,doc['postID']))
    return postContents

def deletePostUnderTag(db,tag,postID):
    transaction = db.transaction()
    postRef = db.collection("Tags").document(tag)
    result = __transactionalPostTagDelete(transaction, postRef, postID)
    if not result:
        raise KeyError("Tag does not exist", tag)

@firestore.transactional
def __transactionalPostTagDelete(transaction, postRef, postID):
    snapshot = postRef.get(transaction=transaction)
    if snapshot.exists:
        prevPosts = snapshot.to_dict()['posts']
        for (i,post) in enumerate(prevPosts):
            if post['postID'] == postID:
                prevPosts.pop(i)
                break
        transaction.update(postRef, {
            'posts': prevPosts
        })
        return True
    else:
        return False


def storeAuthentication(db, username, authenticationEntry):
    db.collection('Authentication').document(username).set(authenticationEntry.to_dict())

def fetchAuthentication(db,username):
    authenticationData = db.collection('Authentication').document(username).get()
    if authenticationData.exists:
        return AuthenticationEntry.from_dict(authenticationData.to_dict())
    else:
        raise KeyError("No authentication data found for user", username)

def storeUserProfile(db, userName, userProfileEntry):
    db.collection('Users').document(userName).set(userProfileEntry.to_dict())

def fetchUserProfile(db,userName):
    profiledata = db.collection('Users').document(userName).get()
    if profiledata.exists:
        return UserProfileEntry.from_dict(profiledata.to_dict())
    else:
        raise KeyError("No profile data found for user", userName)


if __name__ == "__main__":
    from database.unitTesting.queryTests.queryTestRunner import runTests
    runTests()

