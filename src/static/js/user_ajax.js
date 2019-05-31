var user_ID; //사용자 아이디
var user_NAME; //사용자 이름
var user_MAJOR; //사용자 학과
var user_POST; //사용자 게시글
var user_LIKE_POSTS; //사용자 좋아요 게시글
var user_DISLIKE_POSTS; //사용자 싫어요 게시글

//로그인 상태 확인
if (localStorage.getItem('sejabo_token') != null) {
    var a_jax = A_JAX('/userinfo', "GET", localStorage.getItem('sejabo_token'));
    $.when(a_jax).done(function () {
        user_info = a_jax.responseJSON;
        var json = a_jax.responseJSON;
        if (json['result'] == "success") {
            user_ID = json['student_id'];
            user_NAME = json['user_name'];
            user_MAJOR = json['major_name'];
            user_POST = json['my_post'];
            user_LIKE_POSTS = json['like_posts'];
            user_DISLIKE_POSTS = json['dislike_posts'];

            //로그인 -> 내정보 버튼 변경
            $('#myinfo_button').removeClass('display_none');
            $('#login_button').addClass('display_none');
        }
        else{
            alert("자동 로그인에 실패했습니다. 다시 로그인 해주세요.");
        }
    })
}
else{
    //로그인 버튼 띄우기.
    $('#login_button').removeClass('display_none');
}

//로그인_AJAX
function sejabo_login(){
    var login_id = $("input[name=student_ID]").val();
    var login_pw = $("input[name=student_PW]").val();

    var send_data = {id: login_id, pw: login_pw};

    var a_jax = A_JAX('/login', "POST", null, send_data);
    $.when(a_jax).done(function(){
    
        var json = a_jax.responseJSON;

        if(json['result'] == "input wrong")
        {
            alert("로그인에 실패했습니다.");
        }
        else if(json['result'] == "password incorrect")
        {
            alert("비밀번호가 틀렸습니다.");
        }
        else if(json['result'] == "success")
        {
            localStorage.setItem('sejabo_token', json['access_token']);
            
            $('#myinfo_button').removeClass('display_none');
            
            $('#login_button').addClass('display_none');

            login_modal.style.display = "none";
            $('#login_modal_content').removeClass("magictime");
            $('#login_modal_content').removeClass("spaceInDown");
        }
        else {
            alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
    })
}

