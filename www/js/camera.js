document.addEventListener("deviceready", onDeviceReady, false);

function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
    alert("ready");
    cameraApp = new cameraApp();
    cameraApp.run();
    navigator.splashscreen.hide();
}



function cameraApp() {}

cameraApp.prototype = {
    _pictureSource: null,

    _destinationType: null,

    run: function () {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
        id("capturePhotoButton").addEventListener("click", function () {
            that._capturePhoto.apply(that, arguments);
        });
        //        id("capturePhotoEditButton").addEventListener("click", function () {
        //            that._capturePhotoEdit.apply(that, arguments)
        //        });
        id("getPhotoFromLibraryButton").addEventListener("click", function () {
            that._getPhotoFromLibrary.apply(that, arguments)
        });
    },

    _capturePhoto: function () {
        var that = this;
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function () {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 50,
            destinationType: that._destinationType.FILE_URI,
            saveToPhotoAlbum: true
        });
    },
    _getPhotoFromLibrary: function () {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);
    },
    _getPhoto: function (source) {
        alert(1);
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function () {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function () {
            cameraApp._onFail.apply(that, arguments);
        }, {
            quality: 50,
            destinationType: cameraApp._destinationType.FILE_URI,
            sourceType: source
        });
    },
    _onPhotoDataSuccess: function (imageURI) {
        getcnt(imageURI);
    },
    _onPhotoURISuccess: function (imageURI) {
        getcnt(imageURI);
    },
    _onFail: function (message) {
        alert(message);
    }
}

var logOb;
var imageURI;
var cnt;

function getcnt(e) {
    alert(e);
    imageURI = e;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
        fileSys.root.getDirectory("Images", {
            create: true,
            exclusive: false
        }, function (dir) {
            var directoryReader = dir.createReader();
            directoryReader.readEntries(function getcount(entries) {
                cnt = entries.length + 1
                window.resolveLocalFileSystemURI(imageURI, function copyPhoto(fileEntry) {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                        fileSys.root.getDirectory("Images", {
                            create: true,
                            exclusive: false
                        }, function (dir) {
                            cnt = cnt + ".jpg";
                            fileEntry.copyTo(dir, cnt, function onCopySuccess(entry) {
                                getimgcnt();
                            }, fail);
                        }, fail);
                    }, fail);
                }, fail);
            }, fail);
        }, fail);
    }, fail);
}

function fail(error) {}


function capturePhoto() {
        alert();
    var that = this;
    // Take picture using device camera and retrieve image as base64-encoded string.
    navigator.camera.getPicture(function () {
        that._onPhotoDataSuccess.apply(that, arguments);
    }, function () {
        that._onFail.apply(that, arguments);
    }, {
        quality: 50,
        destinationType: that._destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });

},
