SELECT student_id, m.name "major_name", u.name "user_name" 
FROM   user AS u, 
       major AS m 
WHERE  u.major_code = m.major_code 
       AND student_id = %s;