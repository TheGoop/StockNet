from datetime import datetime,timezone
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
    returnPayload['ticker'] = post.ticker
    returnPayload['upvotes'] = post.upvoteCount
    returnPayload['comments'] = post.comments

    for comment in returnPayload['comments']:
        comment['content'] = comment['message']
        comment['user'] = comment['userName']
        del comment['message']
        del comment['userName']

    return (returnPayload,0)

def get_post_preview(db, body):
    postsUnderTag = None
    try:
        postsUnderTag = queryutils.fetchPostsUnderTag(db,body['stock'])
    except KeyError:
        return (None,1)
    except Exception:
        return (None,2)

    startIndex = int(body['num'])
    postsToFormat = postsUnderTag[startIndex*10:(startIndex+1)*10]
    returnPayload = []
    for (postID,post) in postsToFormat:
        returnPost = {}
        returnPost['user'] = post.userName
        returnPost['title'] = post.postTitle
        returnPost['postID'] = postID
        returnPost['time'] = post.time
        returnPost['ticker'] = post.ticker
        returnPost['upvotes'] = post.upvoteCount
        returnPost['flair'] = post.flair
        words = post.message.split(' ')
        if len(words) > 100:
            words.append("...")
        returnPost['content'] = " ".join(words)
        returnPayload.append(returnPost)
    return (returnPayload,0)



def update_post(db, body,args):
    postID = args['postID']
    updateDict = {}
    if 'title' in body:
        updateDict['postTitle'] = body['title']
    if 'flair' in body:
        updateDict['flair'] = body['flair']
    if 'content' in body:
        updateDict['message'] = body['content']
    if not updateDict:
        return 2
    try:
        queryutils.updatePost(db,postID,updateDict)
    except KeyError:
        return 1
    except Exception:
        return 3

    return 0



def create_post(db, body):
    time = datetime.now(tz=timezone.utc).timestamp()
    postEntry = PostContentEntry(body['user'],body['title'],time,body['content'],body['flair'],body['ticker'],body['upvotes'])
    postID = 0
    while True:
        postID = random.randint(0,1000000)
        if queryutils.validatePostID(db,postID):
            break
    taggedEntry = TaggedPostEntry(postID,time)

    try:
        queryutils.storePostTag(db,body['ticker'],taggedEntry)
        queryutils.storePost(db,postID,postEntry)
    except KeyError:
        return (None,1)
    except Exception:
       return (None,2)

    return (postID,0)


def delete_post(db, body):
    postID = body['postID']
    tag = body['stock']
    try:
        queryutils.removePost(db,tag,postID)
    except KeyError:
        return 1
    except Exception:
        return 2

    return 0