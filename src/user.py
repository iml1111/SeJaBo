from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from iml_global import *
from lms_auth import sejong_api
from werkzeug import secure_filename
import os
import datetime

bp = Blueprint('user', __name__)
UPLOAD_PATH = "/static/img_save/"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
BUILD_LIST = {"dae":101, "gwang":102, "hak":103, "yul":104}
EXP_DATE_dict = {1:20, 2:15, 3:10, 4:7}

#수정에서 이미 있는 게시물 방식 생각하기

#게시물 삭제
@bp.route('/delete_post/<int:post_id>')
@jwt_required
def delete_post(post_id):
   current_user=select_id(g.db,get_jwt_identity())
   if current_user is None: abort(403)
   with g.db.cursor() as cursor:
      sql="DELETE FROM post WHERE post_id=%s and author=" + str(current_user['student_id'])
      cursor.execute(sql,(post_id,))
   g.db.commit()
   return jsonify(result="success")

#게시물 등록하기
@bp.route('/add_post', methods=["POST"])
@jwt_required
def add_post():
   current_user = select_id(g.db, get_jwt_identity())
   if current_user is None: abort(403)
   with g.db.cursor() as cursor:
      sql = "SELECT * from post where author = %s"
      cursor.execute(sql, (current_user['student_id'],))
      result = cursor.fetchone()
   if current_user['student_id'] not in [16011089,16011075, 16011092] and result is not None:
         abort(400)
   build = request.form['build']
   build = build.split(",")
   if len(build) == 0: abort(400)
   title = request.form['title']
   content = request.form['content']
   size = int(request.form['size'])
   exp_date = request.form['exp_date']
   url = request.form.get('url')
   if url == "": url = None
   if not all(i in build for i in build):
      abort(400)
   if not (len(title) >= 1 and len(title) <= 500):
      abort(400)
   if size not in [1,2,3,4]: abort(400)
   if get_add_day(EXP_DATE_dict[size]) < exp_date:
      abort(400)
   try:
      datetime.datetime.strptime(exp_date,"%Y-%m-%d")
   except:
      abort(400)
   if url is not None and url.startswith("http") is False: abort(400)
   img = request.files.get('img_url')
   if img is not None:
      filename = str(current_user['student_id']) +  get_today_datetime() + "." + secure_filename(img.filename).split(".")[-1]
      print(filename)
      if not allowed_file(filename):
         print(111)
         abort(400)
      img.save("." + UPLOAD_PATH + filename)
   else: 
      filename = None
   if filename is not None and allowed_file(filename) is False:
      print(222)
      abort(400)
   input_tuple = (
      current_user['student_id'],
      exp_date,
      title,
      content,
      url,
      filename,
      size
   )
   with g.db.cursor() as cursor:
      sql = "insert into post values(default,%s,now(),%s,%s,%s,%s,%s,0,%s);"
      cursor.execute(sql, input_tuple)
      sql = "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1;"
      cursor.execute(sql)
      result = cursor.fetchone()
      for i in build:
         sql = "insert into post_building values(%s,%s);"
         cursor.execute(sql,(BUILD_LIST[i],result["post_id"]))
   g.db.commit()
   return jsonify(result = "success")

#게시물 수정하기
@bp.route('/mod_post', methods=["POST"])
@jwt_required
def modify_post():
   current_user = select_id(g.db, get_jwt_identity())
   if current_user is None: abort(403)
   
   with g.db.cursor() as cursor:
      sql = "SELECT * from post where author = %s LIMIT 1"
      cursor.execute(sql, (current_user['student_id'],))
      result = cursor.fetchone()
   if result is None:
      abort(400)
   title = request.form['title']
   content = request.form['content']
   url = request.form.get('url')
   if url == "": url = None
   if not (len(title) >= 1 and len(title) <= 500):
      abort(400)
   if len(content) == 0:
      abort(400)
   if url is not None and url.startswith("http") is False:
      abort(400)
   input_tuple = (
      title,
      content,
      url,
      current_user['student_id']
   )
   
   with g.db.cursor() as cursor:
      sql = "UPDATE post \
      SET title = %s, content = %s, url = %s \
      WHERE author = %s"
      cursor.execute(sql, input_tuple)
   g.db.commit()
   return jsonify(result = "success")

#회원정보 반환
@bp.route('/userinfo')
@jwt_required
def get_user():
   current_user = select_id(g.db, get_jwt_identity())
   if current_user is None: abort(403)
   userinfo = {}
   with g.db.cursor() as cursor:
      #회원 테이블 정보 반환
      sql = open("sql/userinfo.sql").read()
      cursor.execute(sql,(current_user['student_id'],))
      userinfo.update(cursor.fetchone())
      # 회원이 쓴 글이 있으면 반환
      sql = "SELECT * from v_post where author=%s LIMIT 1;"
      cursor.execute(sql,(current_user['student_id'],))
      userinfo.update({"my_post":cursor.fetchone()})
      #좋아요 누른 글목록 가져오기
      sql = open("sql/userinfo2.sql").read()
      cursor.execute(sql, (current_user['student_id'],))
      userinfo.update({"like_posts":cursor.fetchall()})
      #싫어요 누른 글목록 가져오기
      sql = open("sql/userinfo3.sql").read()
      cursor.execute(sql,(current_user['student_id'],))
      userinfo.update({"dislike_posts":cursor.fetchall()})
      userinfo.update({"result":"success"})
   return jsonify(userinfo)

#로그인/회원가입(토큰발행)
@bp.route('/login', methods=['POST'])
def login_proc():
   user_id = request.form['id']
   user_pw = request.form['pw']
   current_user = select_id(g.db, user_id)
   if current_user is None:
      api_result = sejong_api(user_id, user_pw)
      if not api_result['result']: abort(406)
      db_data = (
         user_id,
         generate_password_hash(user_pw),
         api_result['major'],
         api_result['name']
      )
      with g.db.cursor() as cursor:
         sql = open("sql/user_register.sql").read()
         cursor.execute(sql, db_data)
      g.db.commit()
   current_user = select_id(g.db, user_id)
   if(check_password_hash(current_user['pw'], user_pw)):
      return jsonify(
            result = "success",
            access_token = create_access_token(identity=user_id, 
                                       expires_delta=False)
            )
   else:
      return jsonify(result = "password incorrect")

# 사용자 관련 함수##############################################
def select_id(db, string):
   with db.cursor() as cursor:
      sql = "SELECT * FROM user WHERE student_id = %s LIMIT 1"
      cursor.execute(sql,(string,))
      result = cursor.fetchone()
   return result

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS