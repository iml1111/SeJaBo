var filter = "win16|win32|win64|mac|macintel";
/*
if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    }
    else {
      $('.post_select_box_img').css('width', '340');
      $('.post_select_box_img').css('height', '440');
    }
  }
*/

$(function () {
   $('[data-toggle="tooltip"]').tooltip()
 })

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
 function likeDivMake(json_like_posts) {
   $('#myinfo_post_bigbox').empty();
   var insertDiv = document.getElementById('myinfo_post_bigbox');
   var receive_user_post_good = json_like_posts
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
function likeDivMakeNot(json_dislike_posts) {
   $('#myinfo_post_bigbox').empty();
   var insertDiv = document.getElementById('myinfo_post_bigbox');
   var receive_user_post_bad = json_dislike_posts
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
 
//내 게시글 포스트 보여주기
function get_myinfo_post_modal_selected(post_id, receive_list_post_one) {
  if (navigator.platform) {
     if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        //현재 모달 어느 박스인지 식별자 추가함 - 모바일
        $('div').remove('#post_data_start_title'); //영역 문제로 인한 "게시 기간:" 삭제
        var new_post_box = receive_list_post_one;
        //해쉬이미지작업
        var hash__ = MD5(receive_list_post_one['author_id']+"");
        var data__ = new Identicon(hash__, img_options).toString();
        $('#profile_img_id').attr("src", "data:image/png;base64," + data__);
        $('#profile_img_id').attr("data-original-title", new_post_box['author_major'] +" "+ new_post_box['author_id'] +" "+ new_post_box['author_name']);
        var new_post_box_date_start = new Date(new_post_box['reg_date']+'+0900');
        var new_post_box_date_end = new Date(new_post_box['exp_date']+'+0900');
        var post_year_start = new_post_box_date_start.getFullYear();
        var post_month_start = new_post_box_date_start.getMonth();
        var post_date_start = new_post_box_date_start.getDate();
        var post_now_start = post_year_start+'-'+post_month_start+'-'+post_date_start;
        var post_year_end = new_post_box_date_end.getFullYear();
        var post_month_end = new_post_box_date_end.getMonth();
        var post_date_end = new_post_box_date_end.getDate();
        var post_now_end = post_year_end+'-'+post_month_end+'-'+post_date_end;
        document.getElementById('post_modal_content').setAttribute('title', new_post_box['post_id']);
        document.getElementById('post_data_start').append(post_now_start);
        document.getElementById('post_data_end').append(post_now_end);
        document.getElementById('profile_title').append(new_post_box['title']);
        document.getElementById('post_content_content').append("제목 : ");
        document.getElementById('post_content_content').append(new_post_box['title']);
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').append(new_post_box['content']);
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        if (new_post_box['build_dae'] == 1){
           document.getElementById('post_content_content').append("#세종이노센터 ");
        }
        if (new_post_box['build_gwang'] == 1){
           document.getElementById('post_content_content').append("#광개토관 ");
        }
        if (new_post_box['build_hak'] == 1){
           document.getElementById('post_content_content').append("#학술정보원 ");
        }
        if (new_post_box['build_yul'] == 1){
           document.getElementById('post_content_content').append("#율곡관 ");
        }
        if (new_post_box['url'] == null) {
           $("a").remove('#post_content_url');
           document.getElementById('post_content_content').style.height = '460px';
        }
        if (new_post_box['url'] == null) {
           $("a").remove('#post_content_url');
           document.getElementById('post_content_content').style.height = '340px';
        }
        else{
           if (document.getElementById('post_content_url') == null){
              var post_content_url = document.createElement("a");
              var post_content_url_i = document.createElement("i");
              post_content_url.setAttribute('id', 'post_content_url');
              post_content_url.setAttribute('class', 'post_content_url');
              post_content_url.setAttribute('target', '_blank');
              post_content_url_i.setAttribute('class', 'fas fa-external-link-alt');
              post_content_url.appendChild(post_content_url_i);
              post_content_url.append("외부링크 바로가기");
              $('#post_content_good').before(post_content_url);
           }
           document.getElementById('post_content_url').setAttribute('href', new_post_box['url']);
        }
        var post_like_count = new_post_box['like_count']*1;
        var post_dislike_count = new_post_box['dislike_count']*1;
        document.getElementById('post_content_good').prepend(post_like_count+'  ');
        document.getElementById('post_content_bad').prepend(post_dislike_count+'   ');
        if (new_post_box['img_url'] == null){
           $('div').remove('#post_content_img');   //이미지 영역 삭제
        }
        else{
           document.getElementById('post_content_img_image').setAttribute('src', '../static/img_save/' + new_post_box['img_url']);
        }
        if (like_button_click_cnt == 1){
            $('#post_content_good').removeClass('post_content_good_nonclick');
            $('#post_content_good').addClass('post_content_good_click');
            $('#post_content_bad').removeClass('post_content_bad_click');
            $('#post_content_bad').addClass('post_content_bad_nonclick');
         }
         else if (hate_button_click_cnt == 1){
            $('#post_content_good').removeClass('post_content_good_click');
            $('#post_content_good').addClass('post_content_good_nonclick');
            $('#post_content_bad').removeClass('post_content_bad_nonclick');
            $('#post_content_bad').addClass('post_content_bad_click');
         }
         else {
            $('#post_content_good').removeClass('post_content_good_click');
            $('#post_content_good').addClass('post_content_good_nonclick');
            $('#post_content_bad').removeClass('post_content_bad_click');
            $('#post_content_bad').addClass('post_content_bad_nonclick');
         }
     }
     else {
        //현재 모달 어느 박스인지 식별자 추가함 - PC버젼
        document.getElementById('share_button').append(" 보내기");
        
        var new_post_box = receive_list_post_one;
        //해쉬이미지작업
        var hash__ = MD5(receive_list_post_one['author_id']+"");
        var data__ = new Identicon(hash__, img_options).toString();
        $('#profile_img_id').attr("src", "data:image/png;base64," + data__);
        $('#profile_img_id').attr("data-original-title", new_post_box['author_major'] +" "+ new_post_box['author_id'] +" "+ new_post_box['author_name']);
        document.getElementById('post_modal_content').setAttribute('title', new_post_box['post_id']);
        var new_post_box_date_start = new Date(new_post_box['reg_date']+'+0900');
        var new_post_box_date_end = new Date(new_post_box['exp_date']+'+0900');
        var post_year_start = new_post_box_date_start.getFullYear();
        var post_month_start = new_post_box_date_start.getMonth();
        var post_date_start = new_post_box_date_start.getDate();
        var post_now_start = post_year_start+'-'+post_month_start+'-'+post_date_start;
        var post_year_end = new_post_box_date_end.getFullYear();
        var post_month_end = new_post_box_date_end.getMonth();
        var post_date_end = new_post_box_date_end.getDate();
        var post_now_end = post_year_end+'-'+post_month_end+'-'+post_date_end;
        document.getElementById('post_modal_content').setAttribute('title', new_post_box['post_id']);
        document.getElementById('post_data_start').append(post_now_start);
        document.getElementById('post_data_end').append(post_now_end);
        document.getElementById('profile_title').append(new_post_box['title']);
        document.getElementById('post_content_content').append("제목 : ");
        document.getElementById('post_content_content').append(new_post_box['title']);
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').append(new_post_box['content']);
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        document.getElementById('post_content_content').appendChild(document.createElement("br"));
        if (new_post_box['build_dae'] == 1){
           document.getElementById('post_content_content').append("#세종이노센터 ");
        }
        if (new_post_box['build_gwang'] == 1){
           document.getElementById('post_content_content').append("#광개토관 ");
        }
        if (new_post_box['build_hak'] == 1){
           document.getElementById('post_content_content').append("#학술정보원 ");
        }
        if (new_post_box['build_yul'] == 1){
           document.getElementById('post_content_content').append("#율곡관 ");
        }
        if (new_post_box['url'] == null) {
           $("a").remove('#post_content_url');
           document.getElementById('post_content_content').style.height = '460px';
        }
        if (new_post_box['url'] == null) {
           $("a").remove('#post_content_url');
           document.getElementById('post_content_content').style.height = '460px';
        }
        else{ 
           document.getElementById('post_content_url').setAttribute('href', new_post_box['url']);
        }
        var post_like_count = new_post_box['like_count']*1;
        var post_dislike_count = new_post_box['dislike_count']*1;
        document.getElementById('post_content_good').prepend(post_like_count+'  ');
        document.getElementById('post_content_bad').prepend(post_dislike_count+'   ');
        if (new_post_box['img_url'] == null){
           document.getElementById('post_content_good').style.left = "28px";
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
           document.getElementById('post_content_good').style.left = "0px";
           document.getElementById('post_content_img_image').setAttribute('src', '../static/img_save/' + new_post_box['img_url']);
        }
        if (like_button_click_cnt == 1){
            $('#post_content_good').removeClass('post_content_good_nonclick');
            $('#post_content_good').addClass('post_content_good_click');
            $('#post_content_bad').removeClass('post_content_bad_click');
            $('#post_content_bad').addClass('post_content_bad_nonclick');
         }
         else if (hate_button_click_cnt == 1){
            $('#post_content_good').removeClass('post_content_good_click');
            $('#post_content_good').addClass('post_content_good_nonclick');
            $('#post_content_bad').removeClass('post_content_bad_nonclick');
            $('#post_content_bad').addClass('post_content_bad_click');
         }
         else {
            $('#post_content_good').removeClass('post_content_good_click');
            $('#post_content_good').addClass('post_content_good_nonclick');
            $('#post_content_bad').removeClass('post_content_bad_click');
            $('#post_content_bad').addClass('post_content_bad_nonclick');
         }
     }
  }
}

 //포스트 모달 콘텐츠 보여주기
 function get_myinfo_post_modal(post_id) {
  var like_or_dislik_post = 0;
  like_button_click_cnt = 0;
  hate_button_click_cnt = 0;
  var a_jax = A_JAX('/get_posts', "GET", localStorage.getItem('sejabo_token'));
  $.when(a_jax).done(function(){
        var json = a_jax.responseJSON;
        if(json['result'] == "success"){
            receive_list_all = json['list'];

            for (var i =0; i< receive_list_all.length; i++){
               var receive_list_post_one = receive_list_all[i];
               if (post_id == receive_list_post_one['post_id']) {
                  i-=1;
                  break;
               }
            }
           var a_jax2 = A_JAX('/userinfo', "GET", localStorage.getItem('sejabo_token'));
           $.when(a_jax2).done(function(){
                var json2 = a_jax2.responseJSON;
                if(json2['result'] == "success")
                {
                    json_like = json2['like_posts'];
                    json_dislike = json2['dislike_posts'];
                    for(var j = 0; j< json_like.length; j++){
                      if (post_id == json_like[j]['post_id']){
                        like_button_click_cnt = 1;
                        hate_button_click_cnt = 0;
                        like_or_dislik_post = 1;
                        get_myinfo_post_modal_selected(post_id, receive_list_post_one);
                        break;
                      }
                    }
                    for(var j = 0; j< json_dislike.length; j++){
                      if (post_id == json_dislike[j]['post_id']){
                        hate_button_click_cnt = 1;
                        like_button_click_cnt = 0;
                        like_or_dislik_post = 1;
                        get_myinfo_post_modal_selected(post_id, receive_list_post_one);
                        break;
                      }
                    }
                    if(like_or_dislik_post == 0){
                      get_myinfo_post_modal_selected(post_id, receive_list_post_one);
                    }
                }
                else if(json['result'] == "bad request"){
                    alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
                }
                else {
                    alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
                }
            });
        }
        else if(json['result'] == "bad request")
        {
            alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
        else {
            alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
  }); 
}

//내가 작성한 글 클릭할 시
function get_myinfo_mypost() {
   var user_post_id_number = $('#myinfo_user_post').attr('title');
   myinfo_mypost_click(user_post_id_number);
}
//내가 작성한 게시글 클릭 시
function myinfo_mypost_click(post_id) {
  //내정보모달을 끔
  myinfo_modal.style.display = "none";
  $('#myinfo_modal_content').removeClass("magictime");
  $('#myinfo_modal_content').removeClass("spaceInDown");
  //포스트모달을 킴
  post_modal.style.display = "block";
  $('#post_modal_content').addClass("magictime");
  $('#post_modal_content').addClass("spaceInDown");
  //정보를 가져옴
  get_myinfo_post_modal(post_id);
}