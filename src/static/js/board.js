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
//박스채우기 script
var window_width = $(window).width();
var window_height = $(window).height();
$("#test").append(window_width, "<br>")
$("#test").append(window_height)
//body에 박힌 div 배열
var box_done = [];
var receive_post_list = [];
var receive_list_all;

var now_build= 'dae';
document.body.onload = refleshPage(now_build);
function addElement (return_json) {
   receive_list_all = return_json;
   //백엔드에서 정렬된 포스트 리스트가 온다.
   var receive_list= return_json;
   /*
   {
        "post_id": '1',
        "author_name": '김형석',
        "author_id": '1',
        "author_major": '컴퓨터공학과',
        "title": '세자보제목입니다.',
        "content": '세자보 내용입니다.',
        "reg_date": '2019-04-11',
        "exp_date": '2019-04-16',
        "like_count": 0,
        "dislike_count": 0,
        "url": null,
        "img_url": null,
        "size": 2,
        "build_yul": 1,
        "build_dae": 1,
        "build_hak": 0,
        "build_gwang": 1,
        "build_count": 3,
        "color": '#EFFBFB'
    }*/

   if (navigator.platform) {
      /*모바일버젼*/
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
         var box_shape = {'1': ['60', '80'], '2': ['80', '110'], '3': ['100', '150'], '4': ['130', '170']};
         var min_width = 10;            //가로 시작 지점
         var min_height = 55;         //세로 시작 지점
         var number = 10;            //최소단위 지정 (작을수록 시간이 오래걸림)
         var box_list = [];
         for (var i=0; i<receive_list.length; i++){
            box_list.push(receive_list[i]['size']);
         }
         var box_not_done = [];
         var box_out = [];
         var x0y0, x1y0, x0y1, x1,y1;
         
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
               if (receive_list[n-1]['img_url'] == null){
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
                  newImgurl = "url('../static/img_save/" + newImgurl + "')";
                  newDiv.style.backgroundImage = newImgurl;
                  newDiv.classList.add("box_css_img");
               }
               //onclick 속성 추가
               newDiv.setAttribute("onclick", "post_button_click("+receive_list[n-1]['post_id']+");");
               n+=1;
               //박스 애니메이션 추가
               newDiv.classList.add("magictime");
               newDiv.classList.add("foolishIn");
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
                  if (receive_list[n-1]['img_url'] == null){
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
                     newImgurl = "url('../static/img_save/" + newImgurl + "')";
                     newDiv.style.backgroundImage = newImgurl;
                     newDiv.classList.add("box_css_img");
                  }
                  //onclick 속성 추가
                  newDiv.setAttribute("onclick", "post_button_click("+receive_list[n-1]['post_id']+");");
                  //애니메이션 클래스 추가
                  n+=1;
                  newDiv.classList.add("magictime");
                  newDiv.classList.add("foolishIn");
                  box_out.push(newDiv);
               }
               else{
                  add_list = [x0y0[0], x0y0[1], x0y0[0] + w, x0y0[1] + h, receive_list[i].post_id];
                  box_not_done.push(add_list);
                  n += 1;
               }
            }
         }
         for (var i = 0; i< box_out.length; i++){
            document.body.appendChild(box_out[i]);
         }
      }
      /*pc버젼*/
      else {
         var box_shape = {'1': ['160', '220'], '2': ['200', '280'], '3': ['260', '360'], '4': ['320', '440']};
         var min_width = 30;            //가로 시작 지점
         var min_height = 80;         //세로 시작 지점
         var number = 20;            //최소단위 지정 (작을수록 시간이 오래걸림)
         var box_list = [];
         for (var i=0; i<receive_list.length; i++){
            box_list.push(receive_list[i]['size']);
         }
         var box_not_done = [];
         var box_out = [];
         var x0y0, x1y0, x0y1, x1,y1;
         
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
               if (receive_list[n-1]['img_url'] == null){
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
                  newImgurl = "url('../static/img_save/" + newImgurl + "')";
                  newDiv.style.backgroundImage = newImgurl;
                  newDiv.classList.add("box_css_img");
               }
               //onclick 속성 추가
               newDiv.setAttribute("onclick", "post_button_click("+receive_list[n-1]['post_id']+");");
               n+=1;
               //박스 애니메이션 추가
               newDiv.classList.add("magictime");
               newDiv.classList.add("foolishIn");
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
                  if (receive_list[n-1]['img_url'] == null){
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
                     newImgurl = "url('../static/img_save/" + newImgurl + "')";
                     newDiv.style.backgroundImage = newImgurl;
                     newDiv.classList.add("box_css_img");
                  }
                  //onclick 속성 추가
                  newDiv.setAttribute("onclick", "post_button_click("+receive_list[n-1]['post_id']+");");
                  //애니메이션 클래스 추가
                  n+=1;
                  newDiv.classList.add("magictime");
                  newDiv.classList.add("foolishIn");
                  box_out.push(newDiv);
               }
               else{
                  add_list = [x0y0[0], x0y0[1], x0y0[0] + w, x0y0[1] + h, receive_list[i].post_id];
                  box_not_done.push(add_list);
                  n += 1;
               }
            }
         }
         for (var i = 0; i< box_out.length; i++){
            document.body.appendChild(box_out[i]);
         }
      }
   }
}

