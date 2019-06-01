var location_cnt = 0;
function location_now()
{   
    if(location_cnt == 0) //접혀 있을때
    {
        $('#location_box').addClass('location_box_show');
        location_cnt++;
    }
    else //열려 있을때
    {
        $('#location_box').removeClass('location_box_show');
        location_cnt--;
    }
}

var show_btn = document.getElementById('location_now');

function remove_building_class()
{
    $(show_btn).removeClass('btn-primary'); //파란
    $(show_btn).removeClass('btn-success'); //초록
    $(show_btn).removeClass('btn-danger');  //빨강
    $(show_btn).removeClass('btn-warning');  //노랑
}

$('#board1').click(function()
{   if(location_cnt == 1) location_now();
});

//dae yul gwang hak
$('#DYAI').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-primary');
    $(show_btn).text('세종이노센터');
    location_now();
    refleshPage('dae');
});

$('#DCG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-success');
    $(show_btn).text('학술정보원');
    location_now();
    refleshPage('hak');
});

$('#GGTG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-warning');
    $(show_btn).text('광개토관');
    location_now();
    refleshPage('gwang');
});

$('#YGG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-danger');
    $(show_btn).text('율곡관');
    location_now();
    refleshPage('yul');
});

//dae yul gwang hak
document.getElementById("new_page").onclick = function() {
    if ($('#location_now').text() == '세종이노센터'){
        refleshPage('dae');
    }
    else if ($('#location_now').text() == '학술정보원'){
        refleshPage('hak');
    }
    else if ($('#location_now').text() == '광개토관'){
        refleshPage('gwang');
    }
    else if ($('#location_now').text() == '율곡관'){
        refleshPage('yul');
    }
    else if($('#location_now').text() == '검색결과')
    {
        remove_building_class();
        $(show_btn).addClass('btn-primary');
        $(show_btn).text('세종이노센터');
        refleshPage('dae');
    }
    else {
        refleshPage('all')
    }
    snackbar('새로고침 되었습니다!');
}