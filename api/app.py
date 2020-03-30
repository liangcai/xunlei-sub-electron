from flask import Flask, request
from thunder_subtitle.search import search, get_url


app = Flask(__name__)

@app.route('/api/state')
def api_state():
  return {'state': 'ok'}, 200

@app.route('/api/subs', methods=['POST'])
def get_subs():
  print('fpath: ', request.form.get('fpath'))
  fpath = request.form.get('fpath')
  if not fpath:
    fpath = request.args.get('fpath')
  subs = search(fpath)
  if not subs:
    return {'message': '超过最大重试次数后仍然未能获得正确结果', 'subs':[]}, 404
  subs.sort(key=lambda x: x['rate'], reverse=True)
  return {'message': 'search success', 'subs': subs}, 200

@app.route('/api/downsub', methods=['POST'])
def download_sub():
  surl = request.form.get('surl')
  sname = request.form.get('sname')
  data = get_url(surl)
  with open(sname, 'wb') as f:
    f.write(data)
  return {'message': 'download success'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
