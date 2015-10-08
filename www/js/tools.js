//*************************** Tools Menu fucntions *****************\\

function BG() {
    $('.editmenu').hide(200);
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
    $('.editmenu').hide(200);
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsIMG').show();
    $('.toolsubmenu').show(200);
    insertimg();
}

function TXT() {
    $('.editmenu').hide(200);
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsTXT').show();
    $('.toolsubmenu').show();
}

function SHP() {
    $('.editmenu').hide(200);
    $('.toolsubmenu').hide();
    $('.toolscnt').hide();
    $('.toolsSHP').show();
    $('.toolsubmenu').show(200);
}

function hideall() {
    $('.toolsubmenu').hide(200);
    $('.toolscnt').hide();
    $('.editmenu').hide(200);

}

//*************************** Background Menu fucntions *****************\\

function clrchange(e) {
    $('.canvas').css('backgroundColor', e);
    hideall();
}

$(function () {
    var bCanPreview = true; // can preview

    // create canvas and context objects
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }

    // select desired colorwheel
    imageSrc = 'img/colorwheel3.png';
    image.src = imageSrc;

    $('#picker').mousemove(function (e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update preview color
            var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
            $('.preview').css('backgroundColor', pixelColor);
            $('.canvas').css('backgroundColor', pixelColor);

            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);

            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
    });



    $('#picker').click(function (e) { // click event handler
        bCanPreview = !bCanPreview;
        $('.colorpicker').fadeToggle("slow", "linear");
        hideall();
    });
    $('.preview').click(function (e) { // preview click
        $('.colorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;


    });
});

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

//*************************** Images Menu fucntions *****************\\

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

function addimg(e) {
    var image = new Image();
    image.src = e;
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
    $(div).data("value", "");
    image = rescaleImage(image);
    $(div).css('height', image.height);
    $(div).css('width', image.width);
}

function rescaleImage(image_name) {
    var max_height = 200;
    var max_width = 200;
    var height = image_name.height;
    var width = image_name.width;
    var ratio = height / width;
    if (height > max_height) {
        ratio = max_height / height;
        height = height * ratio;
        width = width * ratio;
    }
    if (width > max_width) {
        ratio = max_width / width;
        height = height * ratio;
        width = width * ratio;
    }
    image_name.width = width;
    image_name.height = height;
    return image_name;
}

//*************************** Text Menu fucntions *****************\\
function addtext(type) {
    var i = $('.canvastxt').length + 1;
    var div = '<div class="canvastxt txt';
    var div = div.concat(i, '">Enter your text here</div>');
    $(".canvas").append(div);
    div = ".txt" + i;
    $(div).attr("onclick", "select(this)");
    $(div).data("type", {
        first: "txt",
        last: div
    });
    switch (type) {
        case "txttitle":
            e = "26pt";
            break;
        case "txtsubtitle1":
            e = "22pt";
            break;
        case "txtsubtitle2":
            e = "18pt";
            break;
        case "txtbody":
            e = "14pt";
            break;
    }
    $(div).css('font-size', e);
    $(div).data("value", "")
}

function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (2 + o.scrollHeight) + "px";
}

function textedit(id) {
    $(id).hide();
    $('#txtarea').css('font-size', $(id).css('font-size'));
    $('#txtarea').css('top', $(id).css('top'));
    $('#txtarea').css('left', $(id).css('left'));
    $('#txtarea').css('text-align', $(id).css('text-align'));
    $('#txtarea').css('width', $(id).css('width'));
    $('.hiddentxtarea').show();
    $('#txtarea').text($(id).text());
    $('.hiddentxtarea').removeData("id");
    $('.hiddentxtarea').data("id", id);
}

function textupdate() {
    var id = $('.hiddentxtarea').data("id");
    $('.hiddentxtarea').hide();
    $(id).show();
    $(id).text($('#txtarea').val());
    $(id).css('height', $('#txtarea').css('height'));
    $(id).css('width', $('#txtarea').css('width'));
}

function textdiscard() {
    var id = $('.hiddentxtarea').data("id");
    $('.hiddentxtarea').hide();
    $(id).show();
}