function box_mouse_over(box_id) {
   document.getElementById(box_id).sytle.transform = "scale(1.06, 1.06)";
}
function box_mouse_out(box_id) {
   document.getElementById(box_id).sytle.transform = "scale(1, 1)";
}

//새로고침 요소 함수
function refleshElement (n, return_json){
   if (n ==-1){
      setTimeout(function(){
         box_done = [];
         addElement(return_json);
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
         refleshElement(n, return_json);
      }, 30);
   }
}
//새로고침함수
function refleshPage(now_build){
   //dae yul gwang hak
   newpage_submit(now_build, box_done);
}
//포스트 모달 콘텐츠 추가 및 제거
function get_post_content(post_id) {
   for (var i =0; i< receive_list_all.length; i++){
      var receive_list_post_one = receive_list_all[i];
      if (post_id == receive_list_post_one['post_id']) {
         i-=1;
         break;
      }
   }
   if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
         //현재 모달 어느 박스인지 식별자 추가함 - 모바일
         $('div').remove('#post_data_start_title'); //영역 문제로 인한 "게시 기간:" 삭제
         var new_post_box = receive_list_post_one;
         //해쉬이미지작업
         var hash__ = MD5(receive_list_post_one['author_id']+"");
         var data__ = new Identicon(hash__, img_options).toString();
         $('#profile_img_id').attr("src", "data:image/png;base64," + data__);
         $('#profile_img_id').attr("title", new_post_box['author_major'] +" "+ new_post_box['author_id'] +" "+ new_post_box['author_name']);
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
         $('#profile_img_id').attr("title", new_post_box['author_major'] +" "+ new_post_box['author_id'] +" "+ new_post_box['author_name']);
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
            document.getElementById('post_content_content').append("#세종이노센터");
         }
         if (new_post_box['build_gwang'] == 1){
            document.getElementById('post_content_content').append("#광개토관");
         }
         if (new_post_box['build_hak'] == 1){
            document.getElementById('post_content_content').append("#학술정보원");
         }
         if (new_post_box['build_yul'] == 1){
            document.getElementById('post_content_content').append("#율곡관");
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

//포스트 모달 초기화 함수
function remove_post_content() {
   if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) { //==모바일버젼
         like_hate_button_click_return();
         //보내기 글자 없애기
         $('#share_button').empty();
         var share_button_icon = document.createElement("i");
         share_button_icon.setAttribute("class", 'fas fa-clone');
         document.getElementById('share_button').appendChild(share_button_icon);
         //profile_title 원상복구 작업
         $("#profile_title").empty();
         //post_content_content 원상복구 작업
         document.getElementById('post_content_content').style.height = '300px';
         //post_content_text 원상복구 작업
         document.getElementById('post_content_text').style.paddingLeft="10px";
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
            $('id_content_good').before(post_content_url);
         }
         //post_modal_content 원상복구 작업
         document.getElementById('post_modal_content').style.width="95%";
         //post_content_text 원상복구 작업
         document.getElementById('post_content_text').style.width="100%";
         //post_top 원상복구 작업
         document.getElementById('post_top').style.width="73%";
         //share_button 원상복구 작업
         document.getElementById('share_button').style.marginLeft="10px";
         document.getElementById('share_button').style.marginTop="15px";
         //post_content_img 원상복구 작업
         if(document.getElementById('post_content_img') != undefined){
            $('div').remove('#post_content_img');
         }
         var post_content_image = document.createElement('div');
         post_content_image.setAttribute('class', 'post_content_img');
         post_content_image.setAttribute('id', 'post_content_img');
         document.getElementById('post_modal_content').appendChild(post_content_image);
         $('#post_content_text').before(post_content_image);
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
         bad_symbol.setAttribute('class', 'fas fa-thumbs-down');
         document.getElementById('post_content_good').appendChild(like_symbol);
         document.getElementById('post_content_bad').appendChild(bad_symbol);
         //post_top 내용물 원상복구 작업
         $('div').remove('#post_data_start');
         $('div').remove('#post_data_between');
         $('div').remove('#post_data_end');
         var post_dataStart = document.createElement('div');
         var post_dataBetween = document.createElement('div');
         var post_dataEnd = document.createElement('div');
         post_dataStart.setAttribute('class', 'post_data_start');
         post_dataBetween.setAttribute('class', 'post_data_between');
         post_dataEnd.setAttribute('class', 'post_data_end');
         post_dataStart.setAttribute('id', 'post_data_start');
         post_dataBetween.setAttribute('id', 'post_data_between');
         post_dataEnd.setAttribute('id', 'post_data_end');
         document.getElementById('post_top').appendChild(post_dataStart);
         document.getElementById('post_top').appendChild(post_dataBetween);
         document.getElementById('post_data_between').append("~");
         document.getElementById('post_top').appendChild(post_dataEnd);
         //post_content_content 내용 원상복구 작업
         $("#post_content_content").empty();
      }
      else {   //==PC 버젼
         like_hate_button_click_return();
         //보내기 글자 없애기
         $('#share_button').empty();
         var share_button_icon = document.createElement("i");
         share_button_icon.setAttribute("class", 'fas fa-clone');
         document.getElementById('share_button').appendChild(share_button_icon);
         //profile_title 원상복구 작업
         $("#profile_title").empty();
         //post_content_content 원상복구 작업
         document.getElementById('post_content_content').style.height = '380px';
         //post_content_text 원상복구 작업
         document.getElementById('post_content_text').style.paddingLeft="30px";
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
         bad_symbol.setAttribute('class', 'fas fa-thumbs-down');
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
   }
   
}


