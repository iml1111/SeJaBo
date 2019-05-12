INSERT INTO user 
(student_id, pw, major_code, name)
VALUES 
(%s, %s, (SELECT major_code FROM major where name = %s LIMIT 1), %s)