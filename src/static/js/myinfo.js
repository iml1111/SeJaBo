//게시물 나눠주는 함수
var receive_user_post_all = [
    {'post_id': '3','reg_date':'2019-04-11', 'exp_date':'2019-04-13','title':'Pray for SEJABO SuccessfulPray for SEJABO Successful','content':'WebProgramming and Database ProjectWebProgramming and Database ProjectWebProgramming and Database ProjectWebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#EFFBFB', 'like_bad':'1'},
    {'post_id': '2','reg_date':'2019-04-10', 'exp_date':'2019-04-14','title':'THIS IS SEJABO TEST BENCH. Plz stay on the page','content':'세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.세자보 테스트 내용입니다.','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#EFFBFB', 'like_bad':'1'},
    {'post_id': '4','reg_date':'2019-04-09', 'exp_date':'2019-04-15','title':'Pray for SEJABO Successful This is Third','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC', 'like_bad':'1'},
    {'post_id': '5','reg_date':'2019-04-08', 'exp_date':'2019-04-16','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC', 'like_bad':'1'},
    {'post_id': '1','reg_date':'2019-04-07', 'exp_date':'2019-04-17','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#FBEFEF', 'like_bad':'1'},
    {'post_id': '6','reg_date':'2019-04-11', 'exp_date':'2019-04-13','title':'JEBAL NA WA RA~~!','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#EFFBFB', 'like_bad':'0'},
    {'post_id': '8','reg_date':'2019-04-10', 'exp_date':'2019-04-14','title':'THIS IS SEJABO TEST BENCH. Plz stay on the page','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#EFFBFB', 'like_bad':'0'},
    {'post_id': '7','reg_date':'2019-04-09', 'exp_date':'2019-04-15','title':'Pray for SEJABO Successful This is Third','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC', 'like_bad':'0'},
    {'post_id': '9','reg_date':'2019-04-08', 'exp_date':'2019-04-16','title':'세자보 좋아요 아주 좋아요','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC', 'like_bad':'0'},
    {'post_id': '10','reg_date':'2019-04-07', 'exp_date':'2019-04-17','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#FBEFEF', 'like_bad':'0'}
    ]
 
 function select_good_or_bad_post(select_like_bad_number) {
    var receive_user_post_good = [];
    var receive_user_post_bad = [];
    for (var i = 0; i< receive_user_post_all.length; i++){
       var receive_user_post_now = receive_user_post_all[i];
       if (receive_user_post_now['like_bad'] == '1'){
          receive_user_post_good.push(receive_user_post_now);
       }
       else {
          receive_user_post_bad.push(receive_user_post_now);
       }
    }
    if (select_like_bad_number == 1) return receive_user_post_good;
    else return receive_user_post_bad;
 }
 
 //85 자가 넘을시 text .. 붙이고 출력 함수
 function rewrite_text(text, text_length) {
    if (text_length >=82) {
       var text_output = text.slice(0, 83);
       text_output += "...";
       return text_output;
    }
    else{
       return text;
    }
 }
 //좋아하는 글 div 생성 함수
 function likeDivMake() {
    var insertDiv = document.getElementById('myinfo_post_bigbox');
    var receive_user_post_good = select_good_or_bad_post(1);
    for (var i =0; i< receive_user_post_good.length; i++){
       var newDiv = document.createElement("div");
       var infoDiv = receive_user_post_good[i];
       newDiv.id = infoDiv['post_id'];
       newDiv.classList.add('myinfo_post_bigbox_content_good');
       newDiv.setAttribute('onclick', 'myinfo_user_post_click('+infoDiv['post_id']+');');
 
       var newDiv_title = document.createElement("div");
       newDiv_title.classList.add('myinfo_post_bigbo_title');
       newDiv_title.append(infoDiv['title']);
       newDiv.appendChild(newDiv_title);
 
       var newDiv_text = document.createElement("div");
       newDiv_text.classList.add('myinfo_post_bigbo_text');
       var text_rewrite = rewrite_text(infoDiv['content'], infoDiv['content'].length);
       newDiv_text.append(text_rewrite);
       newDiv.appendChild(newDiv_text);
 
       insertDiv.appendChild(newDiv);
    }
 }
 //싫어하는 글 div 생성 함수
 function likeDivMakeNot() {
    var insertDiv = document.getElementById('myinfo_post_bigbox');
    var receive_user_post_bad = select_good_or_bad_post(0);
    for (var i=0; i< receive_user_post_bad.length; i++){
       var newDiv = document.createElement("div");
       var infoDiv = receive_user_post_bad[i]
       newDiv.id = infoDiv['post_id'];
       newDiv.classList.add('myinfo_post_bigbox_content_bad');
       newDiv.setAttribute('onclick', 'myinfo_user_post_click('+infoDiv['post_id']+');');
 
       var newDiv_title = document.createElement("div");
       newDiv_title.classList.add('myinfo_post_bigbo_title');
       newDiv_title.append(infoDiv['title']);
       newDiv.appendChild(newDiv_title);
 
       var newDiv_text = document.createElement("div");
       newDiv_text.classList.add('myinfo_post_bigbo_text');
       var text_rewrite = rewrite_text(infoDiv['content'], infoDiv['content'].length);
       newDiv_text.append(text_rewrite);
       newDiv.appendChild(newDiv_text);
 
       insertDiv.appendChild(newDiv);
    }
 }
 //좋아요 싫어요 게시물 div 비워주는 함수
 function remove_myinfo_post_contents() {
    $('#myinfo_post_bigbox').empty();
 }
 
 
 //포스트 모달 콘텐츠 추가
 function get_myinfo_post_modal(post_id) {
     for (var i =0; i< receive_user_post_all.length; i++){
        var receive_user_post_pick =  receive_user_post_all[i];
        if (post_id == receive_user_post_pick['post_id']) {
           break;
        }
     }
    var new_post_box = receive_user_post_pick;
    document.getElementById('post_data_start').append(new_post_box['reg_date']);
    document.getElementById('post_data_end').append(new_post_box['exp_date']);
    document.getElementById('profile_title').append(new_post_box['title']);
    document.getElementById('post_content_content').append("제목 : ");
    document.getElementById('post_content_content').append(new_post_box['title']);
    document.getElementById('post_content_content').appendChild(document.createElement("br"));
    document.getElementById('post_content_content').appendChild(document.createElement("br"));
    document.getElementById('post_content_content').append(new_post_box['content']);
    if (new_post_box['url'] == '0') {
       $("a").remove('#'+post_content_url['id']);
       document.getElementById('post_content_content').style.height = '460px';
    }
    else{ 
       document.getElementById('post_content_url').setAttribute('href', new_post_box['url']);
    }
    var post_like_count = new_post_box['like_count']*1;
    var post_dislike_count = new_post_box['dislike_count']*1;
    document.getElementById('post_content_good').prepend(post_like_count+'  ');
    document.getElementById('post_content_bad').prepend(post_dislike_count+'   ');
    if (new_post_box['img_url'] == '0'){
       $('div').remove('#post_content_img');   //이미지 영역 삭제
       $('div').remove('#post_data_start_title'); //영역 문제로 인한 "게시 기간:" 삭제
       document.getElementById('post_modal_content').style.width="650px";
       document.getElementById('post_content_text').style.width="100%";
       document.getElementById('post_top').style.width="400px";
       document.getElementById('share_button').style.marginLeft="15px";
       document.getElementById('share_button').style.marginTop="20px";
       document.getElementById('post_data_start').style.marginLeft="35px";
       document.getElementById('post_content_text').style.paddingLeft="30px";
    }
    else{
       document.getElementById('post_content_img_image').setAttribute('src', new_post_box['img_url']);
    }
 }