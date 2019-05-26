SELECT * 
FROM   (SELECT post_id 
        FROM   like_dislike 
        WHERE  student_id =%s 
               AND interest = 0) AS good 
       JOIN v_post AS vp USING(post_id);