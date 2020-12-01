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

if __name__ == "__main__":
    from database.unitTesting.databaseUtilsTests.dbClientManagerTesting import runTests
    runTests()
