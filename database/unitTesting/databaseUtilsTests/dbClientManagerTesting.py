from database.utils.dbclientmanager import DBClientManager


def runTests():
    manager1 = DBClientManager()
    db = manager1.getDBConnection()
    doc_ref = db.collection(u'users').document(u'goop')
    doc_ref.set({
        u'first': u'Block',
        u'last': u'Shay',
        u'born': 1923
    })
