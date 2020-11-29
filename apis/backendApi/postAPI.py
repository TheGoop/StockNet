import random

from database.payloadClasses.postcontententry import PostContentEntry
from database.utils import queryutils


def get_post(db,body):
    return None

def get_post_preview(db, body):
    return None


def update_post(db, body):
    return None


def create_post(db, body):
    postEntry = PostContentEntry(body['username'],body['postTitle'],body['time'],body['message'],body['flair'],body['upvotes'],body['comments'])
    postID = 0
    while True:
        postID = random.randint(0,1000000)
        if queryutils.validatePostID(db,postID):
            break

    try:
        queryutils.storePost(db,postID,postEntry)
    except Exception:
       return False

    return True


def delete_post(db, body):
    return None