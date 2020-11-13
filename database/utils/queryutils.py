from firebase_admin import firestore

from database.payloadClasses.postcontententry import PostContentEntry


def storePost(db,postID,postContent):
    postID = str(postID)
    db.collection('Posts').document(postID).set(postContent.to_dict())

def storePostTag(db,tag,postID, taggedPostEntry):
    postID = str(postID)
    db.collection('Tags').collection(tag).document(postID).set(taggedPostEntry.to_dict())

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


def __testSinglePostStore():
    from database.utils.dbclientmanager import DBClientManager
    manager = DBClientManager()
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


def runTests():
    __testSinglePostStore()


if __name__ == "__main__":
    runTests()

