/*
 * contactable 1.5 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.min.js 2012-05-26 $
 *
 */
 
(function(jQuery){

	// Define the new for the plugin ans how to call it	
	jQuery.fn.contactable = function(options) {
		// Set default options  
		var defaults = {
			url: 'http://network-bar.data.ac.uk/feedback/endpoint',
			name: 'Name',
			email: 'Email',
			message : 'Message',
			subject : 'A contactable message',
			submit : 'SEND',
			recievedMsg : 'Thank you for your message',
			notRecievedMsg : 'Sorry but your message could not be sent, try again later',
			disclaimer: 'Please feel free to get in touch, we value your feedback',
			hideOnSubmit: false,
			captcha: 'Captcha',
			captchaFail: 'Sorry but your captcha text did not match, please try again',
			productKey: 'default',
			base: 'http://network-bar.data.ac.uk/feedback/',
			exp: 'Experience',
			extra: {}
		};

		var options = jQuery.extend(defaults, options);

		return this.each(function() {

		
		
			
			
			var this_id_prefix = '#'+this.id+' ';
			var contact_html = '<div id="contactable_inner"></div>';
			contact_html += '<form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder">';
			contact_html += '<h1>Feedback</h1><p class="disclaimer">'+options.disclaimer+'</p>';
			contact_html += '<p><label for="name">'+options.name+'<span class="red"> * </span></label><br /><input id="name" class="contact" name="name" /></p>';
			contact_html += '<p><label for="email">'+options.email+' <span class="red"> * </span></label><br /><input id="email" class="contact" name="email" /></p>';
			contact_html += '<p><label for="message">'+options.message+' <span class="red"> * </span></label><br /><textarea id="message" name="message" class="message" rows="8" cols="30" ></textarea></p>';
			contact_html += '<p><label>'+options.exp+'</label><br /><span class="emo"><img src="'+ options.base + 'images/u1F626.png" value="1"/><img src="'+ options.base + 'images/u1F61E.png" value="2"/><img src="'+ options.base + 'images/u1F610.png" value="3"/><img src="'+ options.base + 'images/u1F609.png" value="4"/><img src="'+ options.base + 'images/u1F603.png" value="5"/></span><span id="exp_radio"><input type="radio" name="exp" value="1" /><input type="radio" name="exp" value="2" /><input type="radio" name="exp" value="3" /><input type="radio" name="exp" value="4" /><input type="radio" name="exp" value="5" /> </span></p>';
			contact_html += '<p><img src="'+options.base + 'captcha/blank.png" id="captcha_img" /><label for="captcha">'+options.captcha+' <span class="red"> * </span> <span id="captcha_change" onclick="$(\'' + this_id_prefix+ '#captcha_img\').attr(\'src\', \''+ options.base + 'captcha/captcha.php?SESSID='+feedback_sessionid+'&change\');" >&#x27f3;</span></label><br /><input id="captcha" class="captcha" name="captcha"/></p>';
			contact_html += '<p><input class="submit" type="submit" value="'+options.submit+'"/></p></div></form><div id="overlay"></div>';
			
			jQuery(this).html(contact_html);


			// Toggle the form visibility

				$.fn.toggleClick = function() {
					var functions = arguments, iteration = 0
					return this.click(function() {
						functions[iteration].apply(this, arguments)
						iteration = (iteration + 1) % functions.length
					})
				}
    
			jQuery('#contactable_inner').toggleClick(function() {
				
				// Add select option if applicable
				var premessage = "";
				var newlines = "\n\n\n\n\n\n";
				var count = 0;
				$.each(options.extra, function(index, value) {
					premessage += index + ": " + value +"\n";
					count++;
				});
			
				if(premessage.length > 0){
					var prefix = newlines.substring(0,(7-count)); //Align bottom
					premessage = prefix+"Context Information:\n"+premessage;
				}
				jQuery('#contactable #message').val(premessage);
				
				
				jQuery('#contactable #captcha_img').attr("src", options.base + "captcha/captcha.php?SESSID="+ feedback_sessionid);
				
				options.amount =  Math.round(($(window).width()/2) - (jQuery('#contactable #contactForm').width()/2));
				
				jQuery('#contactable #overlay').css({display: 'block'});
				jQuery(this).animate({"marginLeft": "-=5px"}, "2000"); 
				jQuery('#contactable #contactForm').animate({"marginLeft": "-=0px"}, "2000");
				jQuery(this).animate({"marginLeft": "+="+(options.amount + 388)+"px"}, "4000"); 
				jQuery('#contactable #contactForm').animate({"marginLeft": "+="+(options.amount + 390)+"px"}, "4000"); 
			}, 
			function() {
				jQuery('#contactable #contactForm').animate({"marginLeft": "-="+(options.amount+390)+"px"}, "4000");
				jQuery(this).animate({"marginLeft": "-="+(options.amount + 388)+"px"}, "4000").animate({"marginLeft": "+=5px"}, "2000"); 
				jQuery('#contactable #overlay').css({display: 'none'});
			});



			jQuery("#contactable #contactForm").validate({
				//set the rules for the fild names
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true
					},
					captcha: {
						required: true
					}
				},
				//set messages to appear inline
					messages: {
						name: "Please enter a name",
						email: "Please enter a valid email address",
						message: "Please leave a message",
						captcha: "Human checker not parsed"
					},			

				submitHandler: submitForm
			});

			jQuery(this_id_prefix+'#contactForm .emo img').click(function() {
				jQuery('#contactForm .emo img').removeClass('selected');
				jQuery(this).addClass('selected');
				jQuery("[name=exp]").filter("[value="+jQuery(this).attr('value')+"]").prop("checked",true);
			});
			
			
			

			function submitForm() {
				// Display loading animation
				jQuery('#contactable .holder').hide();
				jQuery('#contactable #loading').show();
				

				// Trigger form submission if form is valid
				jQuery.ajax({
					url: options.url,
				    crossDomain: true,
				    contentType: "jsonp", // Pay attention to the dataType/contentType
					dataType: 'jsonp', // Pay attention to the dataType/contentType
 
					data: {
							productKey:options.productKey, 
							name:jQuery('#contactable #name').val(), 
							email:jQuery('#contactable #email').val(), 
							message:jQuery('#contactable #message').val(), 
							exp: jQuery('#contactable input:radio[name=exp]:checked').val(), 
							captcha:jQuery('#contactable #captcha').val(),
							page: window.location.href,
							SESSID: feedback_sessionid 
					},
					success: function(data) {
						
						// Hide loading animation
						jQuery('#contactable #loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery('#contactable #callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								$('#contactable_inner').click();
							}
						} else {
							jQuery('#contactable #callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery('#contactable .holder').show();
								jQuery('#contactable #callback').hide().html('');
							},2000);
						}
					},
					error:function(e){
						jQuery('#contactable #loading').css({display:'none'}); 
						jQuery('#contactable #callback').show().append(options.notRecievedMsg);
					}
				});		
			}
		});
	};
 
})(jQuery);