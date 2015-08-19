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
var slider_r_1_1,slider_r_1_2,slider_r_1_3,slider_r_2_1,slider_l_2_2,slider_r_2_3_1,slider_r_2_3_2,slider_last_pics;
var speedA, speedB, speedC, speedD, speedE;
var posX,intervalo,posY;
var top_curiosidades,top_participar,top_premios,top_jurado;
var send_form=0;

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
	
	//Reinicio de variables
	posX=0; 
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
	if ( jQuery(".preview_box").is(":visible") ) {	
		jQuery(".preview_box").height(jQuery(".preview_box").width());	
		jQuery(".imagePreview").height(jQuery(".preview_box").width());	
	}
	
	//Ajustamos cuadros en el muro de pics 
	if ( jQuery(".wall_pics").is(":visible") ) {	
		jQuery(".box_img_small").height(jQuery(".box_img_small").width());	
	}
	
	//Si detalle está desplegado calculamos altura de los bloques
	if ( jQuery(".detalle_pic").is(":visible") ) {	
		jQuery(".detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
		jQuery(".img_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
		jQuery(".cont_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));
		jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
	}
	
	//Solo ejecutar si es visible la galería
	if ( jQuery("#galeria_sup").is(":visible") ) {
		//Slider columnas de la izquierda 
		
		//var h_parent=jQuery('.left_galeria .colum_1 .box_img_2').height();
		//jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(h_parent);
		
		/*COLUMNA 1 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		jQuery('.left_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_1').height());
		slider_l_1_1=jQuery('.left_galeria .bxslider_l_1_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5000});
		//Cuadro columna 1 bloque 2
		jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_2').height());
		slider_l_1_2=jQuery('.left_galeria .bxslider_l_1_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000});
		//Cuadro columna 1 bloque 3-1
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_1=jQuery('.left_galeria .bxslider_l_1_3_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4000});
		//Cuadro columna 1 bloque 3-2
		jQuery('.left_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_1 .box_img_3').height());
		slider_l_1_3_2=jQuery('.left_galeria .bxslider_l_1_3_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3500});
		
		/*COLUMNA 2 IZQUIERDA*/
		//Cuadro columna 1 bloque 1
		jQuery('.left_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_1').height());
		slider_l_2_1=jQuery('.left_galeria .bxslider_l_2_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4500});
		//Cuadro columna 1 bloque 2
		jQuery('.left_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_2').height());
		slider_l_2_2=jQuery('.left_galeria .bxslider_l_2_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2500});
		//Cuadro columna 1 bloque 3-1
		jQuery('.left_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_3').height());
		slider_l_2_3=jQuery('.left_galeria .bxslider_l_2_3').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000});
		//Cuadro columna 1 bloque 3-2
		jQuery('.left_galeria .colum_2 .box_img_4 .box_slider_img').height(jQuery('.left_galeria .colum_2 .box_img_4').height());
		slider_l_2_4=jQuery('.left_galeria .bxslider_l_2_4').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4000});
		
		/*COLUMNA 1 DERECHA*/
		//Cuadro columna 1 bloque 1
		jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_1').height());
		slider_r_1_1=jQuery('.right_galeria .bxslider_r_1_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4500});
		//Cuadro columna 1 bloque 2
		jQuery('.right_galeria .colum_1 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_2').height());
		slider_r_1_2=jQuery('.right_galeria .bxslider_r_1_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:2500});
		//Cuadro columna 1 bloque 3-1
		jQuery('.right_galeria .colum_1 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_1 .box_img_3').height());
		slider_r_1_3=jQuery('.right_galeria .bxslider_r_1_3').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000});
		
		/*COLUMNA 2 DERECHA*/
		//Cuadro columna 2 bloque 1
		jQuery('.right_galeria .colum_2 .box_img_1 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_1').height());
		slider_r_2_1=jQuery('.right_galeria .bxslider_r_2_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:5000});
		//Cuadro columna 1 bloque 2
		jQuery('.right_galeria .colum_2 .box_img_2 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_2').height());
		slider_r_2_2=jQuery('.right_galeria .bxslider_r_2_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3000});
		//Cuadro columna 2 bloque 3-1
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_1=jQuery('.right_galeria .bxslider_r_2_3_1').bxSlider({mode:'vertical',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:4000});
		//Cuadro columna 2 bloque 3-2
		jQuery('.right_galeria .colum_2 .box_img_3 .box_slider_img').height(jQuery('.right_galeria .colum_2 .box_img_3').height());
		slider_r_2_3_2=jQuery('.right_galeria .bxslider_r_2_3_2').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,pause:3500});
		
		/*Últimos Pics*/
		jQuery('.galeria_curiosidad .box_slider_img').height(jQuery('.galeria_curiosidad').height());
		slider_last_pics=jQuery('.bxslider_ultimos_pics').bxSlider({mode:'horizontal',pager: false,infiniteLoop: true,useCSS: false,auto: true,controls:false,speed:60000,minSlides:5,maxSlides:5,slideWidth:3200,slideMargin:0,ticker:true});
	
	}
	
	//Cuando queremos desplegar ventana de login
	jQuery(document).on("click",".btn_login", function(e) {
		e.preventDefault();
		if(jQuery(this).hasClass('active')){
			jQuery(this).removeClass('active');
			jQuery('#box_login').stop().clearQueue().fadeOut(600,function(){
				//Limpiamos los campos
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
		var row_padre=jQuery(this).parents('.row').attr('rel');
		var id_pic=jQuery(this).attr('rel');
		
		if ( jQuery(".detalle_pic").is(":visible") ) {	
			jQuery(".detalle_pic").stop().clearQueue().slideUp(600,'easeInOutExpo',function(){
				//Removemos el bloque anterior
				jQuery(".detalle_pic").remove();
				//Hacemos llamada de AJAX para obtener detalles del pic
				/*var data_var1='q='+ Math.random()+'&id='+id_pic;
				jQuery.ajax({
						url: 'detalles_pic.php',
						type: 'POST',
						async: true,
						dataType: 'html',
						data: data_var1,
						success: function(msg1){
							//Pintamos la respuesta del AJAX y desplegamos detalle
						}
				});*/
				// Pintamos detalles
				jQuery('<div class="detalle_pic"><div class="inside_detalle_pic"><div class="img_detalle_pic"><div class="img_big_detalle" style="background-image:url(img/test1.jpg);"></div></div><div class="cont_detalle_pic"><h4>Alumno</h4><p class="nombre_persona">Estefania Randez Pérez</p><h5>Beauty and The Beast</h5><p class="descrip_pic">Integer dolor nunc, lacinia a mi eu, hendrerit blandit augue. Fusce tincidunt enim lorem, eget varius velit semper euismod. Duis semper id nulla ut fringilla. Cras a ante ac nibh scelerisque cursus eget eu lorem. Etiam consectetur risus vel pharetra semper. Aliquam libero tortor, dapibus eget sapien ac, ultricies pulvinar.</p><div class="bottom_detalle"><div class="votos_detalle"><span>132 Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar" rel="1">Votar</a><p class="btns_share">Compartir <a href="#" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="#" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="#" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div><a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a></div>').insertAfter( ".row[rel="+row_padre+"]" );
				//Ajustamos alturas
				jQuery(".detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
				jQuery(".img_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
				jQuery(".cont_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));
				jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
				//Desplegamos el cuadro de detalle
				jQuery(".detalle_pic").stop().clearQueue().slideDown(600,'easeInOutExpo');
			});
		}else{
			//Hacemos llamada de AJAX para obtener detalles del pic
			/*var data_var1='q='+ Math.random()+'&id='+id_pic;
			jQuery.ajax({
					url: 'detalles_pic.php',
					type: 'POST',
					async: true,
					dataType: 'html',
					data: data_var1,
					success: function(msg1){
						//Pintamos la respuesta del AJAX y desplegamos detalle
					}
			});*/
			// Pintamos detalles
			jQuery('<div class="detalle_pic"><div class="inside_detalle_pic"><div class="img_detalle_pic"><div class="img_big_detalle" style="background-image:url(img/test1.jpg);"></div></div><div class="cont_detalle_pic"><h4>Alumno</h4><p class="nombre_persona">Estefania Randez Pérez</p><h5>Beauty and The Beast</h5><p class="descrip_pic">Integer dolor nunc, lacinia a mi eu, hendrerit blandit augue. Fusce tincidunt enim lorem, eget varius velit semper euismod. Duis semper id nulla ut fringilla. Cras a ante ac nibh scelerisque cursus eget eu lorem. Etiam consectetur risus vel pharetra semper. Aliquam libero tortor, dapibus eget sapien ac, ultricies pulvinar.</p><div class="bottom_detalle"><div class="votos_detalle"><span>132 Votos</span></div><div class="rrss_vote_detalle"><a href="#" class="btn_votar" rel="1">Votar</a><p class="btns_share">Compartir <a href="#" class="fa fa-twitter"><span class="hide">Twitter</span></a><a href="#" class="fa fa-facebook"><span class="hide">Facebook</span></a><a href="#" class="fa fa-pinterest-p"><span class="hide">Pinterest</span></a></p></div></div></div></div><a href="#" class="prev_pic">Anterior</a><a href="#" class="next_pic">Siguiente</a><a href="#" class="close_pic">Cerrar</a></div>').insertAfter( ".row[rel="+row_padre+"]" );
			//Ajustamos alturas
			jQuery(".detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
			jQuery(".img_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
			jQuery(".cont_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));
			jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
			//Desplegamos el cuadro de detalle
			jQuery(".detalle_pic").stop().clearQueue().slideDown(600,'easeInOutExpo');
		}
	});
	
	//Cuando queremos cerrar detalles de pic
	jQuery(document).on("click",".close_pic", function(e) {
		e.preventDefault();
		jQuery('.detalle_pic').stop().clearQueue().slideUp(600,'easeInOutExpo',function(){
			jQuery(".detalle_pic").remove();
		});
	});
	
	//Cuando queremos pasar al siguiente pic
	jQuery(document).on("click",".next_pic", function(e) {
		e.preventDefault();
		console.log('Pic Siguiente');
	});
	
	//Cuando queremos pasar al pic anterior
	jQuery(document).on("click",".prev_pic", function(e) {
		e.preventDefault();
		console.log('Pic Anterior');
	});
	
	
	//Obtenemos altura y anchura del navegador
	var h_win=jQuery('#wrapper').height();
	var w_win=window.innerWidth;
	
	
	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {
		
		//Ajustamos cuadro de preview en Mis pics 
		if ( jQuery(".preview_box").is(":visible") ) {	
			jQuery(".preview_box").height(jQuery(".preview_box").width());	
			jQuery(".imagePreview").height(jQuery(".preview_box").width());	
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
			jQuery(".detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
			jQuery(".img_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
			jQuery(".cont_detalle_pic").height((jQuery(".box_img_small").outerHeight()*2));	
			jQuery(".img_big_detalle").height((jQuery(".img_detalle_pic").outerHeight()));
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
 		//if(jQuery.cookie('cambridge-curiosipics') != 'acepta'){
			//jQuery('.block-cookies').fadeOut(600,function(){
				//Creamos la cookie de aceptación
				//jQuery.cookie('cambridge-curiosipics', 'acepta', { expires: 365 * 10 ,path: '/' });
				//Añadimos GA
				/*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				
				ga('create', 'UA-31155962-13', 'auto');
				ga('send', 'pageview');*/
			//});
		//}
  }
  
  //Solo ejecutar si es visible la galería (HOME)
  if ( jQuery("#galeria_sup").is(":visible") && device=='none' ) {
	   
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
			jQuery('.deco_2_5').stop().clearQueue().animate({ bottom: 0+(scrollAmount * speedC)}, 0);
			
			jQuery('.deco_3_1').stop().clearQueue().animate({ bottom: 0+(scrollAmount * speedA)}, 0);
			jQuery('.deco_3_2').stop().clearQueue().animate({ bottom: 150+(scrollAmount * speedB)}, 0);
			jQuery('.deco_3_3').stop().clearQueue().animate({ top: 35-(scrollAmount * speedD)}, 0);
			jQuery('.deco_3_4').stop().clearQueue().animate({ top: 0-(scrollAmount * speedF)}, 0);
			
			jQuery('#box_curiosidad').stop().clearQueue().animate({ marginTop: 0-(scrollAmount * speedE)}, 0);
		  }
		  
		  //Animación de decoración de la sección curiosidades 
		  if(scrollAmount>top_curiosidades){
			  jQuery('.deco_4_1').stop().clearQueue().animate({ top: 60-((scrollAmount-top_curiosidades) * speedE)}, 0);
			  jQuery('.deco_4_2').stop().clearQueue().animate({ bottom: 7+((scrollAmount-top_curiosidades) * speedA)}, 0);
			  jQuery('.deco_4_3').stop().clearQueue().animate({ top: 0-((scrollAmount-top_curiosidades) * speedD)}, 0);
			  
			 jQuery('.deco_5_1').stop().clearQueue().animate({ top: 0-((scrollAmount-top_curiosidades) * speedD)}, 0);
			  jQuery('.deco_5_2').stop().clearQueue().animate({ top: 100-((scrollAmount-top_curiosidades) * speedE)}, 0);
			  jQuery('.deco_5_3').stop().clearQueue().animate({ top: 0-((scrollAmount-top_curiosidades) * speedA)}, 0);
		  }
		  
		   //Animación de decoración de la sección participar 
		  if(scrollAmount>top_participar){
			 posY=-(scrollAmount-top_participar);
			 //console.log(posY);
			jQuery('#box_participar .container').css({ backgroundPosition:"50% "+posY+"px" });
		  }
		  
		   //Animación de decoración de la sección premios 
		  if(scrollAmount>top_premios){
			 posX=-(scrollAmount-top_premios);
			 //console.log(posY);
			jQuery('#box_premios').css({ backgroundPosition: posX+"px bottom" });
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

//Funcion para validar genéricamnete un formulario
function validate_form(id){
		//Busca todos los campos requeridos de texto
			if(jQuery(id).find('.validation-rule-empty').length > 0){
				var error_empty=0;
				jQuery(id).find('.validation-rule-empty').each(function() {
					var res_campo=jQuery(this).val();
					if(res_campo==""){
						error_empty=1;
						jQuery(this).addClass('error').val('');
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
						jQuery(this).addClass('error').val('');
					}

				});
			}

			//Busca todos los campos requeridos de codigo postal
			if(jQuery(id).find('.validation-rule-date').length > 0){
				var error_date=0;
				jQuery(id).find('.validation-rule-date').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) ){
						error_date=1;
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


			//Error general campos vacíos
			if(error_empty==1 || error_checkbox_centre==1 || error_checkbox_teacher==1 || error_course_book==1){
				var message=jQuery(id).attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(error_checkbox==1){
				var message=jQuery(id).find('.validation-rule-checkbox').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}
			
			//Errores en formato de fecha
			if(error_date==1){
				var message=jQuery(id).find('.validation-rule-date').attr('data-error-msg');
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
			if(error_empty==1 || error_checkbox==1 ||error_mail || error_password==1 || error_date==1){
				return 1;
			}else{
				return 0;
			}
}

//Previsualizar imagen antes de subir al server 
function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                jQuery('.preview_box').css('background', 'transparent url('+e.target.result +') left top no-repeat');
            }

            reader.readAsDataURL(input.files[0]);
        }
    }





