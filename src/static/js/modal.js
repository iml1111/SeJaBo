//=================================================================//
//메인 모달 세션토큰 관리.
var check_ = sessionStorage.getItem("count");
if(check_ == "ok")
   {
        $("#main_modal").addClass("modal_display_none");
    }
else sessionStorage.setItem("count", "ok");

//======================================================================//
//메인 모달 부분
var main_modal = document.getElementById('main_modal');
var main_modal_btn = document.getElementById("main_modal_btn");
main_modal_btn.onclick = function () {
  $('#main_modal_content').addClass("magictime");
  $("#main_modal_content").addClass("tinUpOut");
  setTimeout(function () {
    $('#main_modal_content').addClass("modal_display_none");
    $("#main_modal_content").removeClass("tinUpOut");
  }, 1100);
  setTimeout(function () {
    $('#main_modal').addClass("magictime");
    $("#main_modal").addClass("swashOut");
    setTimeout(function () {
      $('#main_modal').addClass("modal_display_none");
      $("#main_modal").removeClass("swashOut");
    }, 1100);
  }, 3100);
}

$('#explain_gobutton1').click(function () { //디스플레이 논을 버튼 2에서 버튼1꺼를 논시키는 형식으로 가야함.
  $('#information1').addClass("magictime");
  $('#information1').addClass("rotateLeft");
  $('#explain_gobutton1').removeClass("show_display");
  $('#explain_gobutton1').addClass("none_display");
  setTimeout(function () {
    //information2 보이게 실시!
    $('#information2').addClass("show_display");
    $('#information2').removeClass("none_display");
    $('#explain_gobutton2').addClass("show_display");
    $('#explain_gobutton2').removeClass("none_display");

    //위에서 실행된 에니메이션 다시 제거.
    $('#information1').removeClass("magictime");
    $('#information1').removeClass("rotateLeft");

    //그리고 information 디스플레이 논 처리.
    $('#information1').removeClass("show_display");
    $('#information1').addClass("none_display");
  }, 600);
});

$('#explain_gobutton2').click(function () {
  $('#information2').addClass("magictime");
  $('#information2').addClass("rotateRight");
  $('#explain_gobutton2').removeClass("show_display");
  $('#explain_gobutton2').addClass("none_display");
  setTimeout(function () {
    //information1 보이게 실시!
    $('#information1').addClass("show_display");
    $('#information1').removeClass("none_display");
    $('#explain_gobutton1').addClass("show_display");
    $('#explain_gobutton1').removeClass("none_display");

    //위에서 실행된 에니메이션 다시 제거.
    $('#information2').removeClass("magictime");
    $('#information2').removeClass("rotateRight");

    //그리고 information 디스플레이 논 처리.
    $('#information2').removeClass("show_display");
    $('#information2').addClass("none_display");
  }, 600);
});
//=====================================================================//
//로그인모달 부분
var login_modal = document.getElementById("login_modal");
var login_button = document.getElementById("login_button");
var login_modal_close = document.getElementsByClassName("login_modal_close")[0];

// When the user clicks the button, open the modal
login_button.onclick = function () {
  login_modal.style.display = "block";
  $('#login_modal_content').addClass("magictime");
  $('#login_modal_content').addClass("spaceInDown");
}
// When the user clicks on <span> (x), close the modal
login_modal_close.onclick = function () {
  login_modal.style.display = "none";
  $('#login_modal_content').removeClass("magictime");
  $('#login_modal_content').removeClass("spaceInDown");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == login_modal) {
    login_modal.style.display = "none";
    $('#login_modal_content').removeClass("magictime");
    $('#login_modal_content').removeClass("spaceInDown");
  }
}
//=====================================================================//
//내정보모달 부분
var myinfo_modal = document.getElementById("myinfo_modal");
var myinfo_button = document.getElementById("myinfo_button");
var myinfo_modal_close = document.getElementsByClassName("myinfo_modal_close")[0];
var myinfo_logout = document.getElementById("myinfo_user_logout");
// 현재 좋아요 보기가 적용되어 있음. myinfo_post_good_cnt = 1
var myinfo_post_good_cnt = 1;
var myinfo_post_bad_cnt = 0;

