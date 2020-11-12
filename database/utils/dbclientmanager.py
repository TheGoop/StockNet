import firebase_admin
from firebase_admin import firestore, credentials


class DBClientManager():
    def __init__(self,credentials=None):
        if credentials:
            self.app = firebase_admin.initialize_app(credentials)
        else:
            self.app = firebase_admin.initialize_app()
        self.db = firestore.client()

    # def __del__(self):
    #     firebase_admin.delete_app(self.app)

    def getDBConnection(self):
        return self.db


def runTests():
    manager1 = DBClientManager()
    db = manager1.getDBConnection()
    doc_ref = db.collection(u'users').document(u'goop')
    doc_ref.set({
        u'first': u'Block',
        u'last': u'Shay',
        u'born': 1923
    })

if __name__ == "__main__":
    runTests()
