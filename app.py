from flask import Flask
from flask import request
from flask import jsonify
from flask import json
from flask import Response
from flask_cors import CORS

from apis.backendApi import postAPI, commentAPI, userAuthAPI, userProfileAPI
from database.utils.dbclientmanager import DBClientManager

app = Flask(__name__)
CORS(app)
manager = DBClientManager()

@app.route('/')
def index():
    return "Hello, World!"


@app.route('/singlepost', methods=['GET'])
def singlePostGet():
    # id defaults to None
    db = manager.getDBConnection()
    body = request.args
    if not body:
        return Response("{ 'Result': 'Error: No args given' }", status=400, mimetype='application/json')
    if 'postID' not in body or len(body)>1:
        return Response("{ 'Result': 'Error: Bad args given' }", status=400, mimetype='application/json')
    returnPayloadTuple = postAPI.get_post(db,body)
    if returnPayloadTuple[1] == 1:
        return Response("{ 'Result': 'Error: Post ID was not found in database' }", status=400, mimetype='application/json')
    elif returnPayloadTuple[1] == 2:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
    else:
        return jsonify(returnPayloadTuple[0])

@app.route('/postpreview', methods=['GET'])
def getPostPreview():
    # both default to None
    db = manager.getDBConnection()
    body = request.args
    if not body:
        return Response("{ 'Result': 'Error: No arguments given' }", status=400, mimetype='application/json')
    correctArgs = ['stock','num']
    validated = True
    for key in body:
        if key not in correctArgs:
            validated = False
            break

    if not validated or len(body) != 2:
        return Response("{ 'Result': 'Error: Bad args given' }", status=400, mimetype='application/json')

    returnPayloadTuple = postAPI.get_post_preview(db, body)
    # do something, eg. return json response
    if returnPayloadTuple[1] == 1:
        return Response("{ 'Result': 'Error: No Posts under Tag' }", status=404, mimetype='application/json')
    elif returnPayloadTuple[1] == 2:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
    else:
        return jsonify(returnPayloadTuple[0])



