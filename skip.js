// ==UserScript==
// @name         Bilibili(哔哩哔哩)跳过番剧片头
// @namespace    https://github.com/Milled/dullOP/
// @version      0.1.1
// @description  使用J与K键分别跳过90秒或60秒的番剧片头
// @author       Milled
// @match        *://www.bilibili.com/bangumi/play/*
// @icon         https://www.bilibili.com/favicon.ico
// @license      MIT License
// ==/UserScript==


var J = 90; //J键对应的跳过时长，单位为秒
var K = 60; //K键对应的跳过时长，单位为秒

document.onkeyup = skip;

function skip(event) {
    var e = event || window.event;
    var video = document.querySelector(".bilibili-player-video video");
    switch (event.keyCode) {
        case 74:
            video.currentTime += J;
            video.play();
            break;
        case 75:
            video.currentTime += K;
            video.play();
            break;
    }
}
