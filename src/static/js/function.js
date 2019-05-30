var location_cnt = 0;
function location_now()
{   
    if(location_cnt == 0) 
    {
        $('#location_box').addClass('location_box_show');
        location_cnt++;
    }
    else
    {
        $('#location_box').removeClass('location_box_show');
        location_cnt--;
    }
}

var show_btn = document.getElementById('location_now');

function remove_building_class()
{
    $(show_btn).removeClass('btn-primary');
    $(show_btn).removeClass('btn-success');
    $(show_btn).removeClass('btn-danger');
    $(show_btn).removeClass('btn-warning');
}

$('#DYAI').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-primary');
    $(show_btn).text('세종이노센터');
    location_now();
    refleshPage();
});

$('#DCG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-success');
    $(show_btn).text('학술정보원');
    location_now();
    refleshPage();
});

$('#GGTG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-warning');
    $(show_btn).text('광개토관');
    location_now();
    refleshPage();
});

$('#YGG').click(function()
{   
    remove_building_class();
    $(show_btn).addClass('btn-danger');
    $(show_btn).text('율곡관');
    location_now();
    refleshPage();
});