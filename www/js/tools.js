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
    var type = $(e).data("type").first;
    var id = $(e).data("type").last;

    switch (type) {
        case "img":
            $('.editimgmenu').show(300);
            $('.editimgmenu').removeData("id");
            $('.editimgmenu').data("id", id);
    }
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
    $(div).data("type", {
        first: "img",
        last: div
    });
}

function sendback(e) {
    var id = $('.editimgmenu').data("id");
    var index = 0;
    index = $(id).css('z-index');
    if (index == "auto") {
        index = -1;
    } else {
        index = Number(index) - 1;
    }
    $(id).css('z-index', index);
}


function bringfront(e) {
    var id = $('.editimgmenu').data("id");
    var index = 0;
    index = $(id).css('z-index');
    if (index == "auto") {
        index = 1;
    } else {
        index = Number(index) + 1;
    }
    $(id).css('z-index', index);
}

function showalign() {
    $('.snap').show();
    var id = $('.editimgmenu').data("id");
    var rt = ($('.canvas').innerWidth() / 2) - ($(id).outerWidth() / 2);
    $(id).css('left', rt);
    var ht = ($('.canvas').innerHeight() / 2) - ($(id).outerHeight() / 2);
    $(id).css('top', ht);
    $(id).css('transform', 'none');
}

function snap(pos) {
    var id = $('.editimgmenu').data("id");
    switch (pos) {
        case "topleft":
            $(id).css('left', 0);
            $(id).css('top', 0);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "topcenter":
            var rt = ($('.canvas').innerWidth() / 2) - ($(id).outerWidth() / 2);
            $(id).css('left', rt);
            $(id).css('top', 0);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "topright":
            var rt = $('.canvas').innerWidth() - $(id).outerWidth();
            $(id).css('left', rt);
            $(id).css('top', 0);
            var value = $(id).data("value").split(")");
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "centerleft":
            $(id).css('left', 0);
            var ht = ($('.canvas').innerHeight() / 2) - ($(id).outerHeight() / 2);
            $(id).css('top', ht);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "centerright":
            var rt = $('.canvas').innerWidth() - $(id).outerWidth();
            $(id).css('left', rt);
            var ht = ($('.canvas').innerHeight() / 2) - ($(id).outerHeight() / 2);
            $(id).css('top', ht);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "bottomleft":
            $(id).css('left', 0);
            var ht = $('.canvas').innerHeight() - $(id).outerHeight();
            $(id).css('top', ht);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "bottomcenter":
            var rt = ($('.canvas').innerWidth() / 2) - ($(id).outerWidth() / 2);
            $(id).css('left', rt);
            var ht = $('.canvas').innerHeight() - $(id).outerHeight();
            $(id).css('top', ht);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
        case "bottomright":
            var rt = $('.canvas').innerWidth() - $(id).outerWidth();
            $(id).css('left', rt);
            var ht = $('.canvas').innerHeight() - $(id).outerHeight();
            $(id).css('top', ht);
            value[2] = value[2] + ")";
            $(id).css('transform', value[2]);
            break;
    }
}
