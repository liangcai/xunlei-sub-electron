# -*- encoding: utf-8 -*-
'''
@File    :   app.py
@Time    :   2020/04/29 01:22:13
@Author  :   white_walker cailiang
@Version :   1.0
@Contact :   cail1844@gmail.com
@Desc    :   None
'''

# here put the import lib

from flask import Flask, request, make_response
from thunder_subtitle.search import search, get_url
import mimetypes
from urllib.parse import quote

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
  try:
    subs = search(fpath)
    print('subs raw data: ', subs)
  except Exception as e:
    return {'message': "get subs found a exception: {}".format(e), 'status':'0000', 'subs': []}, 200
  if not subs:
    return {'message': 'not found subs', 'status':'1110', 'subs':[]}, 200
  subs.sort(key=lambda x: x['rate'], reverse=True)
  return {'message': 'search success', 'status':'1111', 'subs': subs}, 200

@app.route('/api/downsub', methods=['POST'])
def download_sub():
  surl = request.form.get('surl')
  sname = request.form.get('sname')
  print("surl:", surl, "sname:", sname)
  data = get_url(surl)
  # with open(sname, 'wb') as f:
  #   f.write(data)
  # return {'message': 'download success'}, 200
  response = make_response(data)
  # mime_type = mimetypes.guess_type(surl)
  # response.headers['Content-Type'] = mime_type
  response.headers['Content-Type'] = "application/text, charset=utf-8"
  response.headers['Content-Disposition'] = 'attachment; filename={}'.format(quote(sname))
  return response

@app.after_request
def after_request(response):
  header = response.headers
  header['Access-Control-Allow-Origin'] = '*'
  header['Access-Control-Expose-Headers'] = '*'
  header['Access-Control-Allow-Headers'] = '*'
  return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
