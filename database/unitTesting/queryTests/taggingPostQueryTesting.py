from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.utils.queryutils import storePostTag, storePost, fetchPostsUnderTag


def testTagging(manager):
    db = manager.getDBConnection()
    postID1 = 1001
    postID2 = 1002
    postID3 = 1003
    postID4 = 1004
    post1 = PostContentEntry(1, 800, "Tagged Post 1")
    post2 = PostContentEntry(2, 800, "Tagged Post 2")
    post3 = PostContentEntry(3, 800, "Tagged Post 3")
    post4 = PostContentEntry(4, 800, "Tagged Post 4")
    tagEntry = TaggedPostEntry(800)
    storePostTag(db,"Tag1",postID1,tagEntry)
    storePostTag(db,"Tag2",postID2,tagEntry)
    storePostTag(db,"Tag2",postID3,tagEntry)
    storePostTag(db,"Tag2",postID4,tagEntry)
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
