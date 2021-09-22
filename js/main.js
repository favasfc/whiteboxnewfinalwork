(function ($) {
 "use strict";


/*---------------------
  venobox
--------------------- */


/*------------------------------------
 search option
------------------------------------- */ 
    $('.search-option').hide();
    $(".main-search").on('click', function(){
        $('.search-option').animate({
            height:'toggle',
        });
    });
/*---------------------
 TOP Menu Stick
--------------------- */
	var s = $("#sticker");
	var pos = s.position();					   
	$(window).on('scroll', function() {
		var windowpos = $(window).scrollTop();
		if (windowpos > pos.top) {
		s.addClass("stick");
		} else {
			s.removeClass("stick");	
		}
	});
/*----------------------------
 jQuery MeanMenu
------------------------------ */
    var mean_menu = $('nav#dropdown');
    mean_menu.meanmenu();
/*--------------------------
 scrollUp
---------------------------- */
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
    
/*--------------------------
 collapse
---------------------------- */
	var panel_test = $('.panel-heading a');
	panel_test.on('click', function(){
		panel_test.removeClass('active');
		$(this).addClass('active');
	});

/*--------------------------
     slider carousel
---------------------------- */
    var intro_carousel = $('.intro-carousel');
    intro_carousel.owlCarousel({
        loop:true,
        nav:true,		
        autoplay:false,
        dots:false,
        navText: ["<i class='icon icon-chevron-left'></i>","<i class='icon icon-chevron-right'></i>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    
/*----------------------------
  brand-carousel-carousel
------------------------------ */  
    $('.brand-carousel').owlCarousel({
        loop:true,
        margin:30,
        nav:false,		
        autoplay:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:6
            }
        }
    });
	
/*----------------------------
    Contact form
------------------------------ */
	$("#contactForm").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			formError();
			submitMSG(false, "Did you fill in the form properly?");
		} else {
			event.preventDefault();
			submitForm();
		}
	});
	function submitForm(){
		var name = $("#name").val();
		var email = $("#eemail").val();
		var msg_subject = $("#msg_subject").val();
		var message = $("#message").val();
		var phone = $("#phone").val();
		var selecttext = $('#contactForm select').find(":selected").text();
		var address='',
			sel='',
			sele='',
			datetimepicker1='',
			datetimepicker3='';
			
		if( $('#address').length )  
		{
			var address= $("#address").val();
		}
		if( $('#sel').length )  
		{
			var sel= $("#sel").val();
		}
		if( $('#sele').length )  
		{
			var sele= $("#sele").val();
		}
		if( $('#datetimepicker1').length )  
		{
			var datetimepicker1= $("#datetimepicker1 input").val();
		}
		if( $('#datetimepicker3').length )  
		{
			var datetimepicker3= $("#datetimepicker3 input").val();
		}


		$.ajax({
			type: "POST",
			url: "assets/contact.php",
			data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message+ "&phone=" + phone+ "&selecttext=" + selecttext+ "&address=" + address+ "&sel=" + sel+ "&sele=" + sele+ "&datetimepicker1=" + datetimepicker1+ "&datetimepicker3=" + datetimepicker3,
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					formError();
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$("#contactForm")[0].reset();
		submitMSG(true, "Message Submitted!")
	}

	function formError(){
		$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center tada animated text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
    


})(jQuery); 