// When the user clicks the button, open the modal
myinfo_button.onclick = function () {
  $('#myinfo_post_bigbox').empty();
  get_user_info();
  myinfo_modal.style.display = "block";
  $('#myinfo_post_bigbox').empty();
  $('#myinfo_modal_content').addClass("magictime");
  $('#myinfo_modal_content').addClass("spaceInDown");
}
// When the user clicks on <span> (x), close the modal
myinfo_modal_close.onclick = function () {
  $('#myinfo_post_bigbox').empty();
  myinfo_modal.style.display = "none";
  $('#myinfo_modal_content').removeClass("magictime");
  $('#myinfo_modal_content').removeClass("spaceInDown");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == login_modal) {
    myinfo_modal.style.display = "none";
    $('#myinfo_modal_content').removeClass("magictime");
    $('#myinfo_modal_content').removeClass("spaceInDown");
  }
}
// 로그아웃 버튼 눌렀을 시
myinfo_logout.onclick = function() {
  snackbar("정상적으로 로그아웃이 됬습니다.");
  localStorage.removeItem("sejabo_token");
  myinfo_modal.style.display = "none";
  $('#login_button').css('display', 'block');
  $('#myinfo_button').css('display', 'none');
  $('#myinfo_modal_content').removeClass("magictime");
  $('#myinfo_modal_content').removeClass("spaceInDown");
}

//좋아요 게시물 눌렀을 시
document.getElementById('myinfo_post_good_button').onclick = function() {
  if (myinfo_post_good_cnt != 1) {
    $('#myinfo_post_good_button').addClass("myinfo_post_button_click");
    $('#myinfo_post_bad_button').removeClass("myinfo_post_button_click"); 
    myinfo_post_good_cnt = 1;
    myinfo_post_bad_cnt = 0;
    remove_myinfo_post_contents();
    likeDivMake(user_LIKE_POSTS);
  }
}
//싫어요 게시물 눌렀을 시
document.getElementById('myinfo_post_bad_button').onclick = function() {
  if (myinfo_post_bad_cnt != 1){
    $('#myinfo_post_good_button').removeClass("myinfo_post_button_click");
    $('#myinfo_post_bad_button').addClass("myinfo_post_button_click");
    myinfo_post_good_cnt = 0;
    myinfo_post_bad_cnt = 1;
    remove_myinfo_post_contents();
    likeDivMakeNot(user_DISLIKE_POSTS);
  }
}
//싫어요 또는 좋아요 게시물 클릭 시
function myinfo_user_post_click(post_id) {
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
//======================================================================//
//검색 모달 부분.
var search_modal = document.getElementById("search_modal");
var search_button = document.getElementById("search_button");
var search_modal_close = document.getElementsByClassName("search_modal_close")[0];

// When the user clicks the button, open the modal
search_button.onclick = function () {
  search_modal.style.display = "block";
  $('#search_modal_content').addClass("magictime");
  $('#search_modal_content').addClass("spaceInDown");
}
// When the user clicks on <span> (x), close the modal
search_modal_close.onclick = function () {
  search_modal.style.display = "none";
  $('#search_modal_content').removeClass("magictime");
  $('#search_modal_content').removeClass("spaceInDown");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == login_modal) {
    search_modal.style.display = "none";
    $('#search_modal_content').removeClass("magictime");
    $('#search_modal_content').removeClass("spaceInDown");
  }
}
//======================================================================//
//포스트 모달 부분.
var post_modal = document.getElementById("post_modal");
var post_modal_close = document.getElementsByClassName("post_modal_close")[0];

