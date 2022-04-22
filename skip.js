// ==UserScript==
// @name         Bilibili(B站)跳过视频任意时长
// @namespace    https://github.com/Milled/dullOP/
// @version      0.2.1
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
// @grant        GM_getResourceText
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
        },

        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            doc.head.appendChild(style);
        },
    }

    let main = {
        initValue() {
            let value = [{
                name: "J",
                value: 90
            }, {
                name: "K",
                value: 60
            }];
        },

        registerMenuCommand() {
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
        },

        addPluginStyle() {
            let style = `
                .instant-popup { font-size: 14px !important; }
                .instant-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 15px; }
                .instant-setting-label-col { display: flex;align-items: flex-start;;padding-top: 15px;flex-direction:column }
                .instant-setting-checkbox { width: 16px;height: 16px; }
                .instant-setting-textarea { width: 100%; margin: 14px 0 0; height: 60px; resize: none; border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; color: #666; line-height: 1.2; }
                .instant-setting-input { border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; width: 100px}
                 @keyframes instantAnminate { from { opacity: 1; } 50% { opacity: 0.4 } to { opacity: 0.9; }}
                .link-instanted { animation: instantAnminate 0.6s 1; animation-fill-mode:forwards }
                .link-instanted * { animation: instantAnminate 0.6s 1; animation-fill-mode:forwards }
            `;

            if (document.head) {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('instant-style', 'style', style);
            }

            const headObserver = new MutationObserver(() => {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('instant-style', 'style', style);
            });
            headObserver.observe(document.head, {childList: true, subtree: true});
        },

        init() {
            this.initValue();
            this.addPluginStyle();
            this.registerMenuCommand();
            if (this.inExcludeList()) return;
            this.instantPage();
        }

    };

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

    main.init();
})();
