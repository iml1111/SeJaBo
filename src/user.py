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
	# Do it coding
	u_list = []
	for i in range(5):
		u_list.append(i)
	return jsonify(
		result = "This User test",
		list = u_list
		)
##########################

#테스트용 로그인 확인
@bp.route('/login_test')
@jwt_required
def test_lg():
	current_user = select_id(g.db, get_jwt_identity())
	if current_user is None: abort(400)
	return jsonify(result = current_user)

#로그인/회원가입(토큰발행)
@bp.route('/login', methods=['POST'])
def login_proc():
	user_id = request.form['id']
	user_pw = request.form['pw']
	current_user = select_id(g.db, user_id)
	if current_user is None:
		api_result = sejong_api(user_id, user_pw)
		print(api_result)
		if not api_result['result']:
			return jsonify(result = "input wrong1")
		db_data = (
			user_id,
			generate_password_hash(user_pw),
			api_result['major'],
			api_result['name']
		)
		print(len(db_data[1]),"dddddddddd")
		print(db_data[1])
		with g.db.cursor() as cursor:
			sql = open("sql/user_register.sql").read()
			cursor.execute(sql, db_data)
		g.db.commit()
	print(api_result,"asdasdadad")
	current_user = select_id(g.db, user_id)
	if(check_password_hash(current_user['pw'], user_pw)):
		return jsonify(
				result = "success",
				access_token = create_access_token(identity=user_id, expires_delta=False)
				)
	else:
		return jsonify(result = "input wrong2")


# 사용자 관련 함수##############################################
def select_id(db, string):
	with db.cursor() as cursor:
		sql = "SELECT * FROM user WHERE student_id = %s LIMIT 1"
		cursor.execute(sql,(string,))
		result = cursor.fetchone()
		if result is None:
			return None
	return result