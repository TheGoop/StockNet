import random

from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.utils import queryutils


def get_post(db,body):
    return None

def get_post_preview(db, body):
    return None


def update_post(db, body):
    return None


def create_post(db, body):
    postEntry = PostContentEntry(body['user'],body['title'],body['time'],body['content'],body['flair'],body['upvotes'])
    postID = 0
    while True:
        postID = random.randint(0,1000000)
        if queryutils.validatePostID(db,postID):
            break
    taggedEntry = TaggedPostEntry(postID,body['time'])

    try:
        queryutils.storePostTag(db,body['ticker'],taggedEntry)
        queryutils.storePost(db,postID,postEntry)
    except KeyError:
        return 1
    except Exception:
       return 2

    return 0


def delete_post(db, body):
    return None