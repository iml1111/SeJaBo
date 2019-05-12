import time
import datetime
import sys

sys.path.insert(0,'./')
sys.path.insert(0,'./table')
sys.path.insert(0,'./sql')

def get_today():
	now = datetime.datetime.now()
	date = now.strftime("%Y-%m-%d %H:%M:%S")
	return date

def get_default_day(day):
	now = datetime.datetime.now() - datetime.timedelta(days = day)
	date = now.strftime("%Y-%m-%d %H:%M:%S")

	return date

def str_to_unix(string):
	dtime = datetime.datetime.strptime(string, "%Y-%m-%d %H:%M:%S")
	return int(time.mktime(dtime.timetuple()))

def unix_to_str(unix_t):
	return datetime.datetime.fromtimestamp(unix_t).strftime("%Y-%m-%d %H:%M:%S")
