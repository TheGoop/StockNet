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
    body = request.json
    return postAPI.get_post(db,body)


@app.route('/postpreview', methods=['GET'])
def getPostPreview():
    # both default to None
    db = manager.getDBConnection()
    body = request.json
    # do something, eg. return json response
    return postAPI.get_post_preview(db,body)


@app.route('/singlepost', methods=['PUT'])
def updatePost():
    db = manager.getDBConnection()
    body = request.json
    # do something, eg. return json response
    return postAPI.update_post(db, body)


# we deal with giving this post an ID
@app.route('/singlepost', methods=["POST"])
def createPost():
    db = manager.getDBConnection()
    body = request.json
    # do something, eg. return json response
    if postAPI.create_post(db, body):
        return Response("{ 'Result': 'Created Post' }", status=201, mimetype='application/json')
    else:
        return Response("{ 'Result': 'Error: could not create post' }", status=400, mimetype='application/json')

# # we deal with giving this comment an ID
# @app.route('/comment', methods=['POST'])
# def createComment():
#     # id of the post, defaults to None
#     id = request.args.get('postID', None)
#     return jsonify(id)


@app.route('/singlepost', methods=['DELETE'])
def deletePost():
    db = manager.getDBConnection()
    body = request.json
    # do something, eg. return json response
    return postAPI.delete_post(db, body)


if __name__ == '__main__':
    app.run(debug=True)
