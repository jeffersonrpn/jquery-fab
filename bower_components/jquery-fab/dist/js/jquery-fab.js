/*
 * Copyright 2015
 * Released under the MIT license
 * https://github.com/jeffersonrpn/jquery-fab/blob/master/LICENSE.md
 *
 * @author: Jefferson Neves <jefferson.rpn@gmail.com>
 * @version: 0.1.0
 */
(function($){
    if(!$.jfab){
        $.jfab = new Object();
    };
    
    $.jfab.fab = function(el, links, options){
        var
            base = this,
            mainBtn,
            subBtns;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        base.$el.data("kc.fab", base);
        base.$el.addClass("jfab_wrapper");
        var toogleAnimation = function(e){
            if ($(this).attr('data-link-href').length > 0){
                if ($(this).attr('data-link-target')){
                    window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                }else{
                    window.location.href = $(this).attr('data-link-href');
                }
            }
            subBtns.animate({
                opacity: "toggle",
                height: "toggle"
            }, 200);
            if (options.rotate) {
                mainBtn.toggleClass('rotate');
            }
        };
        var hide = function(e){
            subBtns.animate({
                opacity: "hide",
                height: "hide"
            }, 100);
            if (options.rotate) {
                mainBtn.removeClass('rotate');
            }
        };

        base.init = function(){
            if (typeof( links ) === "undefined" || links === null){
                links = [
                    {
                        "url":null,
                        "bgcolor":"#e74c3c",
                        "icon":"+"
                    }
                ];
            }
            if (typeof( options ) === "undefined" || options === null){
                options = {
                    rotate: false
                };
            }
            base.options = $.extend({},$.jfab.fab.defaultOptions, options);
            base.links = links;
            if (base.links.length > 0){
                mainBtnLink = base.links[0];
                colorStyle = (mainBtnLink.color)? "color:"+mainBtnLink.color+";" : "";
                bgColorStyle = (mainBtnLink.bgcolor)? "background-color:"+mainBtnLink.bgcolor+";" : "";
                mainBtnLinkHtml = "<button data-link-href='"+((mainBtnLink.url)?mainBtnLink.url:"")+"' data-link-target='"+((mainBtnLink.target)?mainBtnLink.target:"")+"'' class='jfab_main_btn' style='"+bgColorStyle+"'><span style='"+colorStyle+"'>"+mainBtnLink.icon+"</span></button>";
                
                subBtnsHtml = "";
                base.links.shift();
                /* Loop through the remaining links array */
                for (var i = 0; i < base.links.length; i++) {
                    colorStyle = (base.links[i].color)? "color:"+base.links[i].color+";" : "";
                    bgColorStyle = (base.links[i].bgcolor)? "background-color:"+base.links[i].bgcolor+";" : "";
                    subBtnsHtml += "<div><button data-link-href='"+(base.links[i].url?base.links[i].url:"")+"' data-link-target='"+((base.links[i].target)?base.links[i].target:"")+"' class='sub_fab_btn' style='"+bgColorStyle+"'><span style='"+colorStyle+"'>"+base.links[i].icon+"</span></button></div>";
                    
                }
                subBtnsHtml = "<div class='jfab_btns_wrapper'>"+subBtnsHtml+"</div>";
                base.$el.append(subBtnsHtml).append(mainBtnLinkHtml);

            }else{
                if (typeof console == "undefined") {
                    window.console = {
                        log: function (msg) {
                            alert(msg);
                        }
                    };
                }
                console.log("Invalid links array param");
            }
            mainBtn = base.$el.find(".jfab_main_btn");
            subBtns = base.$el.find(".jfab_btns_wrapper");

            mainBtn.click(toogleAnimation);
            mainBtn.focusout(hide);

            subBtns.find('.sub_fab_btn').on('mousedown', function(e){
                if ($(this).attr('data-link-href').length > 0){
                    if ($(this).attr('data-link-target')){
                        window.open($(this).attr('data-link-href'), $(this).attr('data-link-target'));
                    }else{
                        window.location.href = $(this).attr('data-link-href');
                    }
                }
            });
        };
        base.init();
    };
    
    $.jfab.fab.defaultOptions = {};
    
    $.fn.jqueryFab = function(links, options){
        return this.each(function(){
            (new $.jfab.fab(this, links, options));
        });
    };
    
})(jQuery);