// When the user clicks the button, open the modal
function post_button_click(post_id) {
  post_modal.style.display = "block";
  $('#post_modal_content').addClass("magictime");
  $('#post_modal_content').addClass("spaceInDown");
  
  //좋아요 기본값 설정
  like_button_click_cnt = 0;
  hate_button_click_cnt = 0;
  if (localStorage.getItem('sejabo_token') == null){
    get_post_content(post_id);
  }
  else {
    var like_or_dislik_post = 0;
    var a_jax = A_JAX('/userinfo', "GET", localStorage.getItem('sejabo_token'));
    $.when(a_jax).done(function(){
          var json = a_jax.responseJSON;
          if(json['result'] == "success")
          {
              json_like = json['like_posts'];
              json_dislike = json['dislike_posts'];
              for(var j = 0; j< json_like.length; j++){
                if (post_id == json_like[j]['post_id']){
                  like_button_click_cnt = 1;
                  hate_button_click_cnt = 0;
                  like_or_dislik_post = 1;
                  get_post_content(post_id);
                  break;
                }
              }
              for(var j = 0; j< json_dislike.length; j++){
                if (post_id == json_dislike[j]['post_id']){
                  hate_button_click_cnt = 1;
                  like_button_click_cnt = 0;
                  like_or_dislik_post = 1;
                  get_post_content(post_id);
                  break;
                }
              }
              if(like_or_dislik_post == 0){
                get_post_content(post_id);
              }
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
// When the user clicks on <span> (x), close the modal
post_modal_close.onclick = function () {
  remove_post_content();
  post_modal.style.display = "none";
  $('#post_modal_content').removeClass("magictime");
  $('#post_modal_content').removeClass("spaceInDown");
  remove_post_content();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == login_modal) {
    post_modal.style.display = "none";
    $('#post_modal_content').removeClass("magictime");
    $('#post_modal_content').removeClass("spaceInDown");
    remove_post_content();
  }
}
// post_content_image over
function post_content_img_image_over(){
  document.getElementById('post_content_img_image').style.transform = "translate(-50%, -50%) scale(1.06, 1.06)";
}
// post_content_image out
function post_content_img_image_out(){
  document.getElementById('post_content_img_image').style.transform = "translate(-50%, -50%) scale(1,1)";
}
//=============================================================//
//게시글 관리
var filter = "win16|win32|win64|mac|macintel"; 

var post_admin_cnt = 0;

var post_admin_modal = document.getElementById("post_admin_modal");
var post_admin_modal_button = document.getElementById("myinfo_user_post_write");
var post_admin_modal_close = document.getElementsByClassName("post_admin_modal_close")[0];

// When the user clicks the button, open the modal
post_admin_modal_button.onclick = function () {
  post_admin_modal.style.display = "block";
  myinfo_modal.style.display = "none";
  $('#post_admin_modal_content').addClass("magictime");
  $('#post_admin_modal_content').addClass("spaceInDown");

}
// When the user clicks on <span> (x), close the modal
post_admin_modal_close.onclick = function () {
  post_admin_modal.style.display = "none";
  $('#post_admin_modal_content').removeClass("magictime");
  $('#post_admin_modal_content').removeClass("spaceInDown");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == post_admin_modal) {
    post_admin_modal.style.display = "none";
    $('#post_admin_modal_content').removeClass("magictime");
    $('#post_admin_modal_content').removeClass("spaceInDown");
  }
}

//박스 선택 창
$('#post_select_box_XL').click(function(){
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    }
    else {
      $('.post_select_box_img').css('width', '340');
      $('.post_select_box_img').css('height', '440');
    }
  }
  $('#post_admin_modal_date_select').attr('max','6')
});
$('#post_select_box_L').click(function(){
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      
    }
    else {
      $('.post_select_box_img').css('width', '280');
      $('.post_select_box_img').css('height', '360');
    }
  }
  $('#post_admin_modal_date_select').attr('max', '9')
});
$('#post_select_box_M').click(function(){
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    }
    else {
      $('.post_select_box_img').css('width', '200');
      $('.post_select_box_img').css('height', '280');
    }
  }
  $('#post_admin_modal_date_select').attr('max', '14')
});
$('#post_select_box_S').click(function(){
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    }
    else {
      $('.post_select_box_img').css('width', '160');
      $('.post_select_box_img').css('height', '220');
    }
  }
  $('#post_admin_modal_date_select').attr('max', '19')
});

