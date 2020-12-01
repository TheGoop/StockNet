import time

from database.payloadClasses.commententry import CommentEntry
from database.utils import queryutils
from database.utils.dbclientmanager import DBClientManager


def testCommentAddition(manager):
    db = manager.getDBConnection()
    commentEntry = CommentEntry("Sam",time.time(),"I too commented on this post", 789)
    queryutils.addComment(db,254921,commentEntry)

if __name__ == "__main__":
    manager = DBClientManager()
    testCommentAddition(manager)