$(function () {
    var bCanPreview = true; // can preview

    // create canvas and context objects
    var canvas = document.getElementById('txtpicker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
            ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
        }
        // select desired colorwheel
    imageSrc = 'img/colorwheel3.png';
    image.src = imageSrc;

    var canvas1 = document.getElementById('txtbgpicker');
    var ctx1 = canvas1.getContext('2d');

    // drawing active image
    var image1 = new Image();
    image1.onload = function () {
        ctx1.drawImage(image1, 0, 0, image1.width, image1.height); // draw the image on the canvas
    }
    imageSrc = 'img/colorwheel3.png';
    image1.src = imageSrc;

    $('#txtpicker').mousemove(function (e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update preview color
            var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
            $('.txtpreview').css('backgroundColor', pixelColor);
            var id = $('.editmenu').data("id");
            $(id).css('color', pixelColor);

            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);

            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
    });

    $('#txtbgpicker').mousemove(function (e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas1).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx1.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update preview color
            var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
            $('.txtbgpreview').css('backgroundColor', pixelColor);
            var id = $('.editmenu').data("id");
            $(id).css('backgroundColor', pixelColor);

            // update controls
            $('#rVal').val(pixel[0]);
            $('#gVal').val(pixel[1]);
            $('#bVal').val(pixel[2]);
            $('#rgbVal').val(pixel[0] + ',' + pixel[1] + ',' + pixel[2]);

            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
        }
    });

    $('#txtpicker').click(function (e) { // click event handler
        bCanPreview = !bCanPreview;
        $('.txtcolorpicker').fadeToggle("slow", "linear");
        hideall();
    });
    $('#txtbgpicker').click(function (e) { // click event handler
        bCanPreview = !bCanPreview;
        $('.txtbgcolorpicker').fadeToggle("slow", "linear");
        hideall();
    });
    $('.txtpreview').click(function (e) { // preview click
        $('.txtcolorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;


    });
    $('.txtbgpreview').click(function (e) { // preview click
        $('.txtbgcolorpicker').fadeToggle("slow", "linear");
        bCanPreview = true;


    });
});

//*************************** Edit Menu fucntions *****************\\

function select(e) {
    hideall();
    $(".resize").removeClass("resize");
    var type = $(e).data("type").first;
    var id = $(e).data("type").last;

    switch (type) {
        case "img":
            $('.editsubmenu').hide();
            $('.editmenu').show(300);
            $('.editimgmenu').show();
            $('.editmenu').removeData("id");
            $('.editmenu').data("id", id);
            break;
        case "txt":
            $('.editsubmenu').hide();
            $('.editmenu').show(300);
            $('.edittxtmenu').show();
            $('.editmenu').removeData("id");
            $('.editmenu').data("id", id);
            break;
    }
    $(e).addClass("resize");
    check();
}

function sendback(e) {
    var id = $('.editmenu').data("id");
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
    var id = $('.editmenu').data("id");
    var index = 0;
    index = $(id).css('z-index');
    if (index == "auto") {
        index = 1;
    } else {
        index = Number(index) + 1;
    }
    $(id).css('z-index', index);
}

function showposition() {
    $('.snap').show();
    var id = $('.editmenu').data("id");
    var data = $(id).data("value");
    var value = data.split(")");
    alert(data);
    var rt = ($('.canvas').innerWidth() / 2) - ($(id).outerWidth() / 2);
    $(id).css('left', rt);
    var ht = ($('.canvas').innerHeight() / 2) - ($(id).outerHeight() / 2);
    $(id).css('top', ht);
    if (value.length = 2) {
        data = 'translate3d(0px, 0px, 0), ' + value[1] + ")";
    } else {
        data = 'translate3d(0px, 0px, 0), ' + value[2] + ")";
    }
    $(id).css('transform', 'none');

    $(id).css('transform', data);
}

function snap(pos) {
    var id = $('.editmenu').data("id");
    var data = $(id).data("value");
    var value = data.split(")");
    if (value.length = 2) {
        value[2] = value[1];
    }
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

function deleteelement() {
    var id = $('.editmenu').data("id");
    $(id).remove();
}

function aligntxt(pos) {
    var id = $('.editmenu').data("id");
    switch (pos) {
        case "left":
            $(id).css('text-align', 'left');
            break;
        case "center":
            $(id).css('text-align', 'center');
            break;
        case "right":
            $(id).css('text-align', 'right');
            break;
    }
}
