from flask import Flask
from flask import request
from flask import jsonify
from flask import json
from flask import Response

from apis.backendApi import postAPI
from database.utils.dbclientmanager import DBClientManager

app = Flask(__name__)
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
    result = postAPI.create_post(db, body)
    if result == 0:
        return Response("{ 'Result': 'Created Post' }", status=200, mimetype='application/json')
    elif result == 1:
        return Response("{ 'Result': 'Error: Post ID already exists, did not create post' }", status=304, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Unknown Error' }", status=500, mimetype='application/json')

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

if __name__ == '__main__':
    app.run(debug=True)
