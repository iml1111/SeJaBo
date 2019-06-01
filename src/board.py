from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from iml_global import *

bp = Blueprint('board', __name__)

#게시물 불러오기: 입력값이 없을떄 -> 모든 게시물 다 불러온다.
@bp.route('/get_posts')
def get_post():
   with g.db.cursor() as cursor:
      sql=open("sql/get_post.sql").read()
      cursor.execute(sql)
      result=cursor.fetchall()
   return jsonify(
      list=result,
      result="success"
   )

#게시물 불러오기: 입력값 존재 시 -> 특정 게시물 다 불러온다.
@bp.route('/get_posts/<string:build>')
def get_posts(build):
   if build not in ['yul','dae','hak','gwang']:
      abort(400)
   with g.db.cursor() as cursor:
      sql=open("sql/get_post2.sql").read()
      sql = sql.split("build_input")
      sql = sql[0] + build + sql[1]
      cursor.execute(sql)
      result=cursor.fetchall()
   if result is None:
      abort(400)
   return jsonify(
      list=result,
      result="success"
   )

#조회수 증가
@bp.route('/view_add/<int:post_id>')
def view_add(post_id):
   with g.db.cursor() as cursor:
      sql = "UPDATE post set view_count=view_count+1 where post_id=%s"
      cursor.execute(sql,(post_id,))
   g.db.commit()
   return jsonify(result = "success")

#게시물 호감/비호감 등록
@bp.route('/like/<int:post_id>/<int:interest>')
@jwt_required
def like(post_id,interest):
   current_user = select_id(g.db, get_jwt_identity())
   if current_user is None: abort(403)
   with g.db.cursor() as cursor:
      sql="SELECT student_id,post_id,interest FROM like_dislike WHERE post_id=%s and student_id=" + str(current_user['student_id'])
      cursor.execute(sql,(post_id,))
      result=cursor.fetchone()
      if result is None:##해당 게시물에 대해 등록된 호감.비호감이 없는 경우. 새로이 등록한다.
        if interest==1:
            sql="INSERT INTO like_dislike VALUES(%s,%s,1);"
            cursor.execute(sql,(current_user['student_id'],post_id,))
        else:
            sql="INSERT INTO like_dislike VALUES(%s,%s,0);"
            cursor.execute(sql,(current_user['student_id'],post_id,))
      else:
      ##해당 게시물에 대해 호감 비호감이 등록되어 있는 경우, 호감,비호감의 전환이 있는경우
      ## 이미 호감이 등록되어있는 게시물에 똑같이 호감을 등록할 경우.
      ## 이미 비호감이 등록되어있는 게시물에 똑같이 비호감을 등록할 경우.
         if result['interest']==interest:
            sql = 'DELETE FROM like_dislike where post_id=%s and student_id =%s'
            cursor.execute(sql,(post_id, current_user['student_id']))
            return jsonify(result="success")
         else:
            if result['interest']==0:
               sql="UPDATE like_dislike set interest=1 where student_id=%s and interest=0 and post_id=%s;"
               cursor.execute(sql,(current_user['student_id'],post_id,))
            else:
               sql="UPDATE like_dislike set interest=0 where student_id=%s and interest=1 and post_id=%s;"
               cursor.execute(sql,(current_user['student_id'],post_id,))
   g.db.commit()
   return jsonify(result="success")

#게시물 검색
@bp.route('/search/<string:words>')
def search(words):
   with g.db.cursor() as cursor:
      sql=open("sql/search.sql").read()
      cursor.execute(sql,('%'+words+'%',))
      result=cursor.fetchall()
   return jsonify(
      list=result,
      result="success"
   )

#단일 게시물 정보 반환
@bp.route('/v/<int:post_id>')
def v(post_id):
   with g.db.cursor() as cursor:
      sql=open("sql/v.sql").read()
      cursor.execute(sql,(post_id,))
      result = cursor.fetchone()
   return jsonify(
      list=result,
      result="success"
   )

def select_id(db, string):
	with db.cursor() as cursor:
		sql = "SELECT * FROM user WHERE student_id = %s LIMIT 1"
		cursor.execute(sql,(string,))
		result = cursor.fetchone()
	return result