//클립보드 복사 함수
function clipboardCopy() {
   // 모든 포스트 리스트를 가져온다. receive_list_all
   var now_id = document.getElementById('post_modal_content')['title'];
   
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
   if (receive_list_all_post['url'] == null){
      snackbar("외부링크가 없습니다!");
   }
   else{
      snackbar("URL 복사완료!");
   }
   $('textarea').remove('#clipboard_copy');
}

//새로고침을 위한 box_done return 함수
function return_box_done() {
   return box_done;
}




//=============================================================
//좋아요 싫어요 AJAX

//좋아요 싫어요 버튼 기본값
var like_button_click_cnt = 0;
var hate_button_click_cnt = 0;

//좋아요 싫어요 버튼 초기화 함수
function like_hate_button_click_return() {
   like_button_click_cnt = 0;
   hate_button_click_cnt = 0;
   $('#post_content_good').removeClass('post_content_good_click');
   $('#post_content_good').addClass('post_content_good_nonclick');
   $('#post_content_bad').removeClass('post_content_bad_click');
   $('#post_content_bad').addClass('post_content_bad_nonclick');
}

//좋아요버튼 클릭시
function post_like_button_click(now_id){
   if (localStorage.getItem('sejabo_token') != null) {
      var a_jax = A_JAX('/like/'+now_id+'/'+1, "GET", localStorage.getItem('sejabo_token'));
      $.when(a_jax).done(function(){
          var json = a_jax.responseJSON;
          if(json['result'] == "success")
          {
              //snackbar("좋아요!");
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
}
//싫어요 버튼 클릭시
function post_hate_button_click(now_id){
   if (localStorage.getItem('sejabo_token') != null) {
      var a_jax = A_JAX('/like/'+now_id+'/'+0, "GET", localStorage.getItem('sejabo_token'));
      $.when(a_jax).done(function(){
          var json = a_jax.responseJSON;
          if(json['result'] == "success")
          {
              //snackbar("싫어요!");
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
}
//좋아요 누를 시
document.getElementById('post_content_good').onclick = function() {
    var now_id = $('#post_modal_content').attr('title');
    if (localStorage.getItem('sejabo_token') != null) {
      post_like_button_click(now_id);
      //좋아요 싫어요 전부 안 눌러져있는 경우
      if (like_button_click_cnt == 0 && hate_button_click_cnt == 0){
           like_button_click_cnt = 1;
           $('#post_content_good').removeClass('post_content_good_nonclick');
           $('#post_content_good').addClass('post_content_good_click');
           $('#post_content_bad').removeClass('post_content_bad_click');
           $('#post_content_bad').addClass('post_content_bad_nonclick');
           var now_like_count = $('#post_content_good').text()*1+1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
      //좋아요 안 눌러져있고, 싫어요 눌러져 있는 경우
      else if (like_button_click_cnt == 0 && hate_button_click_cnt == 1){
           like_button_click_cnt = 1;
           hate_button_click_cnt = 0;
           $('#post_content_good').removeClass('post_content_good_nonclick');
           $('#post_content_good').addClass('post_content_good_click');
           $('#post_content_bad').removeClass('post_content_bad_click');
           $('#post_content_bad').addClass('post_content_bad_nonclick');
           $('#fa-thumbs-up').remove();
           var now_like_count = $('#post_content_good').text()*1+1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1-1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
      //좋아요를 취소시키는 경우
      else {
           like_button_click_cnt = 0;
           $('#post_content_good').removeClass('post_content_good_click');
           $('#post_content_good').addClass('post_content_good_nonclick');
           $('#post_content_bad').removeClass('post_content_bad_click');
           $('#post_content_bad').addClass('post_content_bad_nonclick');
           var now_like_count = $('#post_content_good').text()*1-1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
    }
    else {
      snackbar("로그인 해주세요!");
    }
}
//싫어요 누를 시
document.getElementById('post_content_bad').onclick = function() {
    var now_id = $('#post_modal_content').attr('title');
    if (localStorage.getItem('sejabo_token') != null) {
      post_hate_button_click(now_id);
      //좋아요 싫어요 전부 안 눌러져있는 경우
      if (like_button_click_cnt == 0 && hate_button_click_cnt == 0){
           hate_button_click_cnt = 1;
           $('#post_content_good').removeClass('post_content_good_click');
           $('#post_content_good').addClass('post_content_good_nonclick');
           $('#post_content_bad').removeClass('post_content_bad_nonclick');
           $('#post_content_bad').addClass('post_content_bad_click');
           var now_like_count = $('#post_content_good').text()*1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1+1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
      //좋아요 눌러져있고, 싫어요 안 눌러져 있는 경우
      else if (like_button_click_cnt == 1 && hate_button_click_cnt == 0){
           like_button_click_cnt = 0;
           hate_button_click_cnt = 1;
           $('#post_content_good').removeClass('post_content_good_click');
           $('#post_content_good').addClass('post_content_good_nonclick');
           $('#post_content_bad').removeClass('post_content_bad_nonclick');
           $('#post_content_bad').addClass('post_content_bad_click');
           var now_like_count = $('#post_content_good').text()*1-1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1+1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
      //싫어요를 취소시키는 경우
      else {
           hate_button_click_cnt = 0;
           $('#post_content_good').removeClass('post_content_good_click');
           $('#post_content_good').addClass('post_content_good_nonclick');
           $('#post_content_bad').removeClass('post_content_bad_click');
           $('#post_content_bad').addClass('post_content_bad_nonclick');
           var now_like_count = $('#post_content_good').text()*1;
           $('#post_content_good').empty();
           $('#post_content_good').append(now_like_count);
           $('#post_content_good').append(" <i class='fas fa-thumbs-up'></i>");
           $('#fa-thumbs-up').remove();
           var now_dislike_count = $('#post_content_bad').text()*1-1;
           $('#post_content_bad').empty();
           $('#post_content_bad').append(now_dislike_count);
           $('#post_content_bad').append(" <i class='fas fa-thumbs-down'></i>");
      }
    }
    else{
      snackbar("로그인 해주세요!");
    }
}