#WARNING: This method will delete all documents in a collection
#This code is very slow and should not be used in production at all
def flushCollection(db,collectionName):
    documents = db.collection(collectionName).stream()
    for doc in documents:
        doc.reference.delete()
