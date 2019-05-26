from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from iml_global import *
from lms_auth import sejong_api

bp = Blueprint('user', __name__)

#########################
#Test Code
@bp.route('/u_test')
def user_test():
	with g.db.cursor() as cursor:
		sql ='select * from post_building where building_code = 101 and post_id = 1;'
		cursor.execute(sql)
		result = cursor.fetchone()
		print("1",result)
		sql = "delete from post_building where building_code = 101 and post_id = 1"
		cursor.execute(sql)
		sql ='select * from post_building where building_code = 101 and post_id = 1;'
		cursor.execute(sql)
		result = cursor.fetchone()
		print("2",result)
	return jsonify(
		result = "This User test"
		)
##########################
#테스트용 로그인 확인
@bp.route('/login_test')
@jwt_required
def test_lg():
	current_user = select_id(g.db, get_jwt_identity())
	if current_user is None: abort(400)
	return jsonify(result = current_user)

#게시물 삭제
@bp.route('/delete_post/<int:post_id>')
@jwt_required
def delete_post(post_id):
   current_user=select_id(g.db,get_jwt_identity())
   if current_user is None: abort(400)
   with g.db.cursor() as cursor:
      sql="DELETE FROM post WHERE post_id=%s and author=" + str(current_user['student_id'])
      cursor.execute(sql,(post_id,))
   g.db.commit()
   return jsonify(result="success")
   
#게시물 등록하기
#프론트 테스트 직접필요!
@bp.route('/add_post')
@jwt_required
def add_post():
	current_user = select_id(g.db, get_jwt_identity())
	if current_user is None: abort(400)
	build_list = {"dae":101, "gwang":102, "hak":103, "yul":104}
	build = request.form['build']
	title = request.form['title']
	content = request.form['content']
	size = int(request.form['size'])
	exp_date = request.form['exp_date']
	url = request.form['url']
	img_url = request.form['img_url']
	input_tuple = (
		current_user['student_id'],
		exp_date,
		title,
		content,
		url,
		img_url,
		size
	)
	with g.db.cursor() as cursor:
		sql = "insert into post values(,%s,now(),%s,%s,%s,%s,0,%s);"
		cursor.execute(sql, input_tuple)
		for i in build:
			sql = "insert into post_building values(%s,\
			(select post_id from v_post where author = %s));"
			cursor.execute(sql,(build_list[i],current_user["student_id"]))
	g.db.commit()
	return jsonify(success = "success")

#회원정보 반환
@bp.route('/userinfo')
@jwt_required
def get_user():
	current_user = select_id(g.db, get_jwt_identity())
	if current_user is None: abort(400)
	userinfo = {}
	with g.db.cursor() as cursor:
		#회원 테이블 정보 반환
		sql = open("sql/userinfo.sql").read()
		cursor.execute(sql,(current_user['student_id'],))
		userinfo.update(cursor.fetchone())
		# 회원이 쓴 글이 있으면 반환
		sql = "select * from v_post where author=%s;"
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
		if not api_result['result']:
			return jsonify(result = "your not sejong")
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
				access_token = create_access_token(identity=user_id, expires_delta=False)
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