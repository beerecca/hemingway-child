jQuery(document).ready(function($){

	/*ADD DROPDOWN STYLING*/
	$( function() {
		$( '#cd-dropdown' ).dropdown();
	});

	$( function() {
		$( '#cd-dropdown2' ).dropdown();
	});


	/*TERMS POP-UP BOX*/
	$('.terms-activate').click(function(event) {
		event.preventDefault();
		$('.overlay').css({"height":$(document).height()});
		$('.terms-text').fadeIn("slow");
		$('.overlay').fadeIn("slow");
	});
	
	$('.exit').click(function(event) {
		$('.terms-text').fadeOut("slow");
		$('.overlay').fadeOut("slow");
	});

	$('.overlay').click(function(e){
		if (e.target===this) {
			$('.terms-text').fadeOut("slow");
			$('.overlay').fadeOut("slow");
		}
	})


	/*SHOW SECOND DROPDOWN IF AWESOME TEMPLATE IS SELECTED*/
	$('.dropdown1').on("click", "li", function(){
	
		if ($('input[name="os0"]').val() == "Awesome - 2 weeks" || $('input[name="os0"]').val() == "Awesome - 1 week") {
			$('.dropdown2').css("visibility", "visible");
			$('.dropdown2 li').css("border", "1px solid #C5C5C5");
			$('.dropdown2 .cd-dropdown > span').css("border", "1px solid #C5C5C5");
		}
		else {
			$('.dropdown2').css("visibility", "hidden");
			$('.dropdown2 li').css("border", "0");
			$('.dropdown2 .cd-dropdown > span').css("border", "0");
		}
					
	});


	/*SHOW MORE SOUNDTRACKS*/
	var $more = $('.more');
	var $moreSongs = $('.soundtrack .hidden');
	$more.click(function(){
		if ($more.val() == "More") {
			$moreSongs.show("slow");
			$more.val("Less");
		}
		else {
			$moreSongs.hide("slow");
			$more.val("More");
		}
	})


	/*FORM SUBMIT WHEN ALREADY PAID*/
	var $paid = $('input.paid'),
		$pay = $('input.pay'),
		$form = $('form.upload'),
		$permalink = $('.permalink').attr("id");

	$paid.click(function(e){
		$form.attr("action", $permalink);
		$form.submit();
	});

	$pay.click(function(){
		$form.attr("action", 'https://www.paypal.com/cgi-bin/webscr');
		$form.submit();
	})


	/*FORM VALIDATION*/
	var $firstName = $('input[name="first_name"]'),
		$lastName = $('input[name="last_name"]'),
		$email = $('input[name="email"]'),
		$style = $('.dropdown1'),
		$template = $('.dropdown2'),
		$file = $('input[name="os3"]'),
		$terms = $('input[name="terms"]');

	//Required fields
	function requiredFields(field){
		var fieldName = field.attr("name");

		if (field.val() === '') {

			if (!$(".error."+fieldName).length > 0) {
				$('<div class="error '+fieldName+'">Please fill in this field.</div>').insertAfter(field);
				field.addClass("error-input");
			}

			return false;
		} else {return true;}
	}
	
	//Email field syntax correct
	function emailSyntax(){
		var val = $email.val(),
			atpos = val.indexOf("@"),
			dotpos = val.lastIndexOf(".");

		if (!(val === '') && (atpos< 1 || dotpos<atpos+2 || dotpos+2>=val.length)) {

			if (!$('.error.email-syntax').length > 0) {
				$('<div class="error email-syntax">Please check your email address, it doesn\'t look correct.</div>').insertAfter($email);
				$email.addClass("error-input");
			}

			return false;
		} else {return true;}
	}

	//Selected a style
	function styleSelected(){
		if ($('input[name="os0"]').val() == "-1") {

			if (!$('.error.style-selected').length > 0) {
				$('<div class="error style-selected">Please select a style.</div>').insertAfter($style);
			}

			return false;
		} else {return true;}
	}

	//Selected a template
	function templateSelected(){
		if (($('input[name="os0"]').val() == "Awesome - 2 weeks" || $('input[name="os0"]').val() == "Awesome - 1 week") && 
			$('input[name="os1"]').val() == "N/A") {

			if (!$('.error.template-selected').length > 0) {
				$('<br><br><div class="error template-selected">Please select an Awesome template.</div>').insertAfter($template);
			}

			return false;
		} else {return true;}
	}

	//Google Drive link correct
	function fileLink(){
		var val = $file.val();

		if (!(val === '') && val.indexOf('drive.google') < 0) {

			if (!$('.error.file-link').length > 0) {
				$('<div class="error file-link">That doesn\'t look like a Google Drive link. Please use Google Drive to share your files.</div>').insertAfter($file);
				$file.addClass("error-input");
			}

			return false;
		} else {return true;}
	}

	//Terms box checked
	function checkTerms(){
		if (!$terms.prop('checked')) {

			if (!$('.error.check-terms').length > 0) {
				$('<div class="error check-terms">Please read and agree to the terms and conditions before continuing.</div>').insertAfter('.terms-activate');
			}

			return false;
		} else {return true;}
	}

	//When user clicks out of input field, validate and show error if exists
	$firstName.blur(function(){
		requiredFields($firstName)
	});
	$lastName.blur(function(){
		requiredFields($lastName)
	});
	$email.blur(function(){
		requiredFields($email); 
		emailSyntax();
	});
	$file.blur(function(){
		requiredFields($file);
		fileLink();
	})

	//On submit, validate, show errors and scroll to them if they exist
	$('form.upload').submit(function(){
			
		var functionsFields = [[requiredFields($firstName), $firstName], [requiredFields($lastName), $lastName], [requiredFields($email), $email], [emailSyntax(), $email],
			[styleSelected(), $style], [templateSelected(), $template], [requiredFields($file), $file], [fileLink(), $file], [checkTerms(), $terms]],
			functionsFalse = [],

			isAllValid = true,
			firstInvalidField = null;

		//Run all the validation functions
		$.each(functionsFields, function(index, value){
			 if(value[0]===false){
				isAllValid = false;
				firstInvalidField = firstInvalidField===null? firstInvalidField = value[1].offset().top-30 : firstInvalidField;
			 }
		})

		if(isAllValid){
			return true;
		}

		//Now scroll to the first invalid field location
		$('html, body').animate({
			scrollTop: firstInvalidField
		}, 800);
			
		return false;
		
	});


	//On field focus, remove errors
	function removeError(field){
		
		if (field === $terms) {
			$terms.change(function(){
				$('.error.check-terms').remove();
			})
		}
		else if (field === $template) {
			$template.click(function(){
				$('.error.template-selected').remove();
			})
		}
		else if (field === $style) {
			$style.click(function(){
				$('.error.style-selected').remove();
			})
		}
		else {
			field.focus(function(){
				field.next(".error").remove();
				field.removeClass("error-input");
			});
		}
	}

	removeError($firstName);
	removeError($lastName);
	removeError($email);
	removeError($file);
	removeError($style);
	removeError($template);
	removeError($terms);


})//.ready

/**
 * jquery.dropdown.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	$.DropDown = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DropDown.defaults = {
		speed : 300,
		easing : 'ease',
		gutter : 0,
		// initial stack effect
		stack : true,
		// delay between each option animation
		delay : 0,
		// random angle and positions for the options
		random : false,
		// rotated [right||left||false] : the options will be rotated to thr right side or left side.
		// make sure to tune the transform origin in the stylesheet
		rotated : false,
		// effect to slide in the options. value is the margin to start with
		slidingIn : false,
		onOptionSelect : function(opt) { return false; }
	};

	$.DropDown.prototype = {

		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DropDown.defaults, options );
			this._layout();
			this._initEvents();

		},
		_layout : function() {

			var self = this;
			this.minZIndex = 1000;
			var value = this._transformSelect();
			this.opts = this.listopts.children( 'li' );
			this.optsCount = this.opts.length;
			this.size = { width : this.dd.width(), height : this.dd.height() };
			
			var elName = this.$el.attr( 'name' ), elId = this.$el.attr( 'id' ),
				inputName = elName !== undefined ? elName : elId !== undefined ? elId : 'cd-dropdown-' + ( new Date() ).getTime();

			this.inputEl = $( '<input type="hidden" name="' + inputName + '" value="' + value + '"></input>' ).insertAfter( this.selectlabel );
			
			this.selectlabel.css( 'z-index', this.minZIndex + this.optsCount );
			this._positionOpts();
			if( Modernizr.csstransitions ) {
				setTimeout( function() { self.opts.css( 'transition', 'all ' + self.options.speed + 'ms ' + self.options.easing ); }, 25 );
			}

		},
		_transformSelect : function() {

			var optshtml = '', selectlabel = '', value = -1;
			this.$el.children( 'option' ).each( function() {

				var $this = $( this ),
					val = isNaN( $this.attr( 'value' ) ) ? $this.attr( 'value' ) : Number( $this.attr( 'value' ) ) ,
					classes = $this.attr( 'class' ),
					selected = $this.attr( 'selected' ),
					label = $this.text();

				if( val !== -1 ) {
					optshtml += 
						classes !== undefined ? 
							'<li data-value="' + val + '"><span class="' + classes + '">' + label + '</span></li>' :
							'<li data-value="' + val + '"><span>' + label + '</span></li>';
				}

				if( selected ) {
					selectlabel = label;
					value = val;
				}

			} );

			this.listopts = $( '<ul/>' ).append( optshtml );
			this.selectlabel = $( '<span/>' ).append( selectlabel );
			this.dd = $( '<div class="cd-dropdown"/>' ).append( this.selectlabel, this.listopts ).insertAfter( this.$el );
			this.$el.remove();

			return value;

		},
		_positionOpts : function( anim ) {

			var self = this;

			this.listopts.css( 'height', 'auto' );
			this.opts
				.each( function( i ) {
					$( this ).css( {
						zIndex : self.minZIndex + self.optsCount - 1 - i,
						top : self.options.slidingIn ? ( i + 1 ) * ( self.size.height + self.options.gutter ) : 0,
						left : 0,
						marginLeft : self.options.slidingIn ? i % 2 === 0 ? self.options.slidingIn : - self.options.slidingIn : 0,
						opacity : self.options.slidingIn ? 0 : 1,
						transform : 'none'
					} );
				} );

			if( !this.options.slidingIn ) {
				this.opts
					.eq( this.optsCount - 1 )
					.css( { top : this.options.stack ? 9 : 0, left : this.options.stack ? 4 : 0, width : this.options.stack ? this.size.width - 8 : this.size.width, transform : 'none' } )
					.end()
					.eq( this.optsCount - 2 )
					.css( { top : this.options.stack ? 6 : 0, left : this.options.stack ? 2 : 0, width : this.options.stack ? this.size.width - 4 : this.size.width, transform : 'none' } )
					.end()
					.eq( this.optsCount - 3 )
					.css( { top : this.options.stack ? 3 : 0, left : 0, transform : 'none' } );
			}

		},
		_initEvents : function() {
			
			var self = this;
			
			this.selectlabel.on( 'mousedown.dropdown', function( event ) {
				self.opened ? self.close() : self.open();
				return false;

			} );

			this.opts.on( 'click.dropdown', function() {
				if( self.opened ) {
					var opt = $( this );
					self.options.onOptionSelect( opt );
					self.inputEl.val( opt.data( 'value' ) );
					self.selectlabel.html( opt.html() );
					self.close();
				}
			} );

		},
		open : function() {
			var self = this;
			this.dd.toggleClass( 'cd-active' );
			this.listopts.css( 'height', ( this.optsCount + 1 ) * ( this.size.height + this.options.gutter ) );
			this.opts.each( function( i ) {

				$( this ).css( {
					opacity : 1,
					top : self.options.rotated ? self.size.height + self.options.gutter : ( i + 1 ) * ( self.size.height + self.options.gutter ),
					left : self.options.random ? Math.floor( Math.random() * 11 - 5 ) : 0,
					width : self.size.width,
					marginLeft : 0,
					transform : self.options.random ?
						'rotate(' + Math.floor( Math.random() * 11 - 5 ) + 'deg)' :
						self.options.rotated ?
							self.options.rotated === 'right' ?
								'rotate(-' + ( i * 5 ) + 'deg)' :
								'rotate(' + ( i * 5 ) + 'deg)'
							: 'none',
					transitionDelay : self.options.delay && Modernizr.csstransitions ? self.options.slidingIn ? ( i * self.options.delay ) + 'ms' : ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : 0
				} );

			} );
			this.opened = true;

		},
		close : function() {

			var self = this;
			this.dd.toggleClass( 'cd-active' );
			if( this.options.delay && Modernizr.csstransitions ) {
				this.opts.each( function( i ) {
					$( this ).css( { 'transition-delay' : self.options.slidingIn ? ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : ( i * self.options.delay ) + 'ms' } );
				} );
			}
			this._positionOpts( true );
			this.opened = false;

		}

	}

	$.fn.dropdown = function( options ) {
		var instance = $.data( this, 'dropdown' );
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				instance ? instance._init() : instance = $.data( this, 'dropdown', new $.DropDown( options, this ) );
			});
		}
		return instance;
	};

} )( jQuery, window );
