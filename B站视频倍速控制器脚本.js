// ==UserScript==
// @name         B站视频倍速控制器脚本
// @namespace    https://github.com/csXLJ/bzplayer/
// @version      1.0
// @description  调整B站视频播放速度
// @author       csXLJ
// @include      https://www.bilibili.com/*
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

var controller = (function () {
    var timeId;
    var speed;
    function keyd(e) {
        var whichVideo = document.querySelector('bwp-video') != null ? document.querySelector('bwp-video') : document.querySelector('video');
        speed = whichVideo.playbackRate;
        var video = document.querySelector('.bilibili-player-video-inner');
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
        var str = speed + "x";
        addAndDelTil(video, "div", str);
        whichVideo.playbackRate = speed;
    }

    document.body.removeEventListener('keydown', keyd);
    document.body.addEventListener('keydown', keyd);

    function roundFun(value, n) {
        return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    }

    function addAndDelTil(element, tab, str) {
        if (timeId != null) {
            $(element).children().first().remove();
            clearTimeout(timeId);
        }
        // 创建节点
        var para = document.createElement(tab);
        // 创建文本节点
        var node = document.createTextNode(str);
        para.appendChild(node);
        para.style.position = "absolute";
        para.style.left = "1%";
        para.style.top = "1%";
        para.style.zIndex = 100;
        // 把p节点添加到
        element.prepend(para);
        timeId = setTimeout(function () {
            para.remove();
            clearTimeout(timeId);
        }, 2000);

    }
    // Your code here...
})();