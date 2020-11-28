from flask import Flask

app = Flask(__name__)

@app.route('/endpoint/singlepost?<id>', methods = ['GET'])
def get_post(id):
    #id is the post id
    return (id)

@app.route('/endpoint/postpreview?stock=<name>&num=<int:X>', methods = ['GET'])
def get_user(name, X = 0):
    return (name, x)




if __name__ == '__main__':
    app.run(debug=True)
