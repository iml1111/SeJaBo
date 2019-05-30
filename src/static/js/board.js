//박스채우기 script
var window_width = $(window).width();
var window_height = $(window).height();
$("#test").append(window_width, "<br>")
$("#test").append(window_height)
//body에 박힌 div 배열
var box_done = [];
var receive_post_list = [];

document.body.onload = addElement;
function addElement () {
   //백엔드에서 정렬된 포스트 리스트가 온다.
   var receive_list= [
   {'post_id': '0','reg_date':'2019-04-11', 'exp_date':'2019-04-13','title':'Pray for SEJABO SuccessfulPray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#EFFBFB'},
   {'post_id': '2','reg_date':'2019-04-10', 'exp_date':'2019-04-14','title':'THIS IS SEJABO TEST BENCH. Plz stay on the page','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#EFFBFB'},
   {'post_id': '4','reg_date':'2019-04-09', 'exp_date':'2019-04-15','title':'Pray for SEJABO Successful This is Third','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'},
   {'post_id': '3','reg_date':'2019-04-08', 'exp_date':'2019-04-16','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'},
   {'post_id': '1','reg_date':'2019-04-07', 'exp_date':'2019-04-17','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#FBEFEF'},
   {'post_id': '6','reg_date':'2019-04-06', 'exp_date':'2019-04-18','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#FBEFEF'},
   {'post_id': '30','reg_date':'2019-04-05', 'exp_date':'2019-04-19','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/2007/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#ECE0F8'},
   {'post_id': '8','reg_date':'2019-04-04', 'exp_date':'2019-04-10','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#ECE0F8'},
   {'post_id': '9','reg_date':'2019-04-03', 'exp_date':'2019-04-11','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'0','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#E0F8E6'},
   {'post_id': '12','reg_date':'2019-04-02', 'exp_date':'2019-04-12','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#E0F8E6'},
   {'post_id': '11','reg_date':'2019-04-01', 'exp_date':'2019-04-23','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#E0F8EC'}, 
   {'post_id': '14','reg_date':'2019-03-11', 'exp_date':'2019-04-24','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'}, 
   {'post_id': '13','reg_date':'2019-03-17', 'exp_date':'2019-04-25','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '15','reg_date':'2019-03-16', 'exp_date':'2019-04-26','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '21','reg_date':'2019-03-15', 'exp_date':'2019-04-27','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '16','reg_date':'2019-03-14', 'exp_date':'2019-04-29','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '22','reg_date':'2019-03-12', 'exp_date':'2019-04-30','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '33','reg_date':'2019-03-13', 'exp_date':'2019-04-01','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}
   ]
   var box_shape = {'1': ['160', '220'], '2': ['200', '280'], '3': ['280', '360'], '4': ['340', '440']};
   var box_list = [];
   for (var i=0; i<receive_list.length; i++){
      box_list.push(receive_list[i]['size']);
   }
   var box_not_done = [];
   var box_out = [];
   var number = 20;            //최소단위 지정 (작을수록 시간이 오래걸림)
   var x0y0, x1y0, x0y1, x1,y1;
   var min_width = 30;            //가로 시작 지점
   var min_height = 80;         //세로 시작 지점
   var max_width = window_width - 30;   //가로 끝 지점
   var max_height = window_height - 60;   //세로 끝 지점
   var n = 1;
   for(var i=0; i<box_list.length; i++){
      box = box_list[i];
      var w = Number(box_shape[box][0]);
      var h = Number(box_shape[box][1]);
      //Div 각 꼭지점 좌표
      /*----------------------------------------------*/
      x0y0 = [min_width,min_height];
      x1y0 = [min_width+w, min_height];
      x0y1 = [min_width, min_height+h];
      x1y1 = [min_width+w, min_height+h];
      /*----------------------------------------------*/
      //만약 첫번째의, div가 들어왔을 때,
      if (!box_done.length){
         var newDiv = document.createElement("div");
         newDiv.id = "box_"+n;
         
         newDiv.classList.add("box_css_basic");
         newDiv.style.width = w+'px';
         newDiv.style.height = h+'px';
         newDiv.style.left = min_width+'px';
         newDiv.style.top = min_height+'px';
         add_list = [min_width, min_height, min_width + w, min_height + h, newDiv.id, receive_list[i].post_id];
         box_done.push(add_list);
         receive_post_list.push(receive_list[n-1]);   // 모달 표출을 위한 전역변수에 포스트데이터 넣어주기.
         if (receive_list[n-1]['img_url'] == '0'){
            newText = document.createTextNode(receive_list[n-1]['title']);
            newDiv.appendChild(newText);
            if (receive_list[n-1]['size'] == 1){
               newDiv.classList.add("box_fa30");
            }
            else if (receive_list[n-1]['size'] == 2){
               newDiv.classList.add("box_fa40");
            }
            else if (receive_list[n-1]['size'] == 3){
               newDiv.classList.add("box_fa60");
            }
            else if (receive_list[n-1]['size'] == 4){
               newDiv.classList.add("box_fa80");
            }
            newDiv.classList.add("box_css_text");
            newDiv.style.backgroundColor = receive_list[n-1]['color'];
         }
         else {
            var newImgurl = receive_list[n-1]['img_url'];
            newImgurl = "url('" + newImgurl + "')";
            newDiv.style.backgroundImage = newImgurl;
            newDiv.classList.add("box_css_img");
         }
         n+=1;
         //박스 애니메이션 추가
         newDiv.classList.add("magictime");
         newDiv.classList.add("foolishIn");
         //onclick 속성 추가
         newDiv.setAttribute("onclick", "post_button_click("+newDiv.id+");");
         box_out.push(newDiv);
      }
      else {
         for (var j=0; j<box_done.length; j++){
            var temp_box = box_done[j];
            var temp_x0y0 = [temp_box[0], temp_box[1]];
            var temp_x1y0 = [temp_box[2], temp_box[1]];
            var temp_x0y1 = [temp_box[0], temp_box[3]];
            var temp_x1y1 = [temp_box[2], temp_box[3]];

            if (x0y0[0] >= temp_x0y0[0] && x0y0[0] <= temp_x1y1[0] && x0y0[1] >= temp_x0y0[1] && x0y0[1] <= temp_x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (x1y0[0] >= temp_x0y0[0] && x1y0[0] <= temp_x1y1[0] && x1y0[1] >= temp_x0y0[1] && x1y0[1] <= temp_x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (x0y1[0] >= temp_x0y0[0] && x0y1[0] <= temp_x1y1[0] && x0y1[1] >= temp_x0y0[1] && x0y1[1] <= temp_x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (x1y1[0] >= temp_x0y0[0] && x1y1[0] <= temp_x1y1[0] && x1y1[1] >= temp_x0y0[1] && x1y1[1] <= temp_x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (temp_x0y0[0] >= x0y0[0] && temp_x0y0[0] <= x1y1[0] && temp_x0y0[1] >= x0y0[1] && temp_x0y0[1] <= x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (temp_x1y0[0] >= x0y0[0] && temp_x1y0[0] <= x1y1[0] && temp_x1y0[1] >= x0y0[1] && temp_x1y0[1] <= x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (temp_x0y1[0] >= x0y0[0] && temp_x0y1[0] <= x1y1[0] && temp_x0y1[1] >= x0y0[1] && temp_x0y1[1] <= x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
            else if (temp_x1y1[0] >= x0y0[0] && temp_x1y1[0] <= x1y1[0] && temp_x1y1[1] >= x0y0[1] && temp_x1y1[1] <= x1y1[1]){
               j = -1;
               x0y0[0] += number;
               x1y0[0] += number;
               x0y1[0] += number;
               x1y1[0] += number;
            }
               
            /*다음 줄로 넘어감*/
            if (x1y0[0] > max_width || x1y1[0] > max_width){
               x0y0[0] = min_width;
               x0y1[0] = min_width;
               x1y0[0] = min_width+w;
               x1y1[0] = min_width+w;
               x0y0[1] += number;
               x1y0[1] += number;
               x0y1[1] += number;
               x1y1[1] += number;
               j = -1;
            }
         }
         if (x1y1[0] <= max_width && x1y1[1] <= max_height){
            var newDiv = document.createElement("div");
            newDiv.id = "box_"+n;
            newDiv.classList.add("box_css_basic");
            newDiv.style.width = w+'px';
            newDiv.style.height = h+'px';
            newDiv.style.left = x0y0[0]+'px';
            newDiv.style.top = x0y0[1]+'px';
            add_list = [x0y0[0], x0y0[1], x0y0[0] + w, x0y0[1] + h, newDiv.id, receive_list[i].post_id];
            box_done.push(add_list);
            receive_post_list.push(receive_list[n-1]);   // 모달 표출을 위한 전역변수에 포스트데이터 넣어주기.
            if (receive_list[n-1]['img_url'] == '0'){
               newText = document.createTextNode(receive_list[n-1]['title']);
               newDiv.appendChild(newText);
               if (receive_list[n-1]['size'] == 1){
                  newDiv.classList.add("box_fa30");
               }
               else if (receive_list[n-1]['size'] == 2){
                  newDiv.classList.add("box_fa40");
               }
               else if (receive_list[n-1]['size'] == 3){
                  newDiv.classList.add("box_fa60");
               }
               else if (receive_list[n-1]['size'] == 4){
                  newDiv.classList.add("box_fa80");
               }
               newDiv.classList.add("box_css_text");
               newDiv.style.backgroundColor = receive_list[n-1]['color'];
            }
            else {
               var newImgurl = receive_list[n-1]['img_url'];
               newImgurl = "url('" + newImgurl + "')";
               newDiv.style.backgroundImage = newImgurl;
               newDiv.classList.add("box_css_img");
            }
            //애니메이션 클래스 추가
            n+=1;
            newDiv.classList.add("magictime");
            newDiv.classList.add("foolishIn");
            //onclick 속성 추가
            newDiv.setAttribute("onclick", "post_button_click("+newDiv.id+");");
            box_out.push(newDiv);
         }
         else{
            add_list = [x0y0[0], x0y0[1], x0y0[0] + w, x0y0[1] + h, receive_list[i].post_id];
            box_not_done.push(add_list);
         }
      }
   }
   for (var i = 0; i< box_out.length; i++){
      document.body.appendChild(box_out[i]);
   }
}

function box_mouse_over(box_id) {
   document.getElementById(box_id).sytle.transform = "scale(1.06, 1.06)";
}
function box_mouse_out(box_id) {
   document.getElementById(box_id).sytle.transform = "scale(1, 1)";
}

//새로고침 요소 함수
function refleshElement (n){
   if (n ==-1){
      setTimeout(function(){
         box_done = [];
         addElement();
      }, 600);
   }
   else{
      setTimeout(function(){
         var box_now = box_done[n];
         var box_nowId = box_now[4];
         $('#'+box_nowId).addClass("magictime");
         $('#'+box_nowId).addClass("foolishOut");
         setTimeout(function(){
            $("div").remove('#'+box_nowId);
         }, 600);
         n-=1;
         refleshElement(n);
      }, 30);
   }
}
//새로고침함수
function refleshPage(){
   var n = box_done.length - 1;
   setTimeout(refleshElement(n), 100);
}

//포스트 모달 콘텐츠 추가 및 제거
function get_post_content(post_id) {
   var post_id_number = post_id['id'];
   for (var i =0; i< box_done.length; i++){
      var box_done_id = box_done[i];
      if (post_id_number == box_done_id[4]) {
         break;
      }
   }
   //현재 모달 어느 박스인지 식별자 추가함
   document.getElementById('post_modal_content').setAttribute('title', post_id_number);
   
   var new_post_box = receive_post_list[i];
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
      document.getElementById('post_content_good').style.left = "13px";
      document.getElementById('post_content_img_image').setAttribute('src', new_post_box['img_url']);
   }
}

//포스트 모달 초기화 함수
function remove_post_content() {
   //profile_title 원상복구 작업
   $("#profile_title").empty();
   //post_content_content 원상복구 작업
   document.getElementById('post_content_content').style.height = '380px';
   //post_content_text 원상복구 작업
   document.getElementById('post_content_text').style.paddingLeft="15px";
   //post_content_url 추가작업
   if (document.getElementById('post_content_url') == undefined){
      var post_content_url = document.createElement("a");
      var post_content_url_i = document.createElement("i");
      post_content_url.setAttribute('id', 'post_content_url');
      post_content_url.setAttribute('class', 'post_content_url');
      post_content_url.setAttribute('target', '_blank');
      post_content_url_i.setAttribute('class', 'fas fa-external-link-alt');
      post_content_url.appendChild(post_content_url_i);
      post_content_url.append("외부링크 바로가기");
      document.getElementById('post_content_text').appendChild(post_content_url);
   }
   //post_modal_content 원상복구 작업
   document.getElementById('post_modal_content').style.width="1300px";
   //post_content_text 원상복구 작업
   document.getElementById('post_content_text').style.width="50%";
   //post_top 원상복구 작업
   document.getElementById('post_top').style.width="800px";
   //share_button 원상복구 작업
   document.getElementById('share_button').style.marginLeft="30px";
   document.getElementById('share_button').style.marginTop="30px";
   //post_content_img 원상복구 작업
   if(document.getElementById('post_content_img') != undefined){
      $('div').remove('#post_content_img');
   }
   var post_content_image = document.createElement('div');
   post_content_image.setAttribute('class', 'post_content_img');
   post_content_image.setAttribute('id', 'post_content_img');
   document.getElementById('post_modal_content').appendChild(post_content_image);
   //post_content_img_content 원상복구 작업
   if(document.getElementById('post_content_img_content') != undefined){
      $('div').remove('#post_content_img_content');
   }
   var post_content_imgContent = document.createElement('div');
   post_content_imgContent.setAttribute('class', 'post_content_img_content');
   post_content_imgContent.setAttribute('id', 'post_content_img_content');
   document.getElementById('post_content_img').appendChild(post_content_imgContent);
   //post_content_img_image 원상복구 작업
   if(document.getElementById('post_content_img_image') != undefined){
      $('img').remove('#post_content_img_image');
   }
   var post_content_imgImage = document.createElement('img');
   post_content_imgImage.setAttribute('class', 'post_content_img_image');
   post_content_imgImage.setAttribute('id', 'post_content_img_image');
   post_content_imgImage.setAttribute('onmouseover', 'post_content_img_image_over();');
   post_content_imgImage.setAttribute('onmouseout', 'post_content_img_image_out();');
   document.getElementById('post_content_img_content').appendChild(post_content_imgImage);
   //post_content_good,bad i 태그 원상복구 작업
   $('#post_content_good').empty();
   $('#post_content_bad').empty();
   var like_symbol = document.createElement("i");
   var bad_symbol = document.createElement("i");
   like_symbol.setAttribute('class', 'fas fa-thumbs-up');
   bad_symbol.setAttribute('class', 'fas fa-thumbs-up');
   document.getElementById('post_content_good').appendChild(like_symbol);
   document.getElementById('post_content_bad').appendChild(bad_symbol);
   //post_top 내용물 원상복구 작업
   if (document.getElementById('post_data_start_title') != undefined){
      $('div').remove('#post_data_start_title');
   }
   $('div').remove('#post_data_start');
   $('div').remove('#post_data_between');
   $('div').remove('#post_data_end');
   var post_data_startTitle = document.createElement('div');
   var post_dataStart = document.createElement('div');
   var post_dataBetween = document.createElement('div');
   var post_dataEnd = document.createElement('div');
   post_data_startTitle.setAttribute('class', 'post_data_start_title');
   post_dataStart.setAttribute('class', 'post_data_start');
   post_dataBetween.setAttribute('class', 'post_data_between');
   post_dataEnd.setAttribute('class', 'post_data_end');
   post_data_startTitle.setAttribute('id', 'post_data_start_title');
   post_dataStart.setAttribute('id', 'post_data_start');
   post_dataBetween.setAttribute('id', 'post_data_between');
   post_dataEnd.setAttribute('id', 'post_data_end');
   document.getElementById('post_top').appendChild(post_data_startTitle);
   document.getElementById('post_data_start_title').append("게시 기간 :");
   document.getElementById('post_top').appendChild(post_dataStart);
   document.getElementById('post_top').appendChild(post_dataBetween);
   document.getElementById('post_data_between').append("~");
   document.getElementById('post_top').appendChild(post_dataEnd);
   //post_content_content 내용 원상복구 작업
   $("#post_content_content").empty();
}


//클립보드 복사 함수
function clipboardCopy() {
   // 모든 포스트 리스트를 가져온다.
   var receive_list_all= [
   {'post_id': '0','reg_date':'2019-04-11', 'exp_date':'2019-04-13','title':'Pray for SEJABO SuccessfulPray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#EFFBFB'},
   {'post_id': '2','reg_date':'2019-04-10', 'exp_date':'2019-04-14','title':'THIS IS SEJABO TEST BENCH. Plz stay on the page','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#EFFBFB'},
   {'post_id': '4','reg_date':'2019-04-09', 'exp_date':'2019-04-15','title':'Pray for SEJABO Successful This is Third','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'},
   {'post_id': '3','reg_date':'2019-04-08', 'exp_date':'2019-04-16','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'},
   {'post_id': '1','reg_date':'2019-04-07', 'exp_date':'2019-04-17','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#FBEFEF'},
   {'post_id': '6','reg_date':'2019-04-06', 'exp_date':'2019-04-18','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#FBEFEF'},
   {'post_id': '30','reg_date':'2019-04-05', 'exp_date':'2019-04-19','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'https://do.sejong.ac.kr/attachment/view/2007/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#ECE0F8'},
   {'post_id': '8','reg_date':'2019-04-04', 'exp_date':'2019-04-10','title':'세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#ECE0F8'},
   {'post_id': '9','reg_date':'2019-04-03', 'exp_date':'2019-04-11','title':'Pray for SEJABO Successful','content':'WebProgramming and Database Project','url':'0','img_url':'https://do.sejong.ac.kr/attachment/view/940/clipboard.png','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#E0F8E6'},
   {'post_id': '5','reg_date':'2019-04-02', 'exp_date':'2019-04-12','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'4', 'color': '#E0F8E6'},
   {'post_id': '11','reg_date':'2019-04-01', 'exp_date':'2019-04-23','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'3', 'color': '#E0F8EC'}, 
   {'post_id': '8','reg_date':'2019-03-11', 'exp_date':'2019-04-24','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'2', 'color': '#E0F8EC'}, 
   {'post_id': '13','reg_date':'2019-03-17', 'exp_date':'2019-04-25','title':'세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.세자보 테스트 데이터 입니다.','content':'WebProgramming and Database Project','url':'https://www.naver.com','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '7','reg_date':'2019-03-16', 'exp_date':'2019-04-26','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '10','reg_date':'2019-03-15', 'exp_date':'2019-04-27','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '16','reg_date':'2019-03-14', 'exp_date':'2019-04-29','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '22','reg_date':'2019-03-12', 'exp_date':'2019-04-30','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}, 
   {'post_id': '33','reg_date':'2019-03-13', 'exp_date':'2019-04-01','title':'세자보 테스트 데이터 입니다. 세종대 대자보 만만세 우리나라 만만세 만세이에이에이','url':'0','content':'WebProgramming and Database Project','img_url':'0','view_count':'0','like_count':'0','dislike_count':'0','size':'1', 'color': '#E0F8EC'}
   ]
   var now_id = document.getElementById('post_modal_content')['title'];
   now_id = now_id.slice(4);
   
   var copyText_1 = box_done[now_id];
   var copyText_2 = copyText_1[5];
   for (var i=0; i<receive_list_all.length; i++){
      var receive_list_all_post = receive_list_all[i];
      if (now_id == receive_list_all_post['post_id']){
         i-=1;
         break;
      }
   }
   var clipboard_textarea = document.createElement('textarea');
   clipboard_textarea.setAttribute('id', 'clipboard_copy');
   clipboard_textarea.value = receive_list_all_post['url'];
   clipboard_textarea.style.zIndex = "-3000";
   document.body.appendChild(clipboard_textarea);
   clipboard_textarea.select();
   document.execCommand("copy");
   document.getElementById('clipboard_copy').blur();
   snackbar("URL 복사완료!");
   $('textarea').remove('#clipboard_copy');
}

//좋아요 버튼 클릭 시
function post_like_button_click() {

}

//싫어요 버튼 클릭 시
function post_hate_button_click() {
   
}