import random

from database.payloadClasses.postcontententry import PostContentEntry
from database.payloadClasses.taggedpostentry import TaggedPostEntry
from database.utils import queryutils


def get_post(db,body):
    post = None
    try:
        post = queryutils.readPostbyID(db,body['postID'])
    except KeyError:
        return (None,1)
    except Exception:
        return (None,2)

    returnPayload = {}
    returnPayload['user'] = post.userName
    returnPayload['title'] = post.postTitle
    returnPayload['content'] = post.message
    returnPayload['flair'] = post.flair
    returnPayload['time'] = post.time
    returnPayload['upvotes'] = post.upvoteCount
    returnPayload['comments'] = []
    return (returnPayload,0)

def get_post_preview(db, body):
    postsUnderTag = None
    try:
        postsUnderTag = queryutils.fetchPostsUnderTag(db,body['stock'])
    except KeyError:
        return (None,1)
    except Exception:
        return (None,2)

    postsToFormat = postsUnderTag[0:int(body['num'])]
    returnPayload = []
    for (postID,post) in postsToFormat:
        returnPost = {}
        returnPost['user'] = post.userName
        returnPost['title'] = post.postTitle
        returnPost['content'] = post.message[0:100] + "..."
        returnPost['postID'] = postID
        returnPost['time'] = post.time
        returnPost['upvotes'] = post.upvoteCount
        returnPost['flair'] = post.flair
        returnPayload.append(returnPost)
    return (returnPayload,0)



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