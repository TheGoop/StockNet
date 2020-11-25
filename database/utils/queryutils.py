from firebase_admin import firestore

from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry


def storePost(db,postID,postContent):
    postID = str(postID)
    db.collection('Posts').document(postID).set(postContent.to_dict())

def storePostTag(db,tag, taggedPostEntry):
    #document 'tag' format
    transaction = db.transaction()
    postRef = db.collection("Tags").document(tag)
    result = __transactionalPostTagStore(transaction,postRef)
    return result

@firestore.transactional
def __transactionalPostTagStore(transaction, postRef, taggedPostEntry):
    snapshot = postRef.get(transaction=transaction)
    prevPosts = []
    if snapshot.exists:
        prevPosts = snapshot.to_dict()['posts']
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
        transaction.set(postRef,prevPosts)
        return True
    return False



def storeAuthentication(db, username, authenticationEntry):
    db.collection('Authentication').document(username).set(authenticationEntry.to_dict())

def storeUserProfile(db, userID, userProfileEntry):
    userID = str(userID)
    db.collection('Users').document(userID).set(userProfileEntry.to_dict())

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

#TODO change tag subcollection to a document containing a list of taggedPostEntry
def fetchDocumentsUnderTag(db,tag):
    return db.collection('Tags').collection(tag).stream()


def fetchPostsUnderTag(db,tag):
    docs = fetchDocumentsUnderTag(db,tag)
    if not docs:
        raise KeyError("No posts found under tag",tag)
    postContents = []
    for doc in docs:
        postContents.append(PostContentEntry.from_dict(doc.to_dict))
    return postContents


def __testSinglePostStore(manager):
    db = manager.getDBConnection()
    post1 = PostContentEntry(5005,800,"Sample Post Test 1")
    post2 = PostContentEntry(8000,900,"Sample Post Test 2",98,["+1"])
    print(post1)
    print(post2)
    storePost(db,1,post1)
    storePost(db, 2, post2)
    post3 = readPostbyID(db,1)
    post4 = readPostbyID(db,2)
    print(post3)
    print(post4)
    assert (str(post1) == str(post3))
    assert (str(post2) == str(post4))

def __testTagging(manager):
    db = manager.getDBConnection()
    postID1 = 1001
    postID2 = 1002
    postID3 = 1003
    postID4 = 1004
    post1 = PostContentEntry(1, 800, "Tagged Post 1")
    post2 = PostContentEntry(2, 800, "Tagged Post 2")
    post3 = PostContentEntry(3, 800, "Tagged Post 3")
    post4 = PostContentEntry(4, 800, "Tagged Post 4")
    tagEntry = TaggedPostEntry(800)
    storePostTag(db,"Tag1",postID1,tagEntry)
    storePostTag(db,"Tag2",postID2,tagEntry)
    storePostTag(db,"Tag2",postID3,tagEntry)
    storePostTag(db,"Tag2",postID4,tagEntry)
    storePost(db,postID1,post1)
    storePost(db,postID2,post2)
    storePost(db,postID3,post3)
    storePost(db,postID4,post4)
    print(post1)
    print(post2)
    print(post3)
    print(post4)
    tag1Posts = fetchPostsUnderTag(db,"Tag1")
    tag2Posts = fetchPostsUnderTag(db,"Tag2")
    for post in tag1Posts:
        print(post)
    for post in tag2Posts:
        print(post)




def runTests():
    from database.utils.dbclientmanager import DBClientManager
    manager = DBClientManager()
    __testSinglePostStore(manager)
    __testTagging(manager)


if __name__ == "__main__":
    runTests()

