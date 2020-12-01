from database.unitTesting.queryTests.postQueryTesting import testSinglePostStore
from database.unitTesting.queryTests.taggingPostQueryTesting import testTagging


def runTests():
    from database.utils.dbclientmanager import DBClientManager
    manager = DBClientManager()
    testSinglePostStore(manager)
    testTagging(manager)