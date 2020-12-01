from database.payloadClasses.authenticationEntry import AuthenticationEntry
from database.utils.dbclientmanager import DBClientManager
from database.utils.queryutils import storeAuthentication, removeAuthenticationEntry


def propogateAuthenticationforDeletion(manager):
    db = manager.getDBConnection()

    entry1 = AuthenticationEntry("Sample Password for Deletion 1")
    entry2 = AuthenticationEntry("Sample Password for Deletion 2")
    entry3 = AuthenticationEntry("Sample Password for Deletion 3")

    storeAuthentication(db, "Sample User 1", entry1)
    storeAuthentication(db, "Sample User 2", entry2)
    storeAuthentication(db, "Sample User 3", entry3)

def deletePropogatedAuthentication(manager):
    db  = manager.getDBConnection()
    removeAuthenticationEntry(db, "Sample User 1")
    removeAuthenticationEntry(db, "Sample User 2")
    removeAuthenticationEntry(db, "Sample User 3")

if __name__ == "__main__":
    manager = DBClientManager()
    deletePropogatedAuthentication(manager)