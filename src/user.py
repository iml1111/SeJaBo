from flask import *
from werkzeug.security import *
from flask_jwt_extended import *
from iml_global import *

bp = Blueprint('user', __name__)
