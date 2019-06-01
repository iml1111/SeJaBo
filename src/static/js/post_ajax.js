var post_size = "4"; //XL(기본 값)
function BOX_XL(){
    post_size = "4";
}
function BOX_L(){
    post_size = "3";
}
function BOX_M(){
    post_size = "2";
}
function BOX_S(){
    post_size = "1";
}

//게시글 등록 =============================
function post_submit(){
    var formData = new FormData();

    var post_title = $('#post_creat_title').val();
    var post_textarea = $('#post_creat_textarea').val();
    var post_url = $('#post_creat_URL').val();
    var post_build = new Array();
    var post_deadline = today_ajax;

    for(i=0; i<4; i++)
    {
        var temp_id = "build_checkbox";
        temp_id += i;
        var checkbox = document.getElementById(temp_id);
        if($(checkbox).prop("checked"))
        {
            post_build.push($(checkbox).val());
        }
    }

    formData.append('url', post_url);
    formData.append('build', post_build);
    formData.append('title', post_title);
    formData.append('content', post_textarea);
    formData.append('size', post_size);
    formData.append('img_url', document.getElementById('post_creat_file').files[0]);
    formData.append('exp_date', post_deadline);

    var a_jax = A_JAX('/add_post', "POST", localStorage.getItem('sejabo_token'), formData);

    $.when(a_jax).done(function(){
    
        var json = a_jax.responseJSON;

        if(json['result'] == "success")
        {
            snackbar('게시글 등록 완료');
            post_admin_modal.style.display = "none";
            $('#post_admin_modal_content').removeClass("magictime");
            $('#post_admin_modal_content').removeClass("spaceInDown");
        }
        else if(json['result'] == "bad request")
        {
            alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
        else {
            alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
    })
}

//게시글 수정 =============================
function post_edit() {
    var formData = new FormData();

    var post_edit_title_real = $('#post_edit_title_real').val();
    var post_edit_textarea = $('#post_edit_textarea').val();
    var post_edit_URL = $('#post_edit_URL').val();
    
    formData.append('title', post_edit_title_real);
    formData.append('content', post_edit_textarea);
    formData.append('url', post_edit_URL);


    if (post_edit_title_real.length < 100) {
        var a_jax = A_JAX('/mod_post', "POST", localStorage.getItem('sejabo_token'), formData);

        $.when(a_jax).done(function () {

            var json = a_jax.responseJSON;

            if (json['result'] == "success") {
                post_edit_modal.style.display = "none";
                $('#post_edit_modal_content').removeClass("magictime");
                $('#post_edit_modal_content').removeClass("spaceInDown");
                get_user_info();
                snackbar('게시글이 수정되었습니다.');
            }
            else if (json['result'] == "bad request") {
                alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
            else {
                alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
        })
    }
    else
    {
        alert("제목의 길이는 100자 미만입니다.");
    }


}

//게시글 삭제 ================================
function post_delete() {
    if (confirm("정말로 삭제하시겠습니까?") == true) {
        var a_jax = A_JAX('/delete_post/'+user_POST['post_id'], "GET", localStorage.getItem('sejabo_token'));

        $.when(a_jax).done(function () {

            var json = a_jax.responseJSON;

            if (json['result'] == "success") {
                get_user_info();
                snackbar('삭제되었습니다.');
            }
            else if (json['result'] == "bad request") {
                alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
            else {
                alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
        })
    }
    else {
        return;
    }
}


//업로드 파일 미리보기. 소스 =============================
$("#post_creat_file").change(function() {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.post_select_box_img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
//=======================================================