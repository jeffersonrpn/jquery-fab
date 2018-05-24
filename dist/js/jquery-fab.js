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

    $.jfab.fab = function(el, buttons, options){
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        base.$el.data("kc.fab", base);
        base.$el.addClass("jfab_wrapper");

        var toogleAnimation = function(){
            base.subBtns.toggleClass('scale-out');
            base.$el.find('.sub_fab_title').toggle();
            if (options.rotate) {
                base.mainBtn.toggleClass('rotate');
            }
        };
        var hide = function(e){
            base.subBtns.addClass('scale-out');
            base.$el.find('.sub_fab_title').hide();

            if (options.rotate) {
                base.mainBtn.removeClass('rotate');
            }
        };
        var doAction = function(index){
            if(index == 0)
                toogleAnimation();

            var button = buttons[index];
            if(button){
                if (button.href){
                    if (button.target){
                        window.open(button.href, button.target);
                    }else{
                        window.location.href = button.href;
                    }
                }else if(button.onclick instanceof Function){
                    button.onclick();
                }
            }
        };

        base.init = function(){
            if (typeof( buttons ) === "undefined" || buttons === null){
                buttons = [
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
            base.buttons = buttons;
            if (base.buttons.length > 0){

                var subBtns = $("<div class='jfab_btns_wrapper'></div>");

                /* Loop through the remaining buttons array */
                for (var i = 0; i < base.buttons.length; i++) {
                    var colorStyle = (base.buttons[i].color)? "color:"+base.buttons[i].color+";" : "";
                    var bgColorStyle = (base.buttons[i].bgcolor)? "background-color:"+base.buttons[i].bgcolor+";" : "";
                    var button = $("<button style='"+bgColorStyle+"'><span style='"+colorStyle+"'>"+base.buttons[i].icon+"</span></button>");

                    button.data('index', i);

                    button.click(function(e){
                        doAction($(this).data('index'));
                    });

                    if(i==0){
                        button.addClass('jfab_main_btn');
                        button.focusout(function(){setTimeout(hide, 200)});
                        base.$el.append(button);
                        base.mainBtn = button;
                    }else{
                        button.addClass('sub_fab_btn scale-transition scale-out');
                        button = $('<div class="sub_fab"></div>').append(button);

                        if(base.buttons[i].title)
                            button.prepend('<span class="sub_fab_title">'+base.buttons[i].title+'</span>');

                        subBtns.prepend(button);
                    }
                }

                base.$el.prepend(subBtns);
                base.subBtns = base.$el.find('.sub_fab_btn');

            }else{
                if (typeof console == "undefined") {
                    window.console = {
                        log: function (msg) {
                            alert(msg);
                        }
                    };
                }
                console.log("Invalid buttons array param");
            }

        };

        base.init();
    };

    $.jfab.fab.defaultOptions = {};

    $.fn.jqueryFab = function(buttons, options){
        return this.each(function(){
            (new $.jfab.fab(this, buttons, options));
        });
    };

})(jQuery);