//창 이동!
//0 = 첫 작성 창
//1 = 포스트 사이즈 선택 창
//2 = 포스트 게시장소/기한 선택 창
$('#post_admin_next_button').click(function(){
  
  if(post_admin_cnt == 0)
  {
    var title_len = $('#post_creat_title').val();
    var post_creat_file_name = $('#post_creat_file').val();
    var post_creat_URL = $('#post_creat_URL').val();

    if(post_creat_file_name.length != 0) 
    {
      var extension = post_creat_file_name.split('.')[1];
      extension = extension.toLowerCase();
      if(extension != 'jpg' && extension != 'png' && extension != 'jpeg' && extension != 'gif')
      {
        alert("파일 확장자는 jpg / png / jpeg / gif 만 업로드 가능합니다.");
        return;
      }
    }

    if(title_len.length >= 100) 
    {
      alert("제목의 길이는 100자 미만입니다.");
      return;
    }

    if(post_creat_URL.length != 0 && post_creat_URL.slice(0, 4) != "http")
    {
      alert("첨부링크는 Full URL로 기입해주세요. (http 포함)");
      return;
    }
  }
  post_admin_cnt++;
  //첫 작성 창
  if(post_admin_cnt == 0)
  {
    $('#post_admin_title').text('게시글 작성');

    //이전 버튼 숨겨줌
    $('#post_admin_prev_button').addClass('display_none');

    //포스트 작성 창 보여줌.
    $('#post_creat').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_select_box').addClass('display_none');
    $('#post_select_date').addClass('display_none');
  }

  //포스트 사이즈 선택 창
  else if(post_admin_cnt == 1)
  {
    //사진 설명 글 (피시와 모바일에서 다르게 보임)
    if (navigator.platform) {
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        $('#post_warning').text('(PC에서 보여질 크기를 선택해주세요. 기본값: XL)');
      }
    }

    $('#post_admin_title').text('포스트 사이즈 설정');
    
    //이전 버튼 보여줌
    $('#post_admin_prev_button').removeClass('display_none');

    //포스트 사이즈 선택 창 보여줌
    $('#post_select_box').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_creat').addClass('display_none');
    $('#post_select_date').addClass('display_none');
  }

  else if(post_admin_cnt == 2)
  {
    $('#post_admin_title').text('게시 장소 및 기간 설정');

    //완료 버튼 보여줌
    $('#post_admin_submit_button').removeClass('display_none');

    //포스트 게시 장소/기한 창 보여줌
    $('#post_select_date').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_create').addClass('display_none');
    $('#post_select_box').addClass('display_none');
  }
  /*
  else
  {
    post_admin_cnt = 0; //
    post_admin_modal.style.display = "none";
    $('#post_admin_modal_content').removeClass("magictime");
    $('#post_admin_modal_content').removeClass("spaceInDown");
  }
  */
});

//이번버튼
$('#post_admin_prev_button').click(function(){
  post_admin_cnt--;

  //첫 작성 창
  if(post_admin_cnt == 0)
  {
    $('#post_admin_title').text('게시글 작성');
    
    //이전 버튼 숨겨줌
    $('#post_admin_prev_button').addClass('display_none');

    //포스트 작성 창 보여줌.
    $('#post_creat').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_select_box').addClass('display_none');
    $('#post_select_date').addClass('display_none');
  }

  //포스트 사이즈 선택 창
  else if(post_admin_cnt == 1)
  {
    $('#post_admin_title').text('포스트 사이즈 설정');
    $('#post_admin_submit_button').addClass('display_none');

    //이전 버튼 보여줌
    $('#post_admin_prev_button').removeClass('display_none');

    //포스트 사이즈 선택 창 보여줌
    $('#post_select_box').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_creat').addClass('display_none');
    $('#post_select_date').addClass('display_none');
  }

  else if(post_admin_cnt == 2)
  {
    $('#post_admin_title').text('게시 장소 및 기간 설정');

    //완료버튼 보여줌.
    $('#post_admin_submit_button').removeClass('display_none');

    //포스트 게시 장소/기한 창 보여줌
    $('#post_select_date').removeClass('display_none');

    //남은 2개의 창은 숨겨줌
    $('#post_create').addClass('display_none');
    $('#post_select_box').addClass('display_none');
  }
});


//======================================================================//
//포스트 수정 모달 부분.
var post_edit_modal = document.getElementById("post_edit_modal");
var post_edit_modal_button = document.getElementById("myinfo_user_post_fix");
var post_edit_modal_close = document.getElementsByClassName("post_edit_modal_close")[0];

// When the user clicks the button, open the modal
post_edit_modal_button.onclick = function () {
  post_edit_modal.style.display = "block";
  $('#post_edit_modal_content').addClass("magictime");
  $('#post_edit_modal_content').addClass("spaceInDown");
}
// When the user clicks on <span> (x), close the modal
post_edit_modal_close.onclick = function () {
  post_edit_modal.style.display = "none";
  $('#post_edit_modal_content').removeClass("magictime");
  $('#post_edit_modal_content').removeClass("spaceInDown");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == post_edit_modal) {
    post_edit_modal.style.display = "none";
    $('#post_edit_modal_content').removeClass("magictime");
    $('#post_edit_modal_content').removeClass("spaceInDown");
  }
}