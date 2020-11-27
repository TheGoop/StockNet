from database.payloadClasses.postcontententry import PostContentEntry
from database.utils.queryutils import storePost, readPostbyID


def testSinglePostStore(manager):
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