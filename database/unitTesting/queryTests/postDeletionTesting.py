import datetime

from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.utils.queryutils import storePostTag, storePost, deletePostEntry, deletePostUnderTag, removePost


def propagatePostsForDeletion(db):
    postID1 = 2001
    postID2 = 2002
    postID3 = 2003
    postID4 = 2004

    time1 = datetime.datetime(2000, 10, 23, 10, 8, 0, 89, datetime.timezone.utc)
    time2 = datetime.datetime(2001, 10, 23, 10, 8, 0, 5, datetime.timezone.utc)
    time3 = datetime.datetime(2002, 10, 23, 10, 8, 0, 89, datetime.timezone.utc)
    time4 = datetime.datetime(2003, 10, 23, 10, 8, 0, 5, datetime.timezone.utc)

    post1 = PostContentEntry("User 1", "Sample Post Title 1", time1,
                             "Sample Post Message 1", "Sample Post Flair 1", 3,
                             ["Sample Comment 1-1", "Sample Comment 1-2"])
    post2 = PostContentEntry("User 2", "Sample Post Title 2", time2,
                             "Sample Post Message 2", "Sample Post Flair 2", 3,
                             ["Sample Comment 2-1", "Sample Comment 2-2"])
    post3 = PostContentEntry("User 3", "Sample Post Title 3", time3,
                             "Sample Post Message 3", "Sample Post Flair 3", 3,
                             ["Sample Comment 3-1", "Sample Comment 3-2"])
    post4 = PostContentEntry("User 4", "Sample Post Title 4", time4,
                             "Sample Post Message 4", "Sample Post Flair 4", 3,
                             ["Sample Comment 4-1", "Sample Comment 4-2"])

    tagEntry1 = TaggedPostEntry(postID1, time1)
    tagEntry2 = TaggedPostEntry(postID2, time2)
    tagEntry3 = TaggedPostEntry(postID3, time3)
    tagEntry4 = TaggedPostEntry(postID4, time4)

    storePostTag(db, "Tag1", tagEntry1)
    storePostTag(db, "Tag2", tagEntry2)
    storePostTag(db, "Tag2", tagEntry3)
    storePostTag(db, "Tag2", tagEntry4)
    storePost(db, postID1, post1)
    storePost(db, postID2, post2)
    storePost(db, postID3, post3)
    storePost(db, postID4, post4)

def deletePropagatedPostsManually(db):
    deletePostEntry(db,2002)
    deletePostUnderTag(db,'Tag2',2002)

def deletePropagatedPostsTogether(db):
    removePost(db,'Tag1', 2001)
    removePost(db,'Tag2',2003)
    removePost(db,'Tag2',2004)

if __name__ == "__main__":
    from database.utils.dbclientmanager import DBClientManager
    clientManager = DBClientManager()
    propagatePostsForDeletion(clientManager.getDBConnection())
