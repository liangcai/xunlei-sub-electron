from flask import Flask
from thunder_subtitle.search import search


app = Flask(__name__)

@app.route('/api/state')
def api_state():
  return {'state': 'ok'}, 200

@app.route('/api/get-subtitle')
def get_subtitle():
  return {'message': 'download success'}, 200


if __name__ == '__main__':
    app.run(port=5000)
