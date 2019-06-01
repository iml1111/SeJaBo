function newpage_submit(now_build, box_done){
    var n = box_done.length - 1;
    if (now_build == 'all'){
        var a_jax = A_JAX('/get_posts', "GET", localStorage.getItem('sejabo_token'));
    }
    else{
        var a_jax = A_JAX('/get_posts/'+now_build, "GET", localStorage.getItem('sejabo_token'));
    }
    $.when(a_jax).done(function(){
        var json = a_jax.responseJSON;
        if(json['result'] == "success")
        {
            //setTimeout(refleshElement(n, json['list']), 100);
            refleshElement(n, json['list']);
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