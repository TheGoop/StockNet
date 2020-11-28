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

@app.route('/endpoint/postpreview', methods=['get'])
def create_cm():
    stock = request.args.get('stock', None) # use default value repalce 'None'
    num = request.args.get('num', None)
    # do something, eg. return json response
    return jsonify({'stock': stock, 'num': num})

if __name__ == '__main__':
    app.run(debug=True)
