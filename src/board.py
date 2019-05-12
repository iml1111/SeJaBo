from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from iml_global import *

bp = Blueprint('board', __name__)

@bp.route('/b_test')
def board_test():
	# Do it coding
	b_list = []
	for i in range(5, 0, -1):
		b_list.append(i)
	return jsonify(
		result = "This Board test",
		list = b_list
		)

@bp.route('/login', methods=['POST'])
def login_proc():
	user_id = request.form