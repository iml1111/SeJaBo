SELECT vp.post_id, 
       title, 
       content, 
       reg_date, 
       exp_date, 
       user_name  AS author_name, 
       author     AS author_id, 
       major_name AS author_major, 
       vp.color, 
       url, 
       img_url, 
       view_count, 
       up         AS like_count, 
       down       AS dislike_count, 
       SIZE, 
       yul        AS build_yul, 
       dae        AS build_dae, 
       hak        AS build_hak, 
       gwang      AS build_gwang, 
       num        AS build_count 
FROM   v_post AS vp, 
       college AS col, 
       major AS m 
WHERE  col.college_code = m.college_code 
       AND m.major_code = vp.major_code 
       AND exp_date > Now() 
       AND Concat(title, content, user_name, author, major_name, col.name) LIKE 
           %s 
ORDER  BY exp_date, 
          up DESC, 
          view_count DESC, 
          reg_date, 
          SIZE DESC, 
          num; 