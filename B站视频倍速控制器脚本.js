// ==UserScript==
// @name         B站视频倍速控制器脚本
// @namespace    https://github.com/csXLJ/bzplayer/
// @version      4.0
// @description  调整B站所有视频播放速度
// @author       csXLJ
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @include      https://www.bilibili.com/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// @license      GPL-3.0-only
// ==/UserScript==

var controller = (function () {
    var timeId;
    var speed;
    function keyd(e) {
        var whichVideo = document.querySelector('bwp-video') != null ? document.querySelector('bwp-video') : document.querySelector('video');
        speed = whichVideo.playbackRate;
        if (e.key == "+") {
            if (speed == 16) {
                speed = 16;
            } else {
                speed = speed + 0.1;
                speed = roundFun(speed, 1);
            }
        } else if (e.key == "-") {
            if (speed == 0) {
                speed = 0;
            } else {
                speed = speed - 0.1;
                speed = roundFun(speed, 1);
            }
        }
        var str = "播放速度："+speed + "x";
        addAndDelTil(whichVideo, "div", str);
        whichVideo.playbackRate = speed;
    }

    document.body.removeEventListener('keydown', keyd);
    document.body.addEventListener('keydown', keyd);

    function roundFun(value, n) {
        return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    }

    function addAndDelTil(element, tab, str) {
        if (timeId != null) {
            $(element).prev().remove();
            clearTimeout(timeId);
        }
        var para = document.createElement(tab);
        var node = document.createTextNode(str);
        para.appendChild(node);
        para.style.position = "absolute";
        para.style.color = "white";
        para.style.fontWeight = "bold";
        para.style.borderRadius = "15px";
        para.style.border = "2px solid #00a1d6";
        para.style.backgroundColor = "#00a1d6";
        para.style.padding = "1px";
        //可自行调整显示速度透明度0 - 1
        para.style.opacity = "0.8";
        para.style.fontFamily = "-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
        para.style.left = "1%";
        para.style.top = "1%";
        para.style.zIndex = 99999;
        element.before(para);
        timeId = setTimeout(function () {
            para.remove();
            clearTimeout(timeId);
        }, 2000);

    }
    // Your code here...
})();
