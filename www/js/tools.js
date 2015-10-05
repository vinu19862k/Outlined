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
    insertimg();
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

function opengallery(e) {
    if (e == "gallery") {

        $('#getPhotoFromLibraryButton').click();
    } else {
        $('#capturePhotoButton').click();
    }
}

function insertimg() {
    $(".ULimgcnt").empty();
    var img = localStorage.getItem("imgstr");
    var res = img.split("^");
    for (i = 0; i < res.length; i++) {
        var div = '<img class="ULimgholder ULimg';
        var div = div.concat(i, '"></img>');
        var imgid = ".ULimg" + i;
        $(".ULimgcnt").prepend(div);
        $(imgid).attr("src", res[i]);
        $(imgid).attr("onclick", "addimg('" + res[i] + "')");
    }
}

function select(e) {
    hideall();
    $(".resize").removeClass("resize");
    $(e).addClass("resize");
    check();
}

function addimg(e) {
    var i = $('.canvasimg').length + 1;
    var div = '<div class="canvasimg img';
    var div = div.concat(i, '"></div>');
    $(".canvas").append(div);
    e = "url(" + e + ")";
    div = ".img" + i;
    $(div).css('background-image', e);
    $(div).attr("onclick", "select(this)");
}
