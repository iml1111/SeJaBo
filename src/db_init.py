from pymysql import *
import pymysql.cursors
from iml_global import *
from flask import g

ip = '127.0.0.1'
user = "root"
pw = "imlisgod"

def get_db():
	if 'db' not in g:
		g.db = connect(host = ip,user=user, password=pw, db='sjb', charset='utf8mb4', 
			cursorclass=pymysql.cursors.DictCursor)
	return g.db

def close_db():
	 db = g.pop('db', None)
	 if db is not None:
	 	if db.open:
	 		db.close()

def init_db():
	db = connect(host = ip,user=user, password=pw,charset='utf8mb4',
		cursorclass=pymysql.cursors.DictCursor)
	#DB 생성
	try:
		with db.cursor() as cursor:
			sql = "CREATE DATABASE IF NOT EXISTS sjb"
			cursor.execute(sql)
		db.commit()
	except Exception as ex:
		print("Db init Failed")
		print(ex)
	db.select_db("sjb")
	#테이블 생성
	with db.cursor() as cursor:
		sql = open("table/t_college.sql").read()
		cursor.execute(sql)
		sql = open("table/t_building.sql").read()
		cursor.execute(sql)
		sql = open("table/t_major.sql").read()
		cursor.execute(sql)
		sql = open("table/t_user.sql").read()
		cursor.execute(sql)
		sql = open("table/t_post.sql").read()
		cursor.execute(sql)
		sql = open("table/t_post_building.sql").read()
		cursor.execute(sql)
		sql = open("table/t_like_dislike.sql").read()
		cursor.execute(sql)
		#init_data
		sql = open("sql/init_data.txt","r")
		while True:
			line = sql.readline()
			if not line: break
			try:
				cursor.execute(line)
			except Exception as e:
				print(e)
				continue
		#test_case
		sql = open("sql/test_case.txt","r")
		while True:
			line = sql.readline()
			if not line: break
			try:
				cursor.execute(line)
			except Exception as e:
				print(e)
				continue
	db.commit()
	db.close()