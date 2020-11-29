from flask import Flask
from flask import request
from flask import jsonify
import flask
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/singlepost', methods=['GET'])
def get_post():
    #id defaults to None
    x = request.json
    z = "body   {"
    for i in x:
        z+= str(i) + " : " + str(x[i]) + "\n"
    z += "}"
    z += "\n args {"
    w = request.args
    for i in w:
        z+= str(i) + " : " + str(w[i]) + "\n"
    z += "}"
    return z
'''
    id = request.args.get('postID', None)
    return jsonify(id)
'''
@app.route('/postpreview', methods=['GET'])
def getPostPreview():
    #both default to None
    stock = request.args.get('stock', None) 
    num = request.args.get('num', None)
    # do something, eg. return json response
    return jsonify({'stock': stock, 'num': num})

@app.route('/updatepost', methods=['PUT'])
def updatePost():
    #with PUT, we will update some resource


    #all will default to None if nothing given
    id = request.args.get('postID', None)
    upvote = request.args.get('upvote', None)
    #upvote will either be 1 or -1, 
    commentID = request.args.get('commentID', None)
    return jsonify(id)

# we deal with giving this post an ID
@app.route('/singlepost', methods=["POST"])
def createPost():
    return -1

# we deal with giving this comment an ID
@app.route('/comment', methods=['POST'])
def createComment():
    #id of the post, defaults to None
    id = request.args.get('postID', None)
    return jsonify(id)

@app.route('/singlepost', methods=['DELETE'])
def deletePost():
    #id of the post, defaults to None
    id = request.args.get('postID', None)
    return jsonify(id)


if __name__ == '__main__':
    app.run(debug=True)
