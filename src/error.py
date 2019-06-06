from flask import (
    Blueprint, render_template, jsonify
)
bp = Blueprint('error', __name__)
# 배드 리퀘스트 에러를 반환할 경우, 즉시 로컬 스토리지 삭제
# 허용되지 않는 값 입력
@bp.app_errorhandler(400)
def bad_requests(error):
		return jsonify(result = "bad request"), 400
# 유효하지 않는 토큰 값
@bp.app_errorhandler(403)
def admin_only(error):
		return jsonify(result = "Invalid Authentication"), 400
# 존재하지 않는 URL
@bp.app_errorhandler(404)
def page_not_found(error):
		return jsonify(result = "404 page"), 404
# 맞지 않는 메소드
@bp.app_errorhandler(405)
def bad_requests(error):
		return jsonify(result = "Invalid Method"), 400
# 세종대 인증 실패
@bp.app_errorhandler(406)
def bad_requests(error):
		return jsonify(result = "your not Sejong"), 406

@bp.app_errorhandler(422)
def bad_requests(error):
		return jsonify(result = "bad request"), 400

@bp.app_errorhandler(500)
def server_error(error):
		return jsonify(result = "fail"), 500