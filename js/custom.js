"use strict";

// start custom scripts
(function($) {    
jQuery(document).ready(function($){

    /*==========  owl carousel  ==========*/ 
    $(".testimonials").owlCarousel({
        items: 1,
        auto: true,
        pagination : true,
        itemsDesktop : [1000,1],
        itemsDesktopSmall : [900,1], 
        itemsTablet: [600,1],
        itemsMobile : [479,1]
    });

    $(".image-slider").owlCarousel({
        items: 1,
        pagination : false,
        itemsDesktop : [1000,1],
        itemsDesktopSmall : [900,1], 
        itemsTablet: [600,1],
        itemsMobile : [479,1]
    });    

    /*==========  Scroll Nav  ==========*/
    $('#navigation').onePageNav({
            filter: ':not(.external)',
            begin: function() {
        },
            end: function() {
        }
    });

    /*==========  Sticky  ==========*/
    $(window).load(function(){
        $("#navigation, #mobile-navigation").sticky({ topSpacing: 0 });     
    });

    /*==========  Go To Top  ==========*/
    $(window).scroll(function(){
        if ($(this).scrollTop() > 700) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    }); 

    $('.scrollup').on(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    }); 

    /*==========  Logo  ==========*/    
    var logoWidth = $('#logo').width();
    $('#logo').css('margin-left' , -logoWidth/0);

    /*==========  Animation  ==========*/    
    $('.animated').appear(function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if ( !elem.hasClass('visible') ) {
            var animationDelay = elem.data('animation-delay');
            if ( animationDelay ) {
                setTimeout(function(){
                    elem.addClass( animation + " visible" );
                }, animationDelay);
            } else {
                elem.addClass( animation + " visible" );
            }
        }
    });  

    /*==========  Mobile Menu  ==========*/ 
    $('#mobile-navigation').on(function(){
        var mobileNavClass = $(this).find('ul').attr('class');
        if( mobileNavClass == 'inactive' ) {
            $(this).find('ul').slideDown().removeClass('inactive');
        } else {
            $(this).find('ul').slideUp().addClass('inactive');
        }
    });


    /*==========  Slideshow  ==========*/ 
    $(".rslides").responsiveSlides({
        auto: true,
        pager: true
    });

    var $window = $(window).on('resize', function(){
       var windowHeight = $(this).height();
       var windowWidth = verge.viewportW();
        if( windowWidth < 993) {
            $('.rslides li').css('height' , windowHeight);
        } else {
            $('.rslides li').css('height' , 'auto');
        }
    }).trigger('resize');


    /*==========  Contact Form Validation  ==========*/ 
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }    

    $('.contact-form form').submit(function() {
    
        var hasError = false;
      
        var message = $('#your_message').val();
        if ($.trim(message) == '') {
            $('#your_message').parent().addClass('has-error');
            $('#your_message').focus();
            hasError = true;
        }
        else {
            $('#message-txt').parent().removeClass('has-error');
        }

        var subject = $('#your_subject').val();
        if ($.trim(subject) == '') {
            $('#your_subject').parent().addClass('has-error');
            $('#your_subject').focus();
            hasError = true;
        }
        else {
            $('#your_subject').parent().removeClass('has-error');
        }       
        
       var phone = $('#your_phone').val();
        if ($.trim(phone) == '') {
            $('#your_phone').parent().addClass('has-error');
            $('#your_phone').focus();
            hasError = true;  
        }
        else {
            $('#your_phone').parent().removeClass('has-error');
        }

        var emailVal = $('#your_email').val();
        if ($.trim(emailVal) == '' || !isValidEmailAddress(emailVal)) {
            $('#your_email').parent().addClass('has-error');
            $('#your_email').focus();
            hasError = true;
        }
        else {
            $('#your_email').parent().removeClass('has-error');
        }                

       var fullname = $('#your_name').val();
        if ($.trim(fullname) == '') {
            $('#your_name').parent().addClass('has-error');
            $('#your_name').focus();
            hasError = true;            
        }
        else {
            $('#your_name').parent().removeClass('has-error');
        }        
        
        if (!hasError) {
            $('#submit').fadeOut('normal', function(){
                $('.loading').css({
                    display: "block"
                });
                
            });
            
            $.post($('.contact-form form').attr('action'), $('.contact-form form').serialize(), function(data){
                $('.log').html(data);
                $('.loading').remove();
                $('.contact-form form').slideUp('slow');
            });
            
        }
        
        return false;
        
    });  


}); // end jquery init
})(jQuery);
