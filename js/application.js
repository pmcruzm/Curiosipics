/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 10-8-2015
Cliente: Curiosipics
***********************/


/**********************
VARIABLES
**********************/
var slider_l_1_1,slider_l_1_2,slider_l_1_3_1,slider_l_1_3_2,slider_l_2_1,slider_l_2_2,slider_l_2_3,slider_l_2_4;
var slider_r_1_1,slider_r_1_2,slider_r_1_3,slider_r_2_1,slider_l_2_2,slider_r_2_3_1,slider_r_2_3_2,slider_last_pics,slider_jurado;
var speedA, speedB, speedC, speedD, speedE;
var posX,intervalo,posY,posXj;
var top_curiosidades,top_participar,top_premios,top_jurado;
var send_form=0;
var h_win,w_win;

//Eventos para dispositivos móviles
var ua = navigator.userAgent,
event = (ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? "touchstart" : "click";
var device='none';
if(ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	device='yes';
	//Event change orientation device
	window.addEventListener('orientationchange', doOnOrientationChange);
}

jQuery.noConflict();


jQuery(window).load(function(){


});

jQuery(document).ready(function(){
	
	//Obtenemos altura y anchura del navegador
	h_win=jQuery(window).height();
	w_win=jQuery(window).width();
	
	//Reinicio de variables
	posX=0; 
	posXj=0; 
	posY=0;
    speedA = 1.3;
    speedB = 0.8;
    speedC = 1.5;
    speedD = 0.6;
    speedE = 1;
	speedF = 0.3;
	
	//Reiniciar Scroll a 0
	jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay 
		var hash = window.location.hash.substring(1);
		if(hash!=""){
			//jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
		}
	});
	
	//Miramos si la cookie de aceptación está creada
	if(jQuery.cookie('cambridge-curiosipics') == 'acepta'){
		//Ocultamos info cookies 
		jQuery('.block-cookies').hide();
		//Añadimos GA
		/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				
		ga('create', 'UA-31155962-13', 'auto');
		ga('send', 'pageview');*/
	}else{
		jQuery('.block-cookies').show();
	}
	
	//Función contador de palabras textarea
	jQuery.fn.textareaCounter = function(options) {
		// setting the defaults
		// $("textarea").textareaCounter({ limit: 100 });
		var defaults = {
			limit: 50
		};	
		var options = jQuery.extend(defaults, options);
 
		// and the plugin begins
		return this.each(function() {
			var obj, text, wordcount, limited;
			
			obj = jQuery(this);
			obj.after('<span style="clear: both; margin-top: 3px; display: block;" id="counter-text">Max. '+options.limit+' palabras</span>');

			obj.keyup(function() {
			    text = obj.val();
			    if(text === "") {
			    	wordcount = 0;
			    } else {
				    wordcount = jQuery.trim(text).split(" ").length;
				}
			    if(wordcount > options.limit) {
			        jQuery("#counter-text").html('<span style="color: #DD0000;">0 palabras restantes</span>');
					limited = jQuery.trim(text).split(" ", options.limit);
					limited = limited.join(" ");
					jQuery(this).val(limited);
			    } else {
			        jQuery("#counter-text").html((options.limit - wordcount)+' palabras restantes');
			    } 
			});
		});
	};
	
	//Comprobar altura de las secciones de la home
	if ( jQuery("#galeria_sup").is(":visible")){
	  //Obtenemos las alturas de todas las secciones 
	  top_curiosidades=jQuery('#box_curiosidad').offset().top;
	  top_participar=jQuery('#box_participar').offset().top;
	  top_premios=jQuery('#box_premios').offset().top;
	  top_jurado=jQuery('#box_jurado').offset().top;
	  //console.log(top_curiosidades+'--'+top_participar+'--'+top_premios+'--'+top_jurado);
	}
	
	jQuery(window).scroll(control_scroll);
	
	//Aplicar contador de palabras al formulario de Mis pics
	if ( jQuery(".form_new_pic").is(":visible") ) {	
		jQuery("#descrip_pic").textareaCounter();
	}
	
	//Ajustamos cuadro de preview en Mis pics 
	if ( jQuery("#preview_box").is(":visible") ) {	
		jQuery("#preview_box").height(jQuery("#preview_box").width());	
	}
	
	//Ajustamos cuadros en el muro de pics 
	if ( jQuery(".wall_pics").is(":visible") ) {	
		jQuery(".box_img_small").height(jQuery(".box_img_small").width());	
	}
	
	//Si detalle está desplegado calculamos altura de los bloques
	if ( jQuery(".detalle_pic").is(":visible") ) {	
	    //console.log(jQuery(".box_img_small").outerHeight()+'--'+jQuery(".box_img_small").height())
		var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90;//-90 de padding:45px;
		//console.log('Total:'+h_total);
		jQuery(".detalle_pic").height(h_total);	
		jQuery(".img_detalle_pic").height(h_total);	
		jQuery(".cont_detalle_pic").height(h_total);
		jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
	}
	
	//Si está desplegado cuadro de voto confirmado 
	if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {	
		//console.log(jQuery(".header_vote").outerHeight());
		var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
		jQuery(".img_detalle_pic_vote").height(h_total);	
		jQuery(".cont_detalle_pic_vote").height(h_total);
		jQuery(".img_big_detalle_vote").height((jQuery(".img_detalle_pic_vote").outerHeight()));
	}
	
	//Solo ejecutar si es visible la galería
	if ( jQuery("#galeria_sup").is(":visible") ) {
		//Slider columnas de la izquierda 
		
		//var h_parent=jQuery('.left_galeria .colum_1 .box_img_2').height();
		//jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(h_parent);
		
		/*COLUMNA 1 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
		slider_l_1_1=jQuery('.left_galeria .bxslider_l_1_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5000,speed:1200});
		//Cuadro columna 1 bloque 2
		jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
		slider_l_1_2=jQuery('.left_galeria .bxslider_l_1_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000,speed:1200});
		//Cuadro columna 1 bloque 3-1
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_1=jQuery('.left_galeria .bxslider_l_1_3_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4400,speed:1200});
		//Cuadro columna 1 bloque 3-2
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_2=jQuery('.left_galeria .bxslider_l_1_3_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3500,speed:1200});
		
		/*COLUMNA 2 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
		slider_l_2_1=jQuery('.left_galeria .bxslider_l_2_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2800,speed:1200});
		//Cuadro columna 1 bloque 2
		jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
		slider_l_2_2=jQuery('.left_galeria .bxslider_l_2_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2300,speed:1200});
		//Cuadro columna 1 bloque 3-1
		jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
		slider_l_2_3=jQuery('.left_galeria .bxslider_l_2_3').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3200,speed:1200});
		//Cuadro columna 1 bloque 3-2
		jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
		slider_l_2_4=jQuery('.left_galeria .bxslider_l_2_4').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4200,speed:1200});
		
		/*COLUMNA 1 DERECHA*/
		//Cuadro columna 1 bloque 1
		jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
		slider_r_1_1=jQuery('.right_galeria .bxslider_r_1_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4300,speed:1200});
		//Cuadro columna 1 bloque 2
		jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
		slider_r_1_2=jQuery('.right_galeria .bxslider_r_1_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2200,speed:1200});
		//Cuadro columna 1 bloque 3-1
		jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
		slider_r_1_3=jQuery('.right_galeria .bxslider_r_1_3').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3600,speed:1200});
		
		/*COLUMNA 2 DERECHA*/
		//Cuadro columna 2 bloque 1
		jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
		slider_r_2_1=jQuery('.right_galeria .bxslider_r_2_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5200,speed:1200});
		//Cuadro columna 1 bloque 2
		jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
		slider_r_2_2=jQuery('.right_galeria .bxslider_r_2_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3700,speed:1200});
		//Cuadro columna 2 bloque 3-1
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_1=jQuery('.right_galeria .bxslider_r_2_3_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4250,speed:1200});
		//Cuadro columna 2 bloque 3-2
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_2=jQuery('.right_galeria .bxslider_r_2_3_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3150,speed:1200});
		
		/*Últimos Pics*/
		jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
		slider_last_pics=jQuery('.bxslider_ultimos_pics').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:5,maxSlides:5,slideWidth:3200,slideMargin:0,ticker:true});
		
		/*Jurado mobile*/
		slider_jurado=jQuery('.bxslider_jurado').bxSlider({pager: true,infiniteLoop:true,useCSS:false,controls:false,adaptiveHeight:true});
	}
	
	//Cuando queremos desplegar ventana de login
	jQuery(document).on("click",".btn_login", function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('active')){
			jQuery(this).removeClass('active');
			jQuery('#box_login').stop().clearQueue().fadeOut(600,function(){
				//Limpiamos los campos
				jQuery('.box_login').show();
				jQuery('.box_forget').hide();
				jQuery('.feedback').text('').hide();
			});
		}else{
			jQuery(this).addClass('active');
			jQuery('#box_login').stop().clearQueue().fadeIn(600);
		}
	});
	
	//Enviar formulario de registro
	jQuery(document).on("submit","#registro-form", function(e) {
		if(send_form==0){
			send_form=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores").html("");
			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#registro-form');
			if(result==1){
				e.preventDefault();
				send_form=0;
			}
		}
	});
	
	//Enviar formulario de nueva contraseña
	jQuery(document).on("submit","#new-password-form", function(e) {
		if(send_form==0){
			send_form=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores").html("");
			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#new-password-form');
			console.log(result);
			if(result==1){
				e.preventDefault();
				send_form=0;
			}
		}
	});
	
	//Enviar formulario de contacto
	jQuery(document).on("submit","#contacto-form", function(e) {
		if(send_form==0){
			send_form=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores").html("");
			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#contacto-form');
			console.log(result);
			if(result==1){
				e.preventDefault();
				send_form=0;
			}
		}
	});
	
	//Enviar formulario de votar pic
	jQuery(document).on("submit","#form-votar-pic", function(e) {
		if(send_form==0){
			send_form=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores").html("");
			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=0;
			//Busca todos los campos requeridos de mail
			var res_campo=jQuery('#mail_pic').val();
			if((res_campo=="") || (res_campo!="" && validateEmail(res_campo)==false) ){
				result=1;
				jQuery('#mail_pic').addClass('error').val('');
			}
			
			if(result==1){
				e.preventDefault();
				send_form=0;
			}
		}
	});
	
	//Eliminar marco de error cuando se hace click sobre un input con error
	jQuery(document).on('focus','form input,form textarea,form input[type=checkbox]',function(event){
		event.preventDefault();
		if(jQuery(this).attr('type')!='submit'){
			if(jQuery(this).hasClass('error')){
				jQuery(this).removeClass('error');
			}
		}
	});
	
	//Desplegar la info de un pic en concreto
	jQuery(document).on("click",".box_img_small a", function(e) {
		e.preventDefault();
		var id_pic=jQuery(this).attr('rel');
		show_pic(id_pic);	
	});
	
	//Cuando queremos cerrar detalles de pic
	jQuery(document).on("click",".close_pic", function(e) {
		e.preventDefault();
		jQuery('.detalle_pic').stop().clearQueue().slideUp(600,'easeInOutExpo',function(){
			jQuery(".detalle_pic").remove();
			jQuery('.box_img_small').removeClass('active');
			jQuery('.box_img_small a').removeClass('active');
		});
	});
	
	//Cuando queremos pasar al siguiente pic
	jQuery(document).on("click",".next_pic", function(e) {
		e.preventDefault();
		//Miramos cual es el pic siguiente
		var id_next; 
		//Cerramos cuadro actual desplegado y buscamos el siguiente  
		jQuery('.detalle_pic').stop().clearQueue().slideUp(600,'easeInOutExpo',function(){	
			jQuery(".detalle_pic").remove();
			id_next=jQuery('.box_img_small  a.active').parents('.box_img_small').next('div').find('a').attr('rel');
			show_pic(id_next);
		});
	});
	
	//Cuando queremos pasar al pic anterior
	jQuery(document).on("click",".prev_pic", function(e) {
		e.preventDefault();
		//Miramos cual es el pic siguiente
		var id_prev; 
		//Cerramos cuadro actual desplegado y buscamos el siguiente  
		jQuery('.detalle_pic').stop().clearQueue().slideUp(600,'easeInOutExpo',function(){
			jQuery(".detalle_pic").remove();
			id_prev=jQuery('.box_img_small  a.active').parents('.box_img_small').prev().find('a').attr('rel');
			show_pic(id_prev);
		});
	});
	
	//Cerrar cuadro info cookies
	jQuery(document).on('click','.close_c',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(600);
	});
	
	//Abrir menú mobile
	jQuery(document).on('click','.right_top_header.mobile_opc .custom-menu',function(e){
		e.preventDefault();
		if(jQuery(this).parents('.mobile_opc').hasClass('active')){
			jQuery('.extend_menu_mob').slideUp(600,function(){
				jQuery(this).parents('.mobile_opc').removeClass('active');
			});
		}else{
			jQuery(this).parents('.mobile_opc').addClass('active');
			jQuery('.extend_menu_mob').delay(200).slideDown(600);
		}
	});
	
	//Aceptar cookies en el cuadro
	jQuery(document).on('click','.btn-accept',function(e){
		e.preventDefault();
		jQuery('.block-cookies').fadeOut(600,function(){
			//Creamos la cookie de aceptación
			jQuery.cookie('cambridge-curiosipics', 'acepta', { expires: 365 * 10 ,path: '/' });
			//Añadimos GA
			/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				
			ga('create', 'UA-31155962-13', 'auto');
			ga('send', 'pageview');*/
		});
	});

	//Mostrar formulario de resetar password
	jQuery(document).on('click','.reset_password',function(e){
		e.preventDefault();
		jQuery('.box_login').fadeOut(600,function(){
			jQuery('.box_forget').fadeIn(600);
		});
		
	});
	
	//Abrir modal de busqueda 
	jQuery(document).on('click','.item_search a',function(e){
		e.preventDefault();
		jQuery('.over_search').fadeIn(600);
		
	});
	
	//Cerrar modal de busqueda close_search
	jQuery(document).on('click','.close_search',function(e){
		e.preventDefault();
		jQuery('.over_search').fadeOut(600,function(){
			jQuery('#form-search-pic input[type=text]').val("");
		});
		
	});
	
	//Mostrar modal votar pic
	jQuery(document).on('click','.btn_votar',function(e){
		e.preventDefault();
		jQuery('.box_pop_votar').fadeIn(600,function(){});
		
	});
	
	//Cerrar modal votar pic
	jQuery(document).on('click','.close_votar,.bg_pop_votar',function(e){
		e.preventDefault();
		jQuery('.box_pop_votar').fadeOut(600,function(){
			jQuery('#form-votar-pic input[type=email]').val("").removeClass('error');
		});
		
	});
	
	//Comprobación del login/forgot-password vía AJAX
	jQuery('#form-login,#form-forgot-password').on('submit', function(e){
		e.preventDefault();
		
		var f = jQuery(this);
		
		jQuery.ajax({
		url: f.attr('action'),
		method: f.attr('method'),
		data: f.serialize(),
		dataType: 'json',
		success : function(response) {
			if(response.errorCode == 0){
				//success message
				jQuery('.feedback', f).text(response.message).show(400);
				if(response.redirect){window.top.location = response.redirect;}
			}else{
				//some error message
				jQuery('.feedback', f).text(response.message).show(400);
			}
		 }
	   });
		
	});
	
	//Cambios en en los campos fecha para mostrar tutor
	jQuery(document).on('change','#birth_day,#birth_month,#birth_year', function() {
			//Busca todos los campos requeridos de día
			if(jQuery('#registro-form').find('.validation-rule-day').length > 0){
				var error_day=0;
				jQuery('#registro-form').find('.validation-rule-day').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1) || (res_campo!="" && isNumber(res_campo)==true && res_campo>31) ){
						error_day=1;
					}

				});
			}
			
			//Busca todos los campos requeridos de mes
			if(jQuery('#registro-form').find('.validation-rule-month').length > 0){
				var error_month=0;
				jQuery('#registro-form').find('.validation-rule-month').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1) || (res_campo!="" && isNumber(res_campo)==true && res_campo>12)  ){
						error_month=1;
					}

				});
			}
			
			//Busca todos los campos requeridos de año
			if(jQuery('#registro-form').find('.validation-rule-year').length > 0){
				var error_year=0;
				jQuery('#registro-form').find('.validation-rule-year').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1900) ){
						error_year=1;
					}

				});
			}
			
			//Comprobar si la fecha introducida es mayor de 14años
			if( error_day==0 && error_month==0 && error_year==0){
				var error_big_14=0;
				var year=jQuery('.validation-rule-year').val();
				var month=(jQuery('.validation-rule-month').val()-1);
				var day=jQuery('.validation-rule-day').val();
				if (meetsMinimumAge(new Date(year, month, day),14)) {
					error_big_14=0;
					jQuery('.tutor_datos').hide();
				}else{
					error_big_14=1;
					//Mostramos el campo de tutor legal
					if(jQuery('.tutor_datos').is(":visible")){
						 jQuery('.tutor_datos').show();
					}else{
						var message='Menor de 14 años!! Debe rellenar los datos de tutor legal.';
						jQuery('.errores').append('<p>'+message+'</p>');	
						jQuery('.tutor_datos').show();
					}
				}
			}
	});
	
	
	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {
		
		//Obtenemos altura y anchura del navegador
		h_win=jQuery(window).height();
		w_win=jQuery(window).width();
		
		//Siestamos haciendo resize en home reiniciar scroll o
		if ( jQuery("#galeria_sup").is(":visible") ) {
			
			jQuery('body').scrollTo( "0px", 0,function(){});
			
			//Resize ticker de home (Falta nº de cuadros según resolución)
			jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
			slider_last_pics.reloadSlider();
		}
		
		//Ajustamos cuadro de preview en Mis pics 
		if ( jQuery("#preview_box").is(":visible") ) {	
			jQuery("#preview_box").height(jQuery("#preview_box").width());	
		}
		
		//Ajustamos cuadros en el muro de pics 
		if ( jQuery(".wall_pics").is(":visible") ) {	
			jQuery(".box_img_small").height(jQuery(".box_img_small").width());	
		}	
		
		//Ajustamos cuadros en el muro de pics 
		if ( jQuery(".wall_pics").is(":visible") ) {	
			jQuery(".box_img_small").height(jQuery(".box_img_small").width());	
		}
		
		//Si detalle está desplegado calculamos altura de los bloques
		if ( jQuery(".detalle_pic").is(":visible") ) {	
			//console.log(jQuery(".box_img_small").outerHeight()+'--'+jQuery(".box_img_small").height())
			var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90;//-90 de padding:45px;
			//console.log('Total:'+h_total);
			jQuery(".detalle_pic").height(h_total);	
			jQuery(".img_detalle_pic").height(h_total);	
			jQuery(".cont_detalle_pic").height(h_total);
			jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
		}
		
		//Si está desplegado cuadro de voto confirmado 
		if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {	
			//console.log(jQuery(".header_vote").outerHeight());
			var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
			jQuery(".img_detalle_pic_vote").height(h_total);	
			jQuery(".cont_detalle_pic_vote").height(h_total);
			jQuery(".img_big_detalle_vote").height((jQuery(".img_detalle_pic_vote").outerHeight()));
		}
	
	});


});


/*************************
FUNCIONES JAVASCRIPT
**************************/


//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll	
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#pie').height();
  
  //Añadir Cookie si se hace scroll a +100px
  if(scrollAmount>100){
 		if(jQuery.cookie('cambridge-curiosipics') != 'acepta'){
			jQuery('.block-cookies').fadeOut(600,function(){
				//Creamos la cookie de aceptación
				jQuery.cookie('cambridge-curiosipics', 'acepta', { expires: 365 * 10 ,path: '/' });
				//Añadimos GA
				/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
					
				ga('create', 'UA-31155962-13', 'auto');
				ga('send', 'pageview');*/
			});
		}
  }
  
  //Solo ejecutar si es visible la galería (HOME)
  if ( jQuery("#galeria_sup").is(":visible") && device=='none' && w_win>800) {
	   
	   	  top_curiosidades=jQuery('#box_curiosidad').offset().top;
		  top_participar=jQuery('#box_participar').offset().top;
		  top_premios=jQuery('#box_premios').offset().top;
		  top_jurado=jQuery('#box_jurado').offset().top;
		  
		    /*
		    speedA = 1.3;
			speedB = 0.8;
			speedC = 1.5;
			speedD = 0.6;
			speedE = 1;
			speedF = 0.3
			  */	
	   		
	  	  //Añadir clases a los enlaces del menú según scroll
		  if(scrollAmount<(top_curiosidades)){jQuery("#top_header").removeClass();}
		  if(scrollAmount>(top_curiosidades) && scrollAmount<(top_participar)){jQuery("#top_header").removeClass().addClass('block1');}
		  if(scrollAmount>(top_participar) && scrollAmount<(top_premios)){jQuery("#top_header").removeClass().addClass('block2');}
		  if(scrollAmount>(top_premios) && scrollAmount<(top_jurado)){jQuery("#top_header").removeClass().addClass('block3');}
		  if(scrollAmount>(top_jurado)){jQuery("#top_header").removeClass().addClass('block4');}
	  
		  //Animación decoración superior de la home 
		  if(scrollAmount<top_curiosidades){
			/*Decoración 1*/  
			jQuery('.deco_1_1').stop().clearQueue().animate({ top: 64-(scrollAmount * speedC)}, 0);
			jQuery('.deco_1_2').stop().clearQueue().animate({ top: 0-(scrollAmount * speedD)}, 0);
			
			jQuery('.deco_2_1').stop().clearQueue().animate({ top: 180-(scrollAmount * speedD)}, 0);
			jQuery('.deco_2_2').stop().clearQueue().animate({ top: 145-(scrollAmount * speedA)}, 0);
			jQuery('.deco_2_3').stop().clearQueue().animate({ top: 261-(scrollAmount * speedE)}, 0);
			jQuery('.deco_2_4').stop().clearQueue().animate({ top: 0-(scrollAmount * speedB)}, 0);
			jQuery('.deco_2_5').stop().clearQueue().animate({ bottom: 0+(scrollAmount * speedF)}, 0);
			
			jQuery('.deco_3_1').stop().clearQueue().animate({ bottom: 0+(scrollAmount * speedA)}, 0);
			jQuery('.deco_3_2').stop().clearQueue().animate({ bottom: 150+(scrollAmount * speedB)}, 0);
			jQuery('.deco_3_3').stop().clearQueue().animate({ top: 35-(scrollAmount * speedD)}, 0);
			jQuery('.deco_3_4').stop().clearQueue().animate({ top: 0-(scrollAmount * speedF)}, 0);
			
			jQuery('#box_curiosidad').stop().clearQueue().animate({ marginTop: 0-(scrollAmount * speedE)}, 0);
		  }
		  
		  //Animación de decoración de la sección curiosidades 
		  if(scrollAmount>(top_curiosidades-parseInt(5*h_win/8))){
			  jQuery('.deco_4_1').stop().clearQueue().animate({ top: 60-((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedF)}, 0);
			  jQuery('.deco_4_2').stop().clearQueue().animate({ bottom: 7+((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedB)}, 0);
			  jQuery('.deco_4_3').stop().clearQueue().animate({ top: 0-((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedD)}, 0);
			  
			 jQuery('.deco_5_1').stop().clearQueue().animate({ top: 0-((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedD)}, 0);
			  jQuery('.deco_5_2').stop().clearQueue().animate({ top: 100-((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedB)}, 0);
			  jQuery('.deco_5_3').stop().clearQueue().animate({ top: 0-((scrollAmount-(top_curiosidades-parseInt(5*h_win/8))) * speedF)}, 0);
		  }
		  
		   //Animación de decoración de la sección participar 
		  if(scrollAmount>(top_participar-(h_win+100))){
			  //console.log(scrollAmount+'--'+(top_participar-(h_win/2)));
			 posY=(scrollAmount-(top_participar-(h_win+100)))*0.15;
			 //console.log(posY);
			jQuery('#box_participar .container').css({ backgroundPosition:"50% "+(-posY)+"px" });
		  }
		  
		   //Animación de decoración de la sección premios 
		  if(scrollAmount>(top_premios-(3*h_win/4))){
			 posX=-(scrollAmount-(top_premios-(3*h_win/4)))*0.3;
			 //console.log(posY);
			jQuery('#box_premios .container').css({ backgroundPosition: posX+"px bottom" });
		  }
		  
		   //Animación de decoración de la sección premios 
		  if(scrollAmount>(top_jurado-(3*h_win/4))){
			 posXj=-(scrollAmount-(top_jurado-(3*h_win/4)))*0.1;
			 //console.log(posY);
			jQuery('#box_jurado .container').css({ backgroundPosition: "right "+posXj+"px" });
		  }
		  
		  //Animación flecha home
		  if(scrollAmount<40){
			jQuery('.flecha_scroll').stop().clearQueue().animate({ top: -40+(scrollAmount * speedE)}, 0).fadeIn(400);
		  }else{
			jQuery('.flecha_scroll').stop().clearQueue().animate({top:0},0).fadeOut(400);
		  }
    }
   jQuery('.marcador').html(scrollAmount+'px');
}

// autoplay video Youtube
function onPlayerReady(event) {
	if(device!='yes'){
        event.target.playVideo();
	}
}

// when video ends Youtube
function onPlayerStateChange(event) {        
   if(event.data === 0) {            
           //Cuando acaba el video
    }
}


//Función para el cambio de orientación
function doOnOrientationChange()
  {
    switch(window.orientation) 
    {  
      case -90:
      case 90:
       // alert('landscape');
        break; 
      default:
       // alert('portrait');
        break; 
    }
  }

//Animcación de imágenes de galería
/*function posterAnimation()
{
    posX += 1.5;
  	jQuery('.galeria_curiosidad').css({ backgroundPosition: -posX +"px 0px" });
}*/

  
//Función para alinear top los cuadros
function align_top_box(id){
		 
		//Listado cajas
		var heights = jQuery(id).map(function ()
		{
			return jQuery(this).outerHeight();
		}).get(),
		//Obtenemos tamaño max de los cuadros 
		maxHeight = Math.max.apply(null, heights);
		jQuery(id).css('height',maxHeight);	
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function meetsMinimumAge(birthDate, minAge) {
    var tempDate = new Date(birthDate.getFullYear() + minAge, birthDate.getMonth(), birthDate.getDate());
    return (tempDate <= new Date());
}

//Funcion para validar genéricamnete un formulario
function validate_form(id){
	
		//Busca todos los campos requeridos de texto
			if(jQuery(id).find('.validation-rule-empty').length > 0){
				var error_empty=0;
				jQuery(id).find('.validation-rule-empty').each(function() {
					var res_campo=jQuery(this).val();
					if(res_campo==""){
						error_empty=1;
						if(jQuery(this).is(":visible")){
							jQuery(this).addClass('error').val('');
						}
					}

				});
			}

			//Busca todos los campos requeridos de mail
			if(jQuery(id).find('.validation-rule-mail').length > 0){
				var error_mail=0;
				jQuery(id).find('.validation-rule-mail').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && validateEmail(res_campo)==false) ){
						error_mail=1;
						if(jQuery(this).is(":visible")){
							jQuery(this).addClass('error').val('');
						}
					}

				});
			}

			//Busca todos los campos requeridos de día
			if(jQuery(id).find('.validation-rule-day').length > 0){
				var error_day=0;
				jQuery(id).find('.validation-rule-day').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1) || (res_campo!="" && isNumber(res_campo)==true && res_campo>31) ){
						error_day=1;
						jQuery(this).addClass('error').val('');
					}

				});
			}
			
			//Busca todos los campos requeridos de mes
			if(jQuery(id).find('.validation-rule-month').length > 0){
				var error_month=0;
				jQuery(id).find('.validation-rule-month').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1) || (res_campo!="" && isNumber(res_campo)==true && res_campo>12)  ){
						error_month=1;
						jQuery(this).addClass('error').val('');
					}

				});
			}
			
			//Busca todos los campos requeridos de año
			if(jQuery(id).find('.validation-rule-year').length > 0){
				var error_year=0;
				jQuery(id).find('.validation-rule-year').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) || (res_campo!="" && isNumber(res_campo)==true && res_campo<1900) ){
						error_year=1;
						jQuery(this).addClass('error').val('');
					}

				});
			}
			
			//Busca todos los campos requeridos de codigo postal
			if(jQuery(id).find('.validation-rule-password').length > 0){
				var error_password=0;
				//Comprobamos que uno de los 2 no está vacío
				if(jQuery('.init_password').val()!="" && jQuery('.repeat_password').val()!=""){
					var txt_ini=jQuery('.init_password').val();
					var txt_rept=jQuery('.repeat_password').val();
					if(txt_ini!=txt_rept){
						error_password=1;
						jQuery('.init_password').addClass('error').val('');
						jQuery('.repeat_password').addClass('error').val('');
					}else{
						if(txt_ini.length < 6 || txt_ini.length > 12){
							error_password=1;
							jQuery('.init_password').addClass('error').val('');
							jQuery('.repeat_password').addClass('error').val('');
						}
					}	
				}else{
					error_password=1;
					jQuery('.init_password').addClass('error').val('');
					jQuery('.repeat_password').addClass('error').val('');
				}
			}

			//Busca todos los campos requeridos checkbox
			if(jQuery(id).find('.validation-rule-checkbox').length > 0){
				var error_checkbox=0;
				jQuery(id).find('.validation-rule-checkbox').each(function() {
					if(!jQuery(this).prop("checked")){
						error_checkbox=1;
						jQuery(this).addClass('error');
					}

				});
			}
			
			//Comprobar si la fecha introducida es mayor de 14años
			if( error_day==0 && error_month==0 && error_year==0){
				var error_big_14=0;
				var year=jQuery('.validation-rule-year').val();
				var month=(jQuery('.validation-rule-month').val()-1);
				var day=jQuery('.validation-rule-day').val();
				if (meetsMinimumAge(new Date(year, month, day),14)) {
					error_big_14=0;
					jQuery('.tutor_datos').hide();
				}else{
					error_big_14=1;
					//Mostramos el campo de tutor legal
					if(jQuery('.tutor_datos').is(":visible")){
						 jQuery('.tutor_datos').show();
					}else{
						var message='Menor de 14 años!! Debe rellenar los datos de tutor legal.';
						jQuery('.errores').append('<p>'+message+'</p>');	
						jQuery('.tutor_datos').show();
					}
				}
			}
			
			//Error general campos vacíos
			if(error_empty==1){
				var message=jQuery(id).attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(error_checkbox==1){
				var message=jQuery(id).find('.validation-rule-checkbox').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			//Errores en formato de fecha(day)
			if(error_day==1){
				var message=jQuery(id).find('.validation-rule-day').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			//Errores en formato de fecha(month)
			if(error_month==1){
				var message=jQuery(id).find('.validation-rule-month').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			//Errores en formato de fecha(year)
			if(error_year==1){
				var message=jQuery(id).find('.validation-rule-year').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			//Errores password
			if(error_password==1){
				var message=jQuery(id).find('.validation-rule-password').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			if(error_mail==1){
				var message=jQuery(id).find('.validation-rule-mail').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}	
			


			//Salida
			if(error_empty==1 || error_checkbox==1 ||error_mail || error_password==1 || error_day==1 || error_month==1 || error_year==1 || error_big_14==1){
				return 1;
			}else{
				return 0;
			}
}

function show_pic(id_pic){
		//Cambiar secciones según resolución
		var n_secc;
		if(w_win>1100){n_secc=5;}
		if(w_win<=1100 && w_win>768){n_secc=4;}
		if(w_win<=768 && w_win>640){n_secc=3;}
		if(w_win<=640){n_secc=2;}
		
		//Eliminamos el indicador de bloque activo 
		jQuery('.box_img_small').removeClass('active');
		jQuery('.box_img_small a').removeClass('active');
		
		//Recorremos todos los divs hasta obtener la posicion del div pulsado 
		var pos_div=1;
		var total_cuadros=jQuery('.row').find('.box_img_small').length;
		jQuery('.row').find('.box_img_small').each(function() {
			if(jQuery(this).find('a').attr('rel')==id_pic){
				jQuery(this).addClass('active');
				jQuery(this).find('a').addClass('active');
				return false;
			}else{
				pos_div++;
			}
		});
		
		var fila=parseInt(pos_div/n_secc);
		var mod_fila=pos_div%n_secc;
		var n_fila=parseInt(total_cuadros/n_secc);
		var mod_t_fila=total_cuadros%n_secc;
		//console.log(total_cuadros+'--'+fila+'--'+mod_fila+'--'+n_fila+'--'+pos_div);
		
		if ( jQuery(".detalle_pic").is(":visible") ) {	
			jQuery(".detalle_pic").stop().clearQueue().slideUp(600,'easeInOutExpo',function(){
				//Removemos el bloque anterior
				jQuery(".detalle_pic").remove();
				 
			    //Hacemos llamada de AJAX para obtener detalles del pic
				jQuery.ajax({
				  type: "GET",   
				  url: 'json/pic_info.json',   
				  data: {"id": id_pic},
				  async: false,
				  dataType: 'json',
				  success : function(data){ 
					//console.log(data);
					if(mod_fila==0){
						var pos_final_det=(fila*n_secc)-1;	
					}else{
						var pos_final_det=((fila+1)*n_secc)-1;
						if(n_fila==fila && total_cuadros<pos_final_det){pos_final_det=((fila*n_secc)+mod_t_fila)-1;}
					}
					// Pintamos detalles
					jQuery('<div class="detalle_pic"><div class="inside_detalle_pic"><div class="img_detalle_pic"><div class="img_big_detalle" style="background-image:url('+data.img+');"></div></div><div class="cont_detalle_pic"><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p><div class="bottom_detalle"><div class="votos_detalle"><span>'+data.votes+' Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar" rel="1">Votar</a><p class="btns_share">Compartir <a href="http://twitter.com/home?status='+data.title+' http://curiosipics.cambridge.es/pic/'+data.id+'" target="_blank" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="http://facebook.com/share.php?u=http://curiosipics.cambridge.es/pic/'+data.id+'&amp;t='+data.title+'" target="_blank" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="http://pinterest.com/pin/create/button/?url=http://curiosipics.cambridge.es/pic/'+data.id+'&media='+data.img+'&description='+data.title+'" target="_blank" data-pin-do="buttonBookmark" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div></div>').insertAfter( jQuery('.row').find('.box_img_small').eq(pos_final_det));
					//Comprobamos las flechas de navegación que hay que añadir 
					if(pos_div!=1 && pos_div!=total_cuadros){
						jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
					}else{
						if(pos_div==1){jQuery('<a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
						if(pos_div==total_cuadros){jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
					}
				  }
			  });
			  
				//Ajustamos alturas
				var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90;//-90 de padding:45px;
				jQuery(".detalle_pic").height(h_total);	
				jQuery(".img_detalle_pic").height(h_total);	
				jQuery(".cont_detalle_pic").height(h_total);
				jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
				//Desplegamos el cuadro de detalle
				jQuery(".detalle_pic").stop().clearQueue().slideDown(600,'easeInOutExpo',function(){
					//Alineamos el scroll al pie del detalle 
					var h_detalle=jQuery(".detalle_pic").outerHeight();
					var h_offset;
					if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}
					jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
				});
			});
			
		}else{
			//Hacemos llamada de AJAX para obtener detalles del pic
			//var data_var1='q='+ Math.random()+'&id='+id_pic;
			jQuery.ajax({
			  type: "GET",   
			  url: 'json/pic_info.json',   
			  data: {"id": id_pic},
			  async: false,
			  dataType: 'json',
			  success : function(data){ 
					//console.log(data);
					if(mod_fila==0){
						var pos_final_det=(fila*n_secc)-1;	
					}else{
						var pos_final_det=((fila+1)*n_secc)-1;
						if(n_fila==fila && total_cuadros<pos_final_det){pos_final_det=((fila*n_secc)+mod_t_fila)-1;}
					}
					// Pintamos detalles
					jQuery('<div class="detalle_pic"><div class="inside_detalle_pic"><div class="img_detalle_pic"><div class="img_big_detalle" style="background-image:url('+data.img+');"></div></div><div class="cont_detalle_pic"><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p><div class="bottom_detalle"><div class="votos_detalle"><span>'+data.votes+' Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar" rel="1">Votar</a><p class="btns_share">Compartir <a href="http://twitter.com/home?status='+data.title+' http://curiosipics.cambridge.es/pic/'+data.id+'" target="_blank" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="http://facebook.com/share.php?u=http://curiosipics.cambridge.es/pic/'+data.id+'&amp;t='+data.title+'" target="_blank" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="http://pinterest.com/pin/create/button/?url=http://curiosipics.cambridge.es/pic/'+data.id+'&media='+data.img+'&description='+data.title+'" target="_blank" data-pin-do="buttonBookmark" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div></div>').insertAfter( jQuery('.row').find('.box_img_small').eq(pos_final_det));
					//Comprobamos las flechas de navegación que hay que añadir 
					if(pos_div!=1 && pos_div!=total_cuadros){
						jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
					}else{
						if(pos_div==1){jQuery('<a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
						if(pos_div==total_cuadros){jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
					}
				  }
		  });
			//Ajustamos alturas
			var h_total=(parseInt(jQuery(".box_img_small").outerHeight())*2)-90;//-90 de padding:45px;
			jQuery(".detalle_pic").height(h_total);	
			jQuery(".img_detalle_pic").height(h_total);	
			jQuery(".cont_detalle_pic").height(h_total);
			jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
			//Desplegamos el cuadro de detalle
			jQuery(".detalle_pic").stop().clearQueue().slideDown(600,'easeInOutExpo',function(){
				//Alineamos el scroll al pie del detalle 
				var h_detalle=jQuery(".detalle_pic").outerHeight();
				var h_offset;
				if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}
				jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
			});
		}
}





