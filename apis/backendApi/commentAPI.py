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
        return (None,1)
    except Exception:
        return (None,2)
    commentPayload = {}
    commentPayload['time'] = commentEntry.time
    commentPayload['content'] = commentEntry.message
    commentPayload['user'] = commentEntry.userName
    return (commentPayload,0)