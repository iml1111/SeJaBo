import time
import datetime
import sys
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from tzlocal import get_localzone
from db_init import *

ip = '127.0.0.1'
user = "root"
pw = "imlisgod"

sys.path.insert(0,'./')
sys.path.insert(0,'./table')
sys.path.insert(0,'./sql')
sys.path.insert(0,'./img_save')

# BackgroundScheduler Initialize
def schedule_init():
	t_zone = get_localzone()
	scheduler = BackgroundScheduler()
	#scheduler.add_job(func = test_bg, trigger = "interval", seconds = 1, timezone = t_zone)
	scheduler.add_job(func = auto_remove, trigger = "interval", minutes = 5, timezone = t_zone)
	# weeks, days, hours, minutes, seconds
	# start_date='2010-10-10 09:30', end_date='2014-06-15 11:00'
	scheduler.start()
	atexit.register(lambda: scheduler.shutdown())

########## 백그라운드 프로세스 ##########
# Test Function
def test_bg():
	print("hello",get_today())

#만료일이 어제 이하인 모든 게시물 삭제
def auto_remove():
	db = connect(host = ip,user=user, password=pw, db='sjb', charset='utf8mb4', 
			cursorclass=pymysql.cursors.DictCursor)
	with db.cursor() as cursor:
		sql = "delete from post where exp_date < %s"
		cursor.execute(sql, (get_today(),))
	db.commit()
	db.close()

########## 공통 사용 함수 ##########
def get_today():
	now = datetime.datetime.now()
	date = now.strftime("%Y-%m-%d")
	return date
def get_today_datetime():
	now = datetime.datetime.now()
	date = now.strftime("%Y%m%d%H%M%S")
	return date

def get_add_day(day):
	now = datetime.datetime.now() + datetime.timedelta(days = day)
	date = now.strftime("%Y-%m-%d")
	return date

def str_to_unix(string):
	dtime = datetime.datetime.strptime(string, "%Y-%m-%d %H:%M:%S")
	return int(time.mktime(dtime.timetuple()))

def unix_to_str(unix_t):
	return datetime.datetime.fromtimestamp(unix_t).strftime("%Y-%m-%d %H:%M:%S")
