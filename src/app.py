import os
from flask import Flask, render_template, jsonify
from flask_jwt_extended import JWTManager
from db_init import *
from iml_global import *
import user, board, error

application = Flask(__name__, instance_relative_config=True)
#Debug or Release
application.config.update(
		DEBUG = True,
		JWT_SECRET_KEY = 'secret string',
		MAX_CONTENT_LENGTH = 16 * 1024 * 1024,
		UPLOAD_FOLDER = './img_save/'
	)
jwt = JWTManager(application)

#initialize process
def create_app(test_config = None):
	init_db()
	#백그라운드 지속 작업
	schedule_init() 
	application.register_blueprint(user.bp)
	application.register_blueprint(board.bp)
	application.register_blueprint(error.bp)
	return application

@application.route('/')
def index():
	return render_template('index.html')

@application.before_request
def before_request():
	get_db()

@application.teardown_request
def teardown_request(exception):
	close_db()

application = create_app()
if __name__ == '__main__':
	application.run(host="0.0.0.0", port=80)