/**
 * Created by thomas on 17/03/15.
 */

(function($){
    var Loader = null;
    var container = '#container';
    var loadScripts = [];

    var module = {
        init : function (LoaderIn, containerIn) {
            Loader = LoaderIn;
            container = containerIn;
        },

        registerLoadScript : function (script) {
            loadScripts.push(script);
        },

        loadPage : function (page, cb) {
            Loader.showLoader(function () {
                $(container).load(page+' #page',function(){
                    setTimeout(function(){
                        cb ();
                        module.changePage (page);
                        for (var i=0;i<loadScripts.length;i++) {
                            var script = loadScripts[i];
                            script();
                        }
                        Loader.hideLoader();
                    },500);
                });
            });
        },

        changePage : function (url)
        {
            if (window.history.pushState) {
                history.pushState(null, null, url);
            }
            if (window.ga) {
                window.ga('send', 'pageview');
            }
        }
    };

    window.AjaxLoader = module;

})(window.jQuery);
/**
 * Created by thomas on 17/03/15.
 */

(function($){

    var module = window.Scroller = {
        scrollTo : function (y, time, callback) {
            //console.log ("scrollTo");
            var scrollEl = module.scrollElement();
            console.log (scrollEl+" :"+$(scrollEl).scrollTop());

            if (y === $(scrollEl).scrollTop()) {
                if (callback) {
                    callback ();
                }
            } else {
                if (time === undefined) {
                    time = Math.abs(y - $(window).scrollTop());
                    time = time * 1;
                    time = time > 1500 ? 1500 : time;
                    time = time < 1000 ? 1000 : time;
                }
                console.log (y);
                $('body, html').finish().animate({scrollTop: y}, time, 'easeInOutQuart', callback);
            }
        },

        scrollElement : function() {
            var scrollEl = $(window);
            return scrollEl;
        }
    };

})(window.jQuery);
/**
 * Created by thomas on 17/03/15.
 */

(function($, AjaxLoader){

    var module = window.ContactPage = {
        pageLoaded : function () {

            $("#contactForm").validate({
                submitHandler: function(form) {
                    var data = $(form).serialize();
                    var action = $(form)[0].action;

                    $.getJSON(
                        action + "?callback=?",
                        data,
                        function (data) {
                            if (data.Status === 400) {
                                alert("Error: " + data.Message);
                                $('.contact-error').html('An error occurred');
                            } else { // 200
                                $('.contact-container').slideUp();
                                $('.contact-thanks').slideDown();
                            }
                        });

                }
            });

            $('.btnContactSubmit').click(function(ev){
               ev.preventDefault();
                console.log('submit');
                $("#contactForm").submit();
            });

            $('#contactEmail').focus(function(){
                $('#contactForm').addClass('focused');
            });

            $('#contactEmail').blur(function(){
                $('#contactForm').removeClass('focused');
            });

            $('#contactEmail').keyup(function(){
                if ($('#contactEmail').val().length > 0)
                {
                    $('#contactForm').addClass('input-content');
                }else {
                    $('#contactForm').removeClass('input-content');
                }
            });
        }
    };

    $(document).ready(function()
    {
        module.pageLoaded();

        AjaxLoader.registerLoadScript(module.pageLoaded);
    });

})(window.jQuery, window.AjaxLoader);
/**
 * Created by thomas on 17/03/15.
 */

(function($, AjaxLoader){

    var module = window.GeneralPage = {
        pageLoaded : function () {

            $(".gallery").each(function(){
                $(this).next().html('1/'+$(this).find('img').length);
            });

            if ($(".gallery img").length > 1) {
                module.initGallery ();
                //setTimeout(module.initGallery,100);
            }

            $('.scroll-block').waypoint(function(direction){
               $(this).addClass('in-view');
            }, {
                offset: '95%'
            });

            $('#content').waypoint(function(direction) {
                $('body').toggleClass('past-hero',direction == 'down');
            });
        },

        initGallery : function () {
            var owl = $(".gallery").owlCarousel({
                items: 1,
                nav: false,
                smartSpeed: 750,
                dots: false,
                loop: true,
                margin: 55,
                responsive: false
            });
            owl.on('changed.owl.carousel', function (event) {
                var i = event.item.index-1;
                i = i <= event.item.count && i > 0 ? i : 1;
                var t = i + '/' + event.item.count;
                $('.gallery-title').html(t);
            });

            $('.owl-prev, .owl-next').click(function (ev) {
                ev.preventDefault();
                if ($(this).hasClass('owl-prev')) {
                    owl.trigger('prev.owl.carousel');
                } else {
                    owl.trigger('next.owl.carousel');
                }
            });

            $('.owl-item').click(function (ev) {
                ev.preventDefault();

                owl.trigger('next.owl.carousel');
            });
        }
    };

    $(document).ready(function()
    {
        module.pageLoaded();

        AjaxLoader.registerLoadScript(module.pageLoaded);
    });


    window.Globals = module;

})(window.jQuery, window.AjaxLoader);
/**
 * Created by thomas on 17/03/15.
 */

(function($, AjaxLoader){

    var module = window.HomePage = {
        pageLoaded : function () {
            if ($('#home-video').length>0 ) {
                if ($(window).width() > 768) {
                    var p = Popcorn("#home-video")
                        .play()
                        .volume(0)
                        .on('playing', function () {
                            $("#home-video").animate({opacity: 1});
                        });

                    $('#home-video').fullscreenVideo({
                        videoWidth: 1080,
                        videoHeight: 608
                    });

                    console.log('Home');
                } else {
                    $('#home-video').hide();
                }
            }
        }
    };

    $(document).ready(function()
    {
        module.pageLoaded();

        AjaxLoader.registerLoadScript(module.pageLoaded);

        $(window).scroll(function(){
            var height = $(window).height();
            var top = $(window).scrollTop();
            var p = ((height/2)-top)/(height/2);

            if (p > 0) {
                $('.hero-spacer .title p').css({opacity: p});
            } else {
                $('.hero-spacer .title p').css({opacity: 0});
            }
        });
    });

})(window.jQuery, window.AjaxLoader);
(function($, AjaxLoader, Scroller, HomePage, GeneralPage){
    var Loader = {
        showLoader:function(cb){
            $('.loading').fadeIn(function(){
                $('nav.main').hide();
                $('body').removeClass('nav-open');
                cb();
            });
        },
        hideLoader:function(cb){
            $('.loading').fadeOut(cb);
        }
    };

    var isTouch = true;

    $(document).ready(function()
    {
        AjaxLoader.init(Loader,'#container');

        $('.btnMenu').click(function(ev){
            ev.preventDefault();
            if (!$('body').hasClass('nav-open')) {
                $('nav.main').fadeIn();
                $('body').addClass('nav-open');
            } else {
                $('nav.main').fadeOut();
                $('body').removeClass('nav-open');
            }
        });

        if ($(window).width() > 768) {
            $('.footer-graphic-spacer').waypoint(function (direction) {
                console.log ('.footer-graphic-spacer'+direction);
                $('body').toggleClass('footer-in-flow', direction == 'down');
            }, {
                offset: '100%'
            });
            $('.footer-spacer').waypoint(function (direction) {
                console.log ('.footer-spacer'+direction);
                $('body').toggleClass('near-footer', direction == 'down');
            }, {
                offset: '110%'
            });
        }

        $(document).on('click','.ajax',function(ev){
           ev.preventDefault();
            AjaxLoader.loadPage($(this).attr('href'), function(){
                $('html, body').scrollTop(0);
                $(window).trigger('resize');
                setTimeout(function(){
                    $('body').removeClass('past-hero');
                },20);
            })
        });

        $(document).on('click','a[href*=#]',function(ev) {
            ev.preventDefault();
            var href = $(this).attr('href');
            if ($(href).length > 0) {
                var el = $(href);
                var y = el.position().top;
                if ($(this).data('offset')) {
                    y += parseInt($(this).data('offset'),10);
                }
                Scroller.scrollTo(y);
            }
        });

        //setTimeout(function(){
            Loader.hideLoader();
        //},2000);
    });

    $(window).resize(function(){
        //console.log('resize');
        var wHeight = $(window).height();
        $('.fullscreen').height(wHeight);
    }).trigger('resize');


})(window.jQuery, window.AjaxLoader, window.Scroller, window.HomePage, window.GeneralPage);