function BG() {
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsBG').show();
    $('.toolsubmenu').show(200);
    imgfill('.bgimg1', 'url(img/image.png)');
    imgfill('.bgimg2', 'url(img/add.png)');
    imgfill('.bgimg3', 'url(img/image.png)');
    imgfill('.bgimg4', 'url(img/image.png)');
    imgfill('.bgimg5', 'url(img/image.png)');
    imgfill('.bgimg6', 'url(img/image.png)');
    imgfill('.bgimg7', 'url(img/image.png)');
    imgfill('.bgimg8', 'url(img/image.png)');
}

function IMG() {
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsIMG').show();
    $('.toolsubmenu').show(200);
}

function TXT() {
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsTXT').show();
    $('.toolsubmenu').show();
}

function SHP() {
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsSHP').show();
    $('.toolsubmenu').show(200);
}

function hideall() {
    $('.toolsubmenu').hide(200);
    $('.toolscnt').hide();

}

function clrchange(e) {
    $('.canvas').css('backgroundColor', e);
    hideall();
}

function imgfill(id, img) {
    $(id).css('background-image', img);
}

function fillbgimg(id) {
    $('.canvas').css('background-image', 'none');
    id = "." + id;
    var img = $(id).css('background-image');
    $('.canvas').css('background-image', img);
    hideall();
}

function opengallery() {
    $('#getPhotoFromLibraryButton').click();
}

function insertimg() {
    var img = localStorage.getItem("imgcnt");
    var res = img.split("^");
    for (i = 0; i < res.length; i++) {
        var div = '<img class="ULimgholder ULimg' + i + '" onclick="insertimg("' + res(i) + '")></img>';
        $(".ULimgcnt").prepend(div);
        var smallImage = document.getElementById('ULimg' + i);
        smallImage.src = res(i);


    }
}
