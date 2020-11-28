from flask import Flask
from flask import request
from flask import jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/endpoint/singlepost/<int:id>', methods=['GET'])
def get_tasks(id):
    return str(id)

@app.route('/endpoint/postpreview?stock=<name>&num=<int:X>', methods = ['GET'])
def get_user(name, X = 0):
    return str((name, str(x)))

@app.route('/createcm', methods=['get'])
def create_cm():
    summary = request.args.get('summary', None) # use default value repalce 'None'
    change = request.args.get('change', None)
    # do something, eg. return json response
    return jsonify({'summary': summary, 'change': change})

if __name__ == '__main__':
    app.run(debug=True)
