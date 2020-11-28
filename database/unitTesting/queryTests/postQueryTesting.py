import datetime

from database.payloadClasses.postcontententry import PostContentEntry
from database.utils.queryutils import storePost, readPostbyID


def testSinglePostStore(manager):
    db = manager.getDBConnection()
    post1 = PostContentEntry("User 1","Sample Post Title 1", datetime.datetime(1000, 10, 23, 10, 8, 0, 89,
                                                                               datetime.timezone.utc),
                             "Sample Post Message 1", "Sample Post Flair 1", 3, ["Sample Comment 1", "Sample Comment 1"])
    post2 = PostContentEntry("User 2", "Sample Post Title 2", datetime.datetime(999, 10, 23, 10, 8, 0,5,
                                                                                datetime.timezone.utc),
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