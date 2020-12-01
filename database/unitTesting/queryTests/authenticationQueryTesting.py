from database.payloadClasses.authenticationEntry import AuthenticationEntry

from database.utils.queryutils import storeAuthentication, fetchAuthentication


def testAuthenticationStoring(manager):
    db = manager.getDBConnection()

    entry1 = AuthenticationEntry("hunter2")
    entry2 = AuthenticationEntry("akshayIsTheGoat")
    entry3 = AuthenticationEntry("whaleGoMiao")

    print(entry1)
    print(entry2)
    print(entry3)

    storeAuthentication(db,"Goop",entry1)
    storeAuthentication(db,"DM07",entry2)
    storeAuthentication(db,"Blizzard",entry3)

    readEntry1 = fetchAuthentication(db,"Goop")
    readEntry2 = fetchAuthentication(db, "Blizzard")
    readEntry3 = fetchAuthentication(db, "DM07")

    print(readEntry1)
    print(readEntry2)
    print(readEntry3)

    assert(str(entry1) == str(readEntry1))
    assert(str(entry2) == str(readEntry3))
    assert(str(entry3) == str(readEntry2))

if __name__ == "__main__":
    from database.utils.dbclientmanager import DBClientManager
    manager = DBClientManager()
    testAuthenticationStoring(manager)