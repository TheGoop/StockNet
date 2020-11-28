import datetime

from database.payloadClasses.postcontententry import PostContentEntry
from database.utils.queryutils import storePost, readPostbyID


def testSinglePostStore(manager):
    db = manager.getDBConnection()
    post1 = PostContentEntry("User 1","Sample Post Title 1", 20,
                             "Sample Post Message 1", "Sample Post Flair 1", 3, ["Sample Comment 1", "Sample Comment 1"])
    post2 = PostContentEntry("User 2", "Sample Post Title 2", 21,
                             "Sample Post Message 2", "Sample Post Flair 2", 3,
                             ["Sample Comment 2", "Sample Comment 2"])
    print(post1)
    print(post2)
    storePost(db,1,post1)
    storePost(db, 2, post2)
    post3 = readPostbyID(db,1)
    post4 = readPostbyID(db,2)
    print(post3)
    print(post4)