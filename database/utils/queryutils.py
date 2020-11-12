from database.payloadClasses.postcontententry import PostContentEntry


def storePost(db,postID,postContent):
    db.collection('Posts').document(postID).set(postContent.to_dict())

def readPostbyID(db,postID):
    doc_ref = db.collection('Posts').document(postID)
    doc = doc_ref.get()
    if doc.exists:
        return PostContentEntry.from_dict(doc.to_dict())

def runTests():
    return

if __name__ == "__main__":
    runTests()

