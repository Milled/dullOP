// ==UserScript==
// @name         Bilibili(哔哩哔哩)跳过番剧片头
// @namespace    https://github.com/Milled/dullOP/
// @version      0.1
// @description  Skip the OP of Animes
// @author       Milled
// @match        *://www.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// ==/UserScript==


var J = 90; //J键对应的跳过时长
var K = 60; //K键对应的跳过时长

document.onkeyup = skip;

function skip(event) {
    var e = event || window.event;
    var video = document.querySelector(".bilibili-player-video video");
    switch(event.keyCode) {
        case 74 :
            video.currentTime += J;
            video.play();
            break;
        case 75 :
            video.currentTime += K;
            video.play();
            break;
    }
}
