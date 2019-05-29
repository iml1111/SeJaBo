SELECT vp.post_id, 
       title, 
       content, 
       reg_date, 
       exp_date, 
       user_name  AS author_name, 
       author     AS author_id, 
       major_name AS author_major, 
       color, 
       url, 
       img_url, 
       view_count, 
       up         AS like_count, 
       down       AS dislike_count, 
       size, 
       yul        AS build_yul, 
       dae        AS build_dae, 
       hak        AS build_hak, 
       gwang      AS build_gwang, 
       num        AS build_count 
FROM   v_post AS vp 
WHERE  exp_date > Now() 
       AND build_input = 1 
ORDER  BY exp_date, 
          up DESC, 
          view_count DESC, 
          reg_date, 
          size DESC, 
          num; 