import datetime

from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.utils.queryutils import storePostTag, storePost, fetchPostsUnderTag


def testTagging(manager):
    db = manager.getDBConnection()
    postID1 = 1001
    postID2 = 1002
    postID3 = 1003
    postID4 = 1004

    time1 = 46
    time2 = 314
    time3 = 13646
    time4 = 314631474

    post1 = PostContentEntry("User 1", "Sample Post Title 1", time1,
                             "Sample Post Message 1", "Sample Post Flair 1", "Sample Post Tag 1",3,
                             ["Sample Comment 1-1", "Sample Comment 1-2"])
    post2 = PostContentEntry("User 2", "Sample Post Title 2", time2 ,
                             "Sample Post Message 2", "Sample Post Flair 2","Sample Post Tag 2", 3,
                             ["Sample Comment 2-1", "Sample Comment 2-2"])
    post3 = PostContentEntry("User 3", "Sample Post Title 3", time3 ,
                             "Sample Post Message 3", "Sample Post Flair 3", "Sample Post Tag 3",3,
                             ["Sample Comment 3-1", "Sample Comment 3-2"])
    post4 = PostContentEntry("User 4", "Sample Post Title 4", time4,
                             "Sample Post Message 4", "Sample Post Flair 4","Sample Post Tag 4", 3,
                             ["Sample Comment 4-1", "Sample Comment 4-2"])

    tagEntry1 = TaggedPostEntry(postID1, time1)
    tagEntry2 = TaggedPostEntry(postID2, time2)
    tagEntry3 = TaggedPostEntry(postID3, time3)
    tagEntry4 = TaggedPostEntry(postID4, time4)

    storePostTag(db,"Tag1",tagEntry1)
    storePostTag(db,"Tag2",tagEntry2)
    storePostTag(db,"Tag2",tagEntry3)
    storePostTag(db,"Tag2",tagEntry4)
    storePost(db,postID1,post1)
    storePost(db,postID2,post2)
    storePost(db,postID3,post3)
    storePost(db,postID4,post4)
    print(post1)
    print(post2)
    print(post3)
    print(post4)
    tag1Posts = fetchPostsUnderTag(db,"Tag1")
    tag2Posts = fetchPostsUnderTag(db,"Tag2")
    for post in tag1Posts:
        print(post)
    for post in tag2Posts:
        print(post)