@app.route('/singlepost', methods=['PUT'])
def updatePost():
    db = manager.getDBConnection()
    body = request.json
    args = request.args
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')
    if not args:
        return Response("{ 'Result': 'Error: No args given' }", status=400, mimetype='application/json')
    if 'postID' not in args or len(args)>1:
        return Response("{ 'Result': 'Error: Bad args given' }", status=400, mimetype='application/json')

    # do something, eg. return json response
    result = postAPI.update_post(db, body,args)
    if result == 0:
        return Response("{ 'Result': 'Post Updated' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Error: No Posts with given ID exist' }", status=400, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'Error: Empty Body given' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')


# we deal with giving this post an ID
@app.route('/singlepost', methods=["POST"])
def createPost():
    db = manager.getDBConnection()
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')
    # do something, eg. return json response
    returnPayloadTuple = postAPI.create_post(db, body)
    if returnPayloadTuple[1] == 1:
        return Response("{ 'Result': 'Error: Post ID is already stored' }", status=404, mimetype='application/json')
    elif returnPayloadTuple[1] == 2:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
    elif returnPayloadTuple[1] == 3:
        return Response("{ 'Result': 'Username Not Provided' }", status=400, mimetype='application/json')
    elif returnPayloadTuple[1] == 4:
        return Response("{ 'Result': 'Username Not Found' }", status=500, mimetype='application/json')
    elif returnPayloadTuple[1] == 5:
        return Response("{ 'Result': 'Unknown Error With Fetching UserProfile' }", status=500, mimetype='application/json')
    elif returnPayloadTuple[1] == 6:
        return Response("{ 'Result': 'Username Not Found When Updating' }", status=500, mimetype='application/json')
    elif returnPayloadTuple[1] == 7:
        return Response("{ 'Result': 'Unknown Error With Updating UserProfile' }", status=500, mimetype='application/json')
    else:
        return jsonify(returnPayloadTuple[0])

# # we deal with giving this comment an ID
# @app.route('/comment', methods=['POST'])
# def createComment():
#     # id of the post, defaults to None
#     id = request.args.get('postID', None)
#     return jsonify(id)


@app.route('/singlepost', methods=['DELETE'])
def deletePost():
    db = manager.getDBConnection()
    body = request.args
    if not body:
        return Response("{ 'Result': 'Error: No arguments given' }", status=400, mimetype='application/json')
    correctArgs = ['stock', 'postID']
    validated = True
    for key in body:
        if key not in correctArgs:
            validated = False
            break

    if not validated or len(body) != 2:
        return Response("{ 'Result': 'Error: Bad args given' }", status=400, mimetype='application/json')
    # do something, eg. return json response
    result = postAPI.delete_post(db, body)
    if result == 0:
        return Response("{ 'Result': 'Removed Post' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Error: Could Not Find Tagged Post with given ID' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')

@app.route('/comment', methods=['POST'])
def createComment():
    db = manager.getDBConnection()
    args = request.args
    if not args:
        return Response("{ 'Result': 'Error: No arguments given' }", status=400, mimetype='application/json')
    if 'postID' not in args or len(args) > 1:
        return Response("{ 'Result': 'Error: Bad args given' }", status=400, mimetype='application/json')

    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')

    # do something, eg. return json response
    returnPayloadTuple = commentAPI.create_comment(db,args,body)
    if returnPayloadTuple[1] == 0:
        return jsonify(returnPayloadTuple[0])
    elif returnPayloadTuple[1] == 1:
        return Response("{ 'Result': 'Error: Could Not Find Post with given ID' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')

@app.route('/login', methods=['GET'])
def authenticateUser():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')

    result = userAuthAPI.is_valid_login(db, body)
    if result == 0:
        return Response("{ 'Result': 'User Authenticated' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Incorrect Password' }", status=401, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'No Authentication Data Found For User' }", status=400, mimetype='application/json')
    elif result == 3:
        return Response("{ 'Result': 'username/password Not Given In REST Body' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
      
@app.route('/createUserAuth', methods=['POST'])
def createUser():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')
    
    result = userAuthAPI.createUser(db, body)
    if result == 0:
        return Response("{ 'Result': 'User Authentication Created' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Username Already In Use' }", status=401, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'username/password Not Given In REST Body' }", status=400, mimetype='application/json')
    elif result == 3:
        return Response("{ 'Result': 'Unknown Error With Checking Database For Given Username' }", status=400, mimetype='application/json')
    elif result == 4:
        return Response("{ 'Result': 'Unknown Error With Storing UserAuth/UserProfile Into Database' }", status=500, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')

@app.route('/upvotePost', methods=['PUT'])
def upvotePost():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not args:
        return Response("{ 'Result': 'Error: No JSON Args given' }", status=400, mimetype='application/json')
    
    result = postAPI.upvotePost(db, body, args)
    if result == 0:
        return Response("{ 'Result': 'Post Upvotes Updated' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Invalid upvote Provided In Args' }", status=400, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'postID/upvote Not Given In Args' }", status=400, mimetype='application/json')
    elif result == 3:
        return Response("{ 'Result': 'Invalid postID Provided In Args Cannot Read From DB' }", status=400, mimetype='application/json')
    elif result == 4:
        return Response("{ 'Result': 'Unknown Error With Reading DB' }", status=500, mimetype='application/json')
    elif result == 5:
        return Response("{ 'Result': 'Invalid postID Provided In Args Cannot Update To DB' }", status=400, mimetype='application/json')
    elif result == 6:
        return Response("{ 'Result': 'Unknown Error With Updating DB' }", status=500, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')

#NOTE: IF USER HAS ALREADY FAVORITED THE STOCK, THIS
#REST CALL WILL NOT UNFAVORITE IT
@app.route('/favoriteTicker', methods=['PUT'])
def favoriteTicker():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')
    
    result = userProfileAPI.favoriteTicker(db, body)
    if result == 0:
        return Response("{ 'Result': 'User Favorited The Stock' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'User Has Already Favorited The Stock' }", status=200, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'username/ticker Not Given In Body' }", status=400, mimetype='application/json')
    elif result == 3:
        return Response("{ 'Result': 'Unknown Error With Retriving User Profile' }", status=500, mimetype='application/json')
    elif result == 4:
        return Response("{ 'Result': 'User Profile Not Found In Database' }", status=400, mimetype='application/json')
    elif result == 5:
        return Response("{ 'Result': 'User Profile Not Found In Database When Updating To Favorite' }", status=400, mimetype='application/json')
    elif result == 6:
        return Response("{ 'Result': 'Unknown Error With Updating User Profile To Favorite' }", status=500, mimetype='application/json')
    
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
    '''
    elif result == 7:
        return Response("{ 'Result': 'User Profile Not Found In Database When Updating To Unfavorite' }", status=400, mimetype='application/json')
    elif result == 8:
        return Response("{ 'Result': 'Unknown Error With Updating User Profile To Unfavorite' }", status=500, mimetype='application/json')
    '''


@app.route('/userPosts', methods=['GET'])
def getUserPosts():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')

    result = getUserPosts(db, body)
    if result[0] == 1:
        return
    elif result[0] == 2:
        return
    elif result[0] == 3:
        return
    elif result[0] != 0:
        return 

    postPayload = []
    postIDs = result[1]
    for postID in postIDs:
        d = dict()
        d["postID"] = postID
        returnPayloadTuple = postAPI.get_post(db, d)
        if returnPayloadTuple[1] == 1:
            return Response("{ 'Result': 'Error: Post ID was not found in database' }", status=400, mimetype='application/json')
        elif returnPayloadTuple[1] == 2:
            return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
        else:
            postPayload.append(returnPayloadTuple[0])
    
    return (jsonify(postPayload))



if __name__ == '__main__':
    app.run(debug=True)

