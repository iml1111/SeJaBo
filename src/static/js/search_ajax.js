function search_enter() {
    box_done = return_box_done();
    var n = box_done.length - 1;
     if (window.event.keyCode == 13) {
         //검색 모달 닫힘.
         search_modal.style.display = "none";
         $('#search_modal_content').removeClass("magictime");
         $('#search_modal_content').removeClass("spaceInDown");
         //검색 스낵바 띄움
         var search_value = $('#search_modal_textbox').val();
         snackbar("'"+search_value+"' 가 검색되었습니다.");
 
         var a_jax = A_JAX('/search/'+search_value, "GET", localStorage.getItem('sejabo_token'));
         $.when(a_jax).done(function(){
            var json = a_jax.responseJSON;
            if(json['result'] == "success")
            {
                refleshElement(n, json['list']);
            }
            else if(json['result'] == "bad request")
            {
                alert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
            else {
                aleert("일시적인 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
            }
        });
     }
 }