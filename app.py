from flask import Flask
from flask import request
from flask import jsonify
from flask import json
from flask import Response
from flask_cors import CORS

from apis.backendApi import postAPI, commentAPI, userAuthAPI
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
    result = commentAPI.create_comment(db,args,body)
    if result == 0:
        return Response("{ 'Result': 'Created Comment' }", status=200, mimetype='application/json')
    elif result == 1:
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
        return Response("{ 'Result': 'Username/Password Not Given In REST Body' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')
      
@app.route('/createUserAuth', methods=['POST'])
def createUserAuth():
    db = manager.getDBConnection()
    args = request.args
    body = request.json
    if not body:
        return Response("{ 'Result': 'Error: No JSON body given' }", status=400, mimetype='application/json')
    
    result = userAuthAPI.createUserAuth(db, body)
    if result == 0:
        return Response("{ 'Result': 'User Authentication Created' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Username Already In Use' }", status=401, mimetype='application/json')
    elif result == 2:
        return Response("{ 'Result': 'Username/Password Not Given In REST Body' }", status=400, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
