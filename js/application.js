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
var top_curiosidades,top_participar,top_premios,top_jurado,top_registro;
var send_form=0;
var h_win,w_win,w_win_init;
var id_pic_open;
var tutor_block;

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
	w_win_init=jQuery(window).width();

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
		//var hash = window.location.hash.substring(1);
		//if(hash!=""){
			//jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
		//}
	});/*j*/

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
			        jQuery("#counter-text").html('<span style="color:#f05456;">0 palabras restantes</span>');
					limited = jQuery.trim(text).split(" ", options.limit);
					limited = limited.join(" ");
					jQuery(this).val(limited);
			    } else {
			        jQuery("#counter-text").html((options.limit - wordcount)+' palabras restantes');
			    }
			});
		});
	};
	
	//Función para controlar la carga de las imagenes dinámicas
	jQuery.fn.imagesLoaded = function () {

    imgs = this.find('img[src!=""]');
    // if there's no images, just return an already resolved promise
    if (!imgs.length) {return jQuery.Deferred.resolve().promise();}

    // for each image, add a deferred object to the array which resolves when the image is loaded
    var dfds = [];  
    imgs.each(function(){

        var dfd = jQuery.Deferred();
        dfds.push(dfd);
        var img = new Image();
        img.onload = function(){dfd.resolve();}
        img.src = this.src;

    });

    // return a master promise object which will resolve when all the deferred objects have resolved
    // IE - when all the images are loaded
    return jQuery.when.apply(jQuery,dfds);

	}
	

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
	
	//Ajustamos para resoluciones superiores los pics
	if ( jQuery("#box_all_pics").is(":visible") ) {
		//Página de pics 
		if (jQuery(".pagination_pics").is(":visible") ) {
			 if(h_win>jQuery("#wrapper").outerHeight()){
				top_all_pics=jQuery('#all_pics').offset().top;
				var altura_t_all=h_win-jQuery("#wrapper").outerHeight();
				altura_t_all=altura_t_all+jQuery("#contenidos").outerHeight()-top_all_pics-jQuery(".pagination_pics").outerHeight();
				jQuery('#all_pics').css('min-height',altura_t_all);
				//jQuery('#all_pics').height(altura_t_all);
			 }
		}
	}else{
		if(h_win>jQuery("#wrapper").outerHeight()){
			//console.log(jQuery("#contenidos").outerHeight()+'--'+jQuery("#wrapper").outerHeight()+'--'+jQuery("#footer").outerHeight()+'--'+h_win);
			var altura_t_all=jQuery("#contenidos").outerHeight()+(h_win-jQuery("#wrapper").outerHeight());
			jQuery('#contenidos').css('min-height',altura_t_all);
		}
	}
	

	//Si detalle está desplegado calculamos altura de los bloques
	if ( jQuery(".detalle_pic").is(":visible") ) {
	   //Ajustamos cuadros dependiendo de resolución
		var h_detalle_opc;
		var n_block_h=2;
		if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
		if(w_win<426){
			h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
			jQuery(".detalle_pic").height('auto');
		}else{
			h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
			jQuery(".img_detalle_pic").height(h_detalle_opc-90);
			jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
			jQuery(".detalle_pic").height(h_detalle_opc);
		}
	}

	//Si está desplegado cuadro de voto confirmado
	if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {
		//Ajustamos cuadros dependiendo de resolución
		var h_detalle_opc;
		var n_block_h=2;
		if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
		if(w_win<426){
			//h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
			jQuery(".detalle_pic").height('auto');
		}else{
			h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
			jQuery(".img_detalle_pic_vote").height(h_detalle_opc-90);
			jQuery(".cont_detalle_pic_vote").height(h_detalle_opc-90);
		}
	}

	//Solo ejecutar si es visible la galería
	if ( jQuery("#galeria_sup").is(":visible") ) {
		//Slider columnas de la izquierda


		var json_url = jQuery("#galeria_sup").data('json');
		var all_img;
		var cont_img;
		//Hacemos llamada de AJAX para obtener detalles del pic
		jQuery.ajax({type: "GET",url:json_url,async: false,dataType: 'json',success : function(data){cont_img=data.length;all_img=data;}});
		//for(var i = 0; i < data.length; i++) {var obj = data[i];console.log(obj.img);}

		/*COLUMNA 1 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_1_1" );}
		jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
		slider_l_1_1=jQuery('.left_galeria .bxslider_l_1_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5000,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_1_2" );}
		jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
		slider_l_1_2=jQuery('.left_galeria .bxslider_l_1_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 3-1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_1_3_1" );}
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_1=jQuery('.left_galeria .bxslider_l_1_3_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4400,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 3-2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_1_3_2" );}
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_2=jQuery('.left_galeria .bxslider_l_1_3_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3500,speed:1200,touchEnabled:false});

		/*COLUMNA 2 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_2_1" );}
		jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
		slider_l_2_1=jQuery('.left_galeria .bxslider_l_2_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2800,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_2_2" );}
		jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
		slider_l_2_2=jQuery('.left_galeria .bxslider_l_2_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2300,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 3-1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_2_3" );}
		jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
		slider_l_2_3=jQuery('.left_galeria .bxslider_l_2_3').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3200,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 3-2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_l_2_4" );}
		jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
		slider_l_2_4=jQuery('.left_galeria .bxslider_l_2_4').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4200,speed:1200,touchEnabled:false});

		/*COLUMNA 1 DERECHA*/
		//Cuadro columna 1 bloque 1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_1_1" );}
		jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
		slider_r_1_1=jQuery('.right_galeria .bxslider_r_1_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4300,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_1_2" );}
		jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
		slider_r_1_2=jQuery('.right_galeria .bxslider_r_1_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2200,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 3-1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_1_3" );}
		jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
		slider_r_1_3=jQuery('.right_galeria .bxslider_r_1_3').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3600,speed:1200,touchEnabled:false});

		/*COLUMNA 2 DERECHA*/
		//Cuadro columna 2 bloque 1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_2_1" );}
		jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
		slider_r_2_1=jQuery('.right_galeria .bxslider_r_2_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5200,speed:1200,touchEnabled:false});
		//Cuadro columna 1 bloque 2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_2_2" );}
		jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
		slider_r_2_2=jQuery('.right_galeria .bxslider_r_2_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3700,speed:1200,touchEnabled:false});
		//Cuadro columna 2 bloque 3-1
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_2_3_1" );}
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_1=jQuery('.right_galeria .bxslider_r_2_3_1').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4250,speed:1200,touchEnabled:false});
		//Cuadro columna 2 bloque 3-2
		var n_img=randomIntFromInterval(2,10);
		for(var i=1;i< n_img+1;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_r_2_3_2" );}
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_2=jQuery('.right_galeria .bxslider_r_2_3_2').bxSlider({mode:'fade',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3150,speed:1200,touchEnabled:false});

		/*Últimos Pics*/
		/*for(var i=1;i< 11;i++) {var pos_img=Math.floor((Math.random()*cont_img)+1);var obj=all_img[pos_img-1];jQuery('<li><div class="box_slider_img" style="background:url('+obj.img+') center center no-repeat;"></div></li>').appendTo( ".bxslider_ultimos_pics" );}*/
		jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
		var n_slides=5;
		if(w_win<768){if(w_win<640){n_slides=2;}else{n_slides=3;}}else{n_slides=5;}
		slider_last_pics=jQuery('.bxslider_ultimos_pics').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:n_slides,maxSlides:n_slides,slideWidth:320,slideMargin:0,ticker:true,touchEnabled:false});

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
			if(result==1){
				e.preventDefault();
				send_form=0;
			}
		}
	});

	//Enviar formulario de votar pic
	jQuery(document).on("submit","#form-votar-pic", function(e) {
		e.preventDefault();

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

			//Acción si el mail es correcto o no
			if(result==1){
				send_form=0;
			}else{
				//Con el mail correcto se procede a votar
				var pic_id   = jQuery('.detalle_pic').data('id');
				var url_vote = jQuery('.wall_pics').attr('data-pic-vote-url').replace('{id}', pic_id);
				//Enviamos el voto vía AJAX
				jQuery.ajax({
					  type: "POST",
					  url: url_vote,
					  async: false,
					  data: {"email": res_campo},
					  dataType: 'json',
					  success : function(data){
								console.log(data);
								if(data.errorCode==0){
									//Si se ha añadido correctamente actualizamos
									jQuery('.cont_detalle_pic .votos_detalle span').text(data.votos+' Votos');
									//Cerramos el modal de Voto
									jQuery('.box_pop_votar').fadeOut(600,function(){
										jQuery('#form-votar-pic input[type=email]').val("").removeClass('error');
										alert(data.message);
									});
								}else{
									//Cerramos el modal de voto
									jQuery('.box_pop_votar').fadeOut(600,function(){
										jQuery('#form-votar-pic input[type=email]').val("").removeClass('error');
										alert(data.message);
									});
								}
								send_form=0;
					  }
				});

			}

		}
	});

	//Enviar formulario de registro
	jQuery(document).on("submit","#form-upload-pic", function(e) {
		if(send_form==0){
			send_form=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores").html("");
			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#form-upload-pic');
			if(result==1){
				//Comprobamos si hay error en img
				if(jQuery('#imagefile').hasClass('error')){jQuery('#preview_box').addClass('error');}
				e.preventDefault();
				send_form=0;
			}
		}
	});

	//Eliminar marco de error cuando se hace click sobre un input con error
	jQuery(document).on('focus','form input,form textarea,form input[type=checkbox],form input[type=radio]',function(event){
		event.preventDefault();
		if(jQuery(this).attr('type')!='submit'){
			if(jQuery(this).attr('type')=='radio'){
				if(jQuery('form input[type=radio]').hasClass('error')){
					jQuery('form input[type=radio]').removeClass('error');
				}	
			}else{
				if(jQuery(this).hasClass('error')){
					jQuery(this).removeClass('error');
				}
			}
		}
	});

	//Desplegar la info de un pic en concreto
	jQuery(document).on("click",".box_img_small", function(e) {
		e.preventDefault();
		var id_pic=jQuery(this).find('a').attr('rel');
		id_pic_open=id_pic;
		if(jQuery(this).hasClass('ganador')){
			//Pic ganadores
			var padre_cont=jQuery(this).parents('.row').attr('id');
			show_pic(id_pic,padre_cont);
		}else{
			//Pics de all_pics
			show_pic(id_pic,'all_pics');
		}
	});

	//Mouse-over pics solo en escritorio
	if(device=='none'){
		jQuery(document).on("mouseenter",".box_img_small a", function(e) {
			jQuery( this ).parent().addClass('overjs');
		}).on("mouseleave",".box_img_small a", function(e) {
			jQuery( this ).parent().removeClass('overjs');
		});
	}


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
			id_pic_open=id_next;
			if(jQuery(this).hasClass('ganador')){
				//Pic ganadores
				var padre_cont=jQuery(this).parents('.row').attr('id');
				show_pic(id_next,padre_cont);
			}else{
				//Pics de all_pics
				show_pic(id_next,'all_pics');
			}
			//show_pic(id_next);
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
			id_pic_open=id_prev;
			if(jQuery(this).hasClass('ganador')){
				//Pic ganadores
				var padre_cont=jQuery(this).parents('.row').attr('id');
				show_pic(id_prev,padre_cont);
			}else{
				//Pics de all_pics
				show_pic(id_prev,'all_pics');
			}
			//show_pic(id_prev);
		});
	});

	//Cerrar cuadro info cookies
	jQuery(document).on('click','.close_c',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(600);
	});

	//Abrir menú mobile
	jQuery(document).on('click','.right_top_header.mobile_opc .mobile-menu-icon',function(e){
		e.preventDefault();
		if(jQuery(this).parents('.mobile_opc').hasClass('active')){
			jQuery('.extend_menu_mob').slideUp(600,function(){
				jQuery('.right_top_header.mobile_opc').removeClass('active');
				//Limpiamos los campos
				jQuery('.box_login_mob').show();
				jQuery('.box_forget_mob').hide();
			});
		}else{
			jQuery('.right_top_header.mobile_opc').addClass('active');
			//jQuery(".right_top_header.mobile_opc").animate({backgroundColor:"rgba(255,255,255,1)"},600,function(){
				jQuery('.extend_menu_mob').slideDown(600);
			//});
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

	//Mostrar formulario de resetar password (mobile)
	jQuery(document).on('click','.reset_password_mob',function(e){
		e.preventDefault();
		jQuery('.box_login_mob').fadeOut(600,function(){
			jQuery('.box_forget_mob').fadeIn(600);
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

		var parent     = jQuery(this).closest('.detalle_pic');
		var pic_id     = parent.data('id');
		var url_vote   = jQuery('.wall_pics').attr('data-pic-vote-url').replace('{id}', pic_id);

		//Miramos si el usuarios está registrado
		var user_loged = jQuery('.wall_pics').attr('data-user-logged');

		//console.log(user_loged+'--'+url_vote);
		if(user_loged=='true'){
		 	//Enviamos el voto vía AJAX
			jQuery.ajax({
				  type: "POST",
				  url: url_vote,
				  async: false,
				  dataType: 'json',
				  success : function(data){
					  		console.log(data);
				  			if(data.errorCode==0){
								//Si se ha añadido correctamente actualizamos
								jQuery('.cont_detalle_pic .votos_detalle span').text(data.votos+' Votos');
								alert(data.message);
							}else{
								//Si se ha producido un error
								alert(data.message);
							}
				  }
			});

		}else{
			//Mostramos el modal
			jQuery('.box_pop_votar').fadeIn(600,function(){});
		}

	});


	jQuery(document).on('click','.btns_share a',function(e){

		var parent  = jQuery(this).closest('.detalle_pic'),
			pic_id  = parent.data('id'),
			pic_url = jQuery(".wall_pics").data("pic-url").replace('{id}', pic_id),
			pic_tit = jQuery('.cont_detalle_pic h5', parent).text(),
			pic_src = jQuery('.img_detalle_pic img', parent).attr('src'),
			share_url;

		if( this.className.indexOf("twitter") > -1 ){
			share_url = "http://twitter.com/home?status=" + encodeURIComponent(pic_tit + ' ' + pic_url);
		}else if( this.className.indexOf("facebook") > -1 ){
			share_url = "http://facebook.com/share.php?u=" + encodeURIComponent(pic_url) + '&t=' + encodeURIComponent(pic_tit);
		}else if( this.className.indexOf("pinterest") > -1 ){
			share_url = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(pic_url) + '&media=' + encodeURIComponent(pic_src) + '&description=' + encodeURIComponent(pic_tit);
		}

		jQuery(this).attr({'href':share_url, 'target':'_blank'});
	});


	//Cerrar modal votar pic
	jQuery(document).on('click','.close_votar,.bg_pop_votar',function(e){
		e.preventDefault();
		jQuery('.box_pop_votar').fadeOut(600,function(){
			jQuery('#form-votar-pic input[type=email]').val("").removeClass('error');
		});

	});

	//Comprobación del login/forgot-password vía AJAX
	jQuery('#form-login,#form-forgot-password,#form-login-mob,#form-forgot-password-mob').on('submit', function(e){
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
	
	//Evitar que se complete datos de menor con radio profesor 
	jQuery(document).on('change','form input[type=radio]', function(e) {
		e.preventDefault();
		var value_radio=jQuery('input[name=user_type]:checked').val();
		//Profesor
		console.log(value_radio);
		if(value_radio==2){
			//Miramos si ya se ha desplegado form menor
			if(jQuery('.tutor_datos').is(":visible")){
				jQuery('.tutor_datos').hide("slow",function(){
					jQuery('#tutor_name').val("");	
					jQuery('#tutor_email').val("");	
					jQuery('#tutor_id').val("");			
				});
			}
		}else{
			if(tutor_block==1){
				jQuery('.tutor_datos').show("slow",function(){
					jQuery('body').stop().clearQueue().scrollTo(jQuery('.tutor_datos'),600,{axis:'y',easing:'easeInOutExpo',offset:-20});
				});
			}
		}
	});

	//Cambios en en los campos fecha para mostrar tutor
	jQuery(document).on('change','#birth_day,#birth_month,#birth_year', function() {
			//Obtenemos variable de radio
			var value_radio=jQuery('form input[name=user_type]:checked').val();
		
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
				var year=jQuery('.validation-rule-year').val();
				var month=(jQuery('.validation-rule-month').val()-1);
				var day=jQuery('.validation-rule-day').val();
				if (meetsMinimumAge(new Date(year, month, day),14)) {
					jQuery('.tutor_datos').hide();
					tutor_block=0;
				}else{
					//Mostramos el campo de tutor legal
					tutor_block=1;
					if(jQuery('.tutor_datos').is(":visible")){
						if(value_radio!=2){
						 	jQuery('.tutor_datos').show("slow",function(){
								jQuery('body').stop().clearQueue().scrollTo(jQuery('.tutor_datos'),600,{axis:'y',easing:'easeInOutExpo',offset:-20});
							});
						}
					}else{
						//var message='Menor de 14 años!! Debe rellenar los datos de tutor legal.';
						//jQuery('.errores').append('<p>'+message+'</p>');
						if(value_radio!=2){
							jQuery('.tutor_datos').show("slow",function(){
								jQuery('body').stop().clearQueue().scrollTo(jQuery('.tutor_datos'),600,{axis:'y',easing:'easeInOutExpo',offset:-20});
							});
						}
					}
				}
			}
	});
	
	//Enviar formulario de registro
	jQuery(document).on("click",".box_consejo a.top_enl", function(e) {
		e.preventDefault();
		jQuery(this).parents('.box_consejo').find('.desplegable_consejo').stop().clearQueue().slideToggle(600,'easeInOutExpo');
	});


	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {

		if(jQuery(this).width() != w_win_init && device=='none'){
			
			//console.log('aqui');

			//Obtenemos altura y anchura del navegador
			var h_win_r=jQuery(this).height();
			var w_win_r=jQuery(this).width();
			w_win=jQuery(this).width();

			if(w_win_r>815){
				jQuery(".extend_menu_mob").css({display:'none'});
				jQuery(".right_top_header.mobile_opc").removeClass('active');
			}


			//Si estamos haciendo resize en home reiniciar scroll o
			if ( jQuery("#galeria_sup").is(":visible") ) {

				jQuery('body').scrollTo("0px",0);

				jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
				jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
				jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
				jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
				jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
				jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
				jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
				jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height())

				//Resize ticker de home (Falta nº de cuadros según resolución)
				jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
				var n_slides=5;
				if(w_win_r<768){if(w_win_r<640){n_slides=2;}else{n_slides=3;}}else{n_slides=5;}
				slider_last_pics.reloadSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:n_slides,maxSlides:n_slides,slideWidth:320,slideMargin:0,ticker:true,touchEnabled:false});
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
			
			//Ajustamos altura para resoluciones superiores
			if ( jQuery("#box_all_pics").is(":visible") ) {
				//Página de pics 
				if (jQuery(".pagination_pics").is(":visible") ) {
					 if(h_win>jQuery("#wrapper").outerHeight()){
						top_all_pics=jQuery('#all_pics').offset().top;
						var altura_t_all=h_win-jQuery("#wrapper").outerHeight();
						altura_t_all=altura_t_all+jQuery("#contenidos").outerHeight()-top_all_pics-jQuery(".pagination_pics").outerHeight();
						jQuery('#all_pics').css('min-height',altura_t_all);
						//jQuery('#all_pics').height(altura_t_all);
					 }
				}
			}else{
				if(h_win>jQuery("#wrapper").outerHeight()){
					//console.log(jQuery("#contenidos").outerHeight()+'--'+jQuery("#wrapper").outerHeight()+'--'+jQuery("#footer").outerHeight()+'--'+h_win);
					var altura_t_all=jQuery("#contenidos").outerHeight()+(h_win-jQuery("#wrapper").outerHeight());
					jQuery('#contenidos').css('min-height',altura_t_all);
				}
			}

			//Si detalle está desplegado calculamos altura de los bloques
			if ( jQuery(".detalle_pic").is(":visible") ) {
				//Si es detalle de RSS
				if ( jQuery(".detalle_pic").hasClass('pic_rrss')){
					
					//Ajustamos cuadros dependiendo de resolución
					var h_detalle_opc;
					var n_block_h=2;
					if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
					if(w_win<426){
						h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
						jQuery(".detalle_pic").height('auto');
					}else{
						h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
						jQuery(".img_detalle_pic").height(h_detalle_opc-90);
						jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
						jQuery(".detalle_pic").height(h_detalle_opc);
					}
				}else{
					//Desplegable Detalle abierto {Ganadores|All pics}
					jQuery(".detalle_pic").stop().clearQueue().remove();
					if(jQuery(".pics_ganadores").is(":visible") ) {
						//Pic ganadores
						var padre_cont=jQuery('.box_img_small.active').parents('.row').attr('id');
						show_pic(id_pic_open,padre_cont);
					}else{
						//Pics de all_pics
						show_pic(id_pic_open,'all_pics');
					}
					//jQuery(".detalle_pic").stop().clearQueue().remove();
					//show_pic(id_pic_open,'all_pics');
				}
			}

			//Si está desplegado cuadro de voto confirmado
			if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {
				//Ajustamos cuadros dependiendo de resolución
				var h_detalle_opc;
				var n_block_h=2;
				if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
									
				if(w_win<426){
					//h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
					jQuery(".detalle_pic").height('auto');
				}else{
					h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
					jQuery(".img_detalle_pic_vote").height(h_detalle_opc-90);
					jQuery(".cont_detalle_pic_vote").height(h_detalle_opc-90);
				}
			}

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

  //Obtenemos altura y anchura del navegador
  h_win=jQuery(window).height();
  w_win=jQuery(window).width();

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

	//Para los enlaces de la home
	//Solo ejecutar si es visible la galería (HOME)
  if ( jQuery("#galeria_sup").is(":visible")){
	  	 top_curiosidades=jQuery('#box_curiosidad').offset().top;
		 top_participar=jQuery('#box_participar').offset().top;
		 top_premios=jQuery('#box_premios').offset().top;
		 top_jurado=jQuery('#box_jurado').offset().top;

		//Añadir clases a los enlaces del menú según scroll
		if(scrollAmount<(top_curiosidades)){jQuery("#top_header").removeClass();}
		if(scrollAmount>(top_curiosidades) && scrollAmount<(top_participar)){jQuery("#top_header").removeClass().addClass('block1');}
		if(scrollAmount>(top_participar) && scrollAmount<(top_premios)){jQuery("#top_header").removeClass().addClass('block2');}
		if(scrollAmount>(top_premios) && scrollAmount<(top_jurado)){jQuery("#top_header").removeClass().addClass('block3');}
		if(scrollAmount>(top_jurado)){jQuery("#top_header").removeClass().addClass('block4');}
  }

  //Solo ejecutar si es visible la galería (HOME)
  if ( jQuery("#galeria_sup").is(":visible") && device=='none' && w_win>1100) {

	   	  top_curiosidades=jQuery('#box_curiosidad').offset().top;
		  top_participar=jQuery('#box_participar').offset().top;
		  top_premios=jQuery('#box_premios').offset().top;
		  top_jurado=jQuery('#box_jurado').offset().top;

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
			jQuery('#box_premios .container').css({ backgroundPosition: posX+"px top" });
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

	//Animación cuadro de registro lateral
	if ( jQuery("#registro-form").is(":visible")){
		top_registro=jQuery('#registro-form').offset().top;
		var center_tope=jQuery('#center_name').offset().top;
		if(scrollAmount>top_registro){
			if(scrollAmount<center_tope){
				jQuery('.mov_box_bg_txt').stop().clearQueue().animate({ top: 50+((scrollAmount-top_registro)*speedE)}, 0);
			}
		}else{
			jQuery('.mov_box_bg_txt').stop().clearQueue().animate({top:50});
		}
	}

   jQuery('.marcador').html(scrollAmount+'px');
}


//Función para el cambio de orientación
function doOnOrientationChange()
  {
    switch(window.orientation)
    {
      case -90:
      case 90:
       
	   		//Obtenemos altura y anchura del navegador
			var h_win_r=jQuery(this).height();
			var w_win_r=jQuery(this).width();
			w_win=jQuery(this).width();

			if(w_win_r>815){
				jQuery(".extend_menu_mob").css({display:'none'});
				jQuery(".right_top_header.mobile_opc").removeClass('active');
			}


			//Si estamos haciendo resize en home reiniciar scroll o
			if ( jQuery("#galeria_sup").is(":visible") ) {

				jQuery('body').scrollTo("0px",0);

				jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
				jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
				jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
				jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
				jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
				jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
				jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
				jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height())

				//Resize ticker de home (Falta nº de cuadros según resolución)
				jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
				var n_slides=5;
				if(w_win_r<768){if(w_win_r<640){n_slides=2;}else{n_slides=3;}}else{n_slides=5;}
				slider_last_pics.reloadSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:n_slides,maxSlides:n_slides,slideWidth:320,slideMargin:0,ticker:true,touchEnabled:false});
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
			
			//Ajustamos para resoluciones superiores los pics
			if ( jQuery("#box_all_pics").is(":visible") ) {
				//Página de pics 
				if (jQuery(".pagination_pics").is(":visible") ) {
					 if(h_win>jQuery("#wrapper").outerHeight()){
						top_all_pics=jQuery('#all_pics').offset().top;
						var altura_t_all=h_win-jQuery("#wrapper").outerHeight();
						altura_t_all=altura_t_all+jQuery("#contenidos").outerHeight()-top_all_pics-jQuery(".pagination_pics").outerHeight();
						jQuery('#all_pics').css('min-height',altura_t_all);
						//jQuery('#all_pics').height(altura_t_all);
					 }
				}
			}else{
				if(h_win>jQuery("#wrapper").outerHeight()){
					//console.log(jQuery("#contenidos").outerHeight()+'--'+jQuery("#wrapper").outerHeight()+'--'+jQuery("#footer").outerHeight()+'--'+h_win);
					var altura_t_all=jQuery("#contenidos").outerHeight()+(h_win-jQuery("#wrapper").outerHeight());
					jQuery('#contenidos').css('min-height',altura_t_all);
				}
			}

			//Si detalle está desplegado calculamos altura de los bloques
			if ( jQuery(".detalle_pic").is(":visible") ) {
				//Si es detalle de RSS
				if ( jQuery(".detalle_pic").hasClass('pic_rrss')){
					
					//Ajustamos cuadros dependiendo de resolución
					var h_detalle_opc;
					var n_block_h=2;
					if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
					if(w_win<426){
						h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
						jQuery(".detalle_pic").height('auto');
					}else{
						h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
						jQuery(".img_detalle_pic").height(h_detalle_opc-90);
						jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
						jQuery(".detalle_pic").height(h_detalle_opc);
					}
				}else{
					jQuery(".detalle_pic").stop().clearQueue().remove();
					show_pic(id_pic_open,'all_pics');
				}
			}

			//Si está desplegado cuadro de voto confirmado
			if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {
				//Ajustamos cuadros dependiendo de resolución
				var h_detalle_opc;
				var n_block_h=2;
				if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
									
				if(w_win<426){
					//h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
					jQuery(".detalle_pic").height('auto');
				}else{
					h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
					jQuery(".img_detalle_pic_vote").height(h_detalle_opc-90);
					jQuery(".cont_detalle_pic_vote").height(h_detalle_opc-90);
				}
			}
	   
        break;
      default:
       
	   		//Obtenemos altura y anchura del navegador
			var h_win_r=jQuery(this).height();
			var w_win_r=jQuery(this).width();
			w_win=jQuery(this).width();

			if(w_win_r>815){
				jQuery(".extend_menu_mob").css({display:'none'});
				jQuery(".right_top_header.mobile_opc").removeClass('active');
			}


			//Si estamos haciendo resize en home reiniciar scroll o
			if ( jQuery("#galeria_sup").is(":visible") ) {

				jQuery('body').scrollTo("0px",0);

				jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
				jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
				jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
				jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
				jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
				jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
				jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
				jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
				jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
				jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height())

				//Resize ticker de home (Falta nº de cuadros según resolución)
				jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
				var n_slides=5;
				if(w_win_r<768){if(w_win_r<640){n_slides=2;}else{n_slides=3;}}else{n_slides=5;}
				slider_last_pics.reloadSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:n_slides,maxSlides:n_slides,slideWidth:320,slideMargin:0,ticker:true,touchEnabled:false});
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
			
			//Ajustamos para resoluciones superiores los pics
			if ( jQuery("#box_all_pics").is(":visible") ) {
				//Página de pics 
				if (jQuery(".pagination_pics").is(":visible") ) {
					 if(h_win>jQuery("#wrapper").outerHeight()){
						top_all_pics=jQuery('#all_pics').offset().top;
						var altura_t_all=h_win-jQuery("#wrapper").outerHeight();
						altura_t_all=altura_t_all+jQuery("#contenidos").outerHeight()-top_all_pics-jQuery(".pagination_pics").outerHeight();
						jQuery('#all_pics').css('min-height',altura_t_all);
						//jQuery('#all_pics').height(altura_t_all);
					 }
				}
			}else{
				if(h_win>jQuery("#wrapper").outerHeight()){
					//console.log(jQuery("#contenidos").outerHeight()+'--'+jQuery("#wrapper").outerHeight()+'--'+jQuery("#footer").outerHeight()+'--'+h_win);
					var altura_t_all=jQuery("#contenidos").outerHeight()+(h_win-jQuery("#wrapper").outerHeight());
					jQuery('#contenidos').css('min-height',altura_t_all);
				}
			}

			//Si detalle está desplegado calculamos altura de los bloques
			if ( jQuery(".detalle_pic").is(":visible") ) {
				//Si es detalle de RSS
				if ( jQuery(".detalle_pic").hasClass('pic_rrss')){
					
					//Ajustamos cuadros dependiendo de resolución
					var h_detalle_opc;
					var n_block_h=2;
					if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
					if(w_win<426){
						h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
						jQuery(".detalle_pic").height('auto');
					}else{
						h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
						jQuery(".img_detalle_pic").height(h_detalle_opc-90);
						jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
						jQuery(".detalle_pic").height(h_detalle_opc);
					}
				}else{
					jQuery(".detalle_pic").stop().clearQueue().remove();
					show_pic(id_pic_open,'all_pics');
				}
			}

			//Si está desplegado cuadro de voto confirmado
			if ( jQuery(".inside_detalle_pic_vote").is(":visible") ) {
				//Ajustamos cuadros dependiendo de resolución
				var h_detalle_opc;
				var n_block_h=2;
				if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
									
				if(w_win<426){
					//h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
					jQuery(".detalle_pic").height('auto');
				}else{
					h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90-jQuery(".header_vote").outerHeight();//-90 de padding:45px;
					jQuery(".img_detalle_pic_vote").height(h_detalle_opc-90);
					jQuery(".cont_detalle_pic_vote").height(h_detalle_opc-90);
				}
			}
	   
        break;
    }
  }

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

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Funcion para validar genéricamnete un formulario
function validate_form(id){

		//Busca todos los campos requeridos de texto
			if(jQuery(id).find('.validation-rule-empty').length > 0){
				var error_empty=0;
				jQuery(id).find('.validation-rule-empty').each(function() {
					if(jQuery(this).is(":visible")){
					var res_campo=jQuery(this).val();
						if(res_campo==""){
							error_empty=1;
								jQuery(this).addClass('error').val('');
						}
					}

				});
			}

			//Busca todos los campos requeridos de mail
			if(jQuery(id).find('.validation-rule-mail').length > 0){
				var error_mail=0;
				jQuery(id).find('.validation-rule-mail').each(function() {
					if(jQuery(this).is(":visible")){
						var res_campo=jQuery(this).val();
						if((res_campo=="") || (res_campo!="" && validateEmail(res_campo)==false) ){
							error_mail=1;
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
						if(txt_ini.length < 8){
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
			
			//Busca todos los campos requeridos radio
			if(jQuery(id).find('.validation-rule-radio').length > 0){
				var error_radio=0;
				var value_radio=jQuery(id).find('input[name=user_type]:checked').val();
				if (typeof value_radio == 'undefined') {
					error_radio=1;
					jQuery(id).find('input[name=user_type]').addClass('error');
				}
				//console.log(error_radio);
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
			
			if(error_radio==1){
				var message=jQuery(id).find('.validation-rule-radio').attr('data-error-msg');
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
			if(error_empty==1 || error_checkbox==1 ||error_mail || error_password==1 || error_day==1 || error_month==1 || error_year==1 || error_radio==1 /*|| error_big_14==1*/){
				return 1;
			}else{
				return 0;
			}
}

function show_pic(id_pic,seccion){
		//Cambiar secciones según resolución
		var n_secc;
		var pos_winner, descrip_winner;
		if(w_win>1100){n_secc=5;}
		if(w_win<=1100 && w_win>768){n_secc=4;}
		if(w_win<=768 && w_win>480){n_secc=3;}
		if(w_win<=480){n_secc=2;}

		//Eliminamos el indicador de bloque activo
		jQuery('.box_img_small').removeClass('active');
		jQuery('.box_img_small a').removeClass('active');
		

		//Recorremos todos los divs hasta obtener la posicion del div pulsado
		var seccion_afectada;
		if(seccion=='all_pics'){
			seccion_afectada='.row';	
		}else{
			seccion_afectada='#'+seccion;
		}
		
		var pos_div=1;
		var total_cuadros=jQuery(seccion_afectada).find('.box_img_small').length;
		jQuery(seccion_afectada).find('.box_img_small').each(function() {
			if(jQuery(this).find('a').attr('rel')==id_pic){
				jQuery(this).addClass('active');
				jQuery(this).find('a').addClass('active');
				if(jQuery(this).hasClass('ganador')){
					pos_winner=jQuery(this).find('a').attr('data-posicion');
					descrip_winner=jQuery(this).find('a').attr('data-info');
				}
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

		//Completamos las urls de visualización y voto de un pic
		var picUrl     = jQuery(".wall_pics").data("pic-url").replace('{id}', id_pic);
		//var picVoteUrl = jQuery(".wall_pics").data("pic-vote-url").replace('{id}', id_pic);

		if ( jQuery(".detalle_pic").is(":visible") ) {
			jQuery(".detalle_pic").stop().clearQueue().animate({height:0},600,'easeInOutExpo',function(){
				//Removemos el bloque anterior
				jQuery(".detalle_pic").remove();

			    //Hacemos llamada de AJAX para obtener detalles del pic
				jQuery.ajax({
				  type: "GET",
				  url: picUrl,
				  async: false,
				  dataType: 'json',
				  success : function(data){
					//console.log(data);
					if(mod_fila==0){
						var pos_final_det=(fila*n_secc)-1;
					}else{
						var pos_final_det=((fila+1)*n_secc)-1;
						if(n_fila==fila /*&& total_cuadros<pos_final_det*/){pos_final_det=((fila*n_secc)+mod_t_fila)-1;}
					}
					// Pintamos detalles
					if(seccion=='all_pics'){
						var salida='<div class="detalle_pic" data-id="'+id_pic+'"><div class="inside_detalle_pic"><div class="img_detalle_pic"><span class="helper"></span><img src="'+data.img+'" /></div><div class="cont_detalle_pic"><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p><div class="bottom_detalle"><div class="votos_detalle"><span>'+data.votes+' Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar">Votar</a><p class="btns_share"><span>Compartir</span> <a href="#" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="#" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="#" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div></div>';	
					}else{
						//Obtenemos el texto de ese ganador
						var salida='<div class="detalle_pic" data-id="'+id_pic+'"><div class="inside_detalle_pic"><div class="img_detalle_pic"><span class="helper"></span><img src="'+data.img+'" /></div><div class="cont_detalle_pic"><div><h3 class="tipo_winner sello_'+pos_winner+'">'+descrip_winner+'</h3></div><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p></div></div></div>';	
					}
					
						jQuery(salida).insertAfter( jQuery(seccion_afectada).find('.box_img_small').eq(pos_final_det));
							
							//No mostramos el contenidos hasta que la imagen está cargada	
						imagesLoaded( jQuery('.detalle_pic'),function( instance ) {
							
							//Solo flecha para pics
							if(seccion=='all_pics'){
								//Comprobamos las flechas de navegación que hay que añadir
								if(pos_div!=1 && pos_div!=total_cuadros){
									jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
								}else{
									if(pos_div==1){jQuery('<a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
									if(pos_div==total_cuadros){jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
								}
							}else{
								jQuery('<a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
							}
							
							//Ajustamos cuadros dependiendo de resolución
							var h_detalle_opc;
							var n_block_h=2;
							if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
							if(w_win<426){
								h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
								jQuery(".detalle_pic").stop().clearQueue().css({'height':'auto',display:'none'}).slideDown(600,'easeInOutExpo',function(){
									//Alineamos el scroll al pie del detalle
									var h_detalle=jQuery(".detalle_pic").outerHeight();
									var h_offset;
									if(w_win<641){h_offset=0;}else{if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}}
									jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
								});
							}else{
								h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
								jQuery(".img_detalle_pic").height(h_detalle_opc-90);
								jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
								jQuery(".detalle_pic").stop().clearQueue().animate({height:h_detalle_opc},600,'easeInOutExpo',function(){
									//Alineamos el scroll al pie del detalle
									var h_detalle=jQuery(".detalle_pic").outerHeight();
									var h_offset;
									if(w_win<641){h_offset=0;}else{if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}}
									jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
								});	
							}
							
						});
				  }
			  });
			});

		}else{
			//Hacemos llamada de AJAX para obtener detalles del pic
			//var data_var1='q='+ Math.random()+'&id='+id_pic;
			jQuery.ajax({
			  type: "GET",
			  url: picUrl,
			  async: false,
			  dataType: 'json',
			  success : function(data){
						//console.log(data);
						/*
						var fila=parseInt(pos_div/n_secc);
		var mod_fila=pos_div%n_secc;
		var n_fila=parseInt(total_cuadros/n_secc);
		var mod_t_fila=total_cuadros%n_secc;
		console.log(total_cuadros+'--'+fila+'--'+mod_fila+'--'+n_fila+'--'+pos_div);
						*/
						
						if(mod_fila==0){
							var pos_final_det=(fila*n_secc)-1;
						}else{
							var pos_final_det=((fila+1)*n_secc)-1;
							if(n_fila==fila /*&& total_cuadros<=pos_final_det*/){pos_final_det=((fila*n_secc)+mod_t_fila)-1;}
						}
						
						// Pintamos detalles
						if(seccion=='all_pics'){
							var salida='<div class="detalle_pic" data-id="'+id_pic+'"><div class="inside_detalle_pic"><div class="img_detalle_pic"><span class="helper"></span><img src="'+data.img+'" /></div><div class="cont_detalle_pic"><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p><div class="bottom_detalle"><div class="votos_detalle"><span>'+data.votes+' Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar">Votar</a><p class="btns_share"><span>Compartir</span> <a href="#" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="#" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="#" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div></div>';	
						}else{
							//Obtenemos el texto de ese ganador
							var salida='<div class="detalle_pic" data-id="'+id_pic+'"><div class="inside_detalle_pic"><div class="img_detalle_pic"><span class="helper"></span><img src="'+data.img+'" /></div><div class="cont_detalle_pic"><div><h3 class="tipo_winner sello_'+pos_winner+'">'+descrip_winner+'</h3></div><h4>'+data.author_type+'</h4><p class="nombre_persona">'+data.author_name+'</p><h5>'+data.title+'</h5><p class="descrip_pic">'+data.description+'</p></div></div></div>';	
						}
						
						jQuery(salida).insertAfter( jQuery(seccion_afectada).find('.box_img_small').eq(pos_final_det));
						
						//No mostramos el contenidos hasta que la imagen está cargada	
						imagesLoaded( jQuery('.detalle_pic'),function( instance ) {
							//Solo flecha para pics
							if(seccion=='all_pics'){
								//Comprobamos las flechas de navegación que hay que añadir
								if(pos_div!=1 && pos_div!=total_cuadros){
									jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
								}else{
									if(pos_div==1){jQuery('<a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
									if(pos_div==total_cuadros){jQuery('<a href="#" class="prev_pic">Anterior</a><a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');}
								}
							}else{
								jQuery('<a href="#" class="close_pic">Cerrar</a>').insertAfter('.inside_detalle_pic');
							}
							
							//Ajustamos cuadros dependiendo de resolución
							var h_detalle_opc;
							var n_block_h=2;
							if(w_win<816){if(w_win<641){n_block_h=4;}else{n_block_h=3;}}else{n_block_h=2}
							
							if(w_win<426){
								h_detalle_opc=parseInt(jQuery(".img_detalle_pic").outerHeight())+parseInt(jQuery(".cont_detalle_pic").outerHeight())+90;
								jQuery(".detalle_pic").stop().clearQueue().css({'height':'auto',display:'none'}).slideDown(600,'easeInOutExpo',function(){
									//Alineamos el scroll al pie del detalle
									var h_detalle=jQuery(".detalle_pic").outerHeight();
									var h_offset;
									if(w_win<641){h_offset=0;}else{if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}}
									jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
								});
							}else{
								h_detalle_opc=(parseInt(jQuery(".box_img_small").outerHeight())*n_block_h)+90;//-90 de padding:45px;
								jQuery(".img_detalle_pic").height(h_detalle_opc-90);
								jQuery(".cont_detalle_pic").height(h_detalle_opc-90);
								jQuery(".detalle_pic").stop().clearQueue().animate({height:h_detalle_opc},600,'easeInOutExpo',function(){
									//Alineamos el scroll al pie del detalle
									var h_detalle=jQuery(".detalle_pic").outerHeight();
									var h_offset;
									if(w_win<641){h_offset=0;}else{if(h_win>h_detalle){h_offset=-(h_win-h_detalle);}else{h_offset=h_detalle-h_win;}}
									jQuery('body').stop().clearQueue().scrollTo(jQuery('.detalle_pic'),600,{axis:'y',easing:'easeInOutExpo',offset:h_offset});
								});	
							}
							
						});
							
				  }
		  });
		  	
		}
}




