// ==UserScript==
// @name         Bilibili(B站)跳过视频任意时长
// @namespace    https://github.com/Milled/dullOP/
// @version      0.2.0
// @description  使用J与K键分别跳过任意时长的B站番剧/视频
// @author       Milled
// @match        *://www.bilibili.com/bangumi/play/*
// @match        *://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @require      https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource     swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license      AGPL License
// ==/UserScript==

(function() {
    'use strict';

    let util = {
        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        }
    }

    let value = [{
        name: "J",
        value: 90
    }, {
        name: "K",
        value: 60
    }];

    document.onkeyup = skip;
    function skip(event) {
        var e = event || window.event;
        var video = document.querySelector("video") || document.querySelector("bwp-video");
        switch(event.keyCode) {
            case 74 :
                video.currentTime += Number(util.getValue('J'));
                video.play();
                break;
            case 75 :
                video.currentTime += Number(util.getValue('K'));
                video.play();
        }
    }


    GM_registerMenuCommand('⚙️ 设置', () => {
        let dom = `<div style="font-size: 1em;">
                        <label class="instant-setting-label">J键跳过的时间（秒）<input type="number" min="1" id="key-J" value="${util.getValue('J')}"
                        class="instant-setting-input"></label>
                        <label class="instant-setting-label">K键跳过的时间（秒）<input type="number" min="1" id="key-K" value="${util.getValue('K')}"
                        class="instant-setting-input"></label>
                    </div>`;
        Swal.fire({
            title: '配置',
            html: dom,
            showCloseButton: true,
            confirmButtonText: '保存',
            footer: '<div style="text-align: center;font-size: 1em;">点击查看 <a href="https://github.com/Milled/dullOP" target="_blank">使用说明</a>，Powered by <a href="https://github.com/Milled/">Milled</a></div>',
            customClass: {
                popup: 'instant-popup',
            },
        }).then((res) => {
            if (res.isConfirmed) {
                history.go(0);
            }
        });

        document.getElementById('key-J').addEventListener('change', (e) => {
            util.setValue('J', e.currentTarget.value);
        });
        document.getElementById('key-K').addEventListener('change', (e) => {
            util.setValue('K', e.currentTarget.value);
        });
    });
})();
