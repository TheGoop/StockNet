from database.payloadClasses.commententry import CommentEntry
from datetime import datetime,timezone

from database.utils import queryutils


def create_comment(db, args, body):
    postID = args['postID']
    time = datetime.now(tz=timezone.utc).timestamp()
    commentEntry = CommentEntry(body['user'],time,body['content'])
    try:
        queryutils.addComment(db,postID,commentEntry)
    except KeyError:
        return 1
    except Exception:
        return 2
    return 0