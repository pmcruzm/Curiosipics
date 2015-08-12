/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 10-8-2015
Cliente: Curiosipics
***********************/


/**********************
VARIABLES
**********************/
var slider_colum1_l,slider_colum1_r,intervalo;
var speedA, speedB, speedC, speedD, speedE;
var posX;

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
			j//Query('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
		}
	});
	
	jQuery(window).scroll(control_scroll);
	
	//Solo ejecutar si es visible la galería
	if ( jQuery("#galeria_sup").is(":visible") ) {
		//Calculamos la altura del contenedor padre y 
		//se la asignamos a las diapositivas 
		var h_parent=jQuery('.left_galeria .colum_1 .box_img_2').height();
		jQuery('.left_galeria .colum_1 .box_img_2 .box_slider_img').height(h_parent);
		
		//Slider columna 1
		slider_colum1_l=jQuery('.left_galeria .bxslider_colum1_l').bxSlider({
							mode:'vertical',
							pager: false,
							infiniteLoop: true,
							useCSS: false,
							auto: true,
							controls:false,
							pause:5000
		});
		
		//Calculamos la altura del contenedor padre y 
		//se la asignamos a las diapositivas 
		var h_parent=jQuery('.right_galeria .colum_1 .box_img_1').height();
		jQuery('.right_galeria .colum_1 .box_img_1 .box_slider_img').height(h_parent);
		
		//Slider columna 1
		slider_colum1_r=jQuery('.right_galeria .bxslider_colum1_r').bxSlider({
							mode:'horizontal',
							pager: false,
							infiniteLoop: true,
							useCSS: false,
							auto: true,
							controls:false,
							pause:4000
		});
		
		//Animación de últimas fotos añadidas
		clearInterval(intervalo);
  		intervalo = setInterval(posterAnimation,20);
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
	
	
	
	//Obtenemos altura y anchura del navegador
	var h_win=jQuery('#wrapper').height();
	var w_win=window.innerWidth;
	
	
	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {
		
		
	
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
 		//if(jQuery.cookie('cambridge-out-and-about') != 'acepta'){
			//jQuery('.block-cookies').fadeOut(600,function(){
				//Creamos la cookie de aceptación
				//jQuery.cookie('cambridge-out-and-about', 'acepta', { expires: 365 * 10 ,path: '/' });
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
  if ( jQuery("#galeria_sup").is(":visible") ) {
		  //Animación decoración superior de la home 
		  if(scrollAmount<765){
			jQuery('.deco_1').stop().clearQueue().animate({ top: 0-(scrollAmount * speedD)}, 0);
			jQuery('.deco_2').stop().clearQueue().animate({ top: -360-(scrollAmount * speedB)}, 0);
			jQuery('.deco_3').stop().clearQueue().animate({ top: -370-(scrollAmount * speedA)}, 0);
			jQuery('#contenidos').stop().clearQueue().animate({ marginTop: 0-(scrollAmount * speedE)}, 0);
		  }
		  
		  //Animación de la home 
		  if(scrollAmount>250){
			jQuery('.deco_4').stop().clearQueue().animate({ bottom: 175+((scrollAmount-250) * speedD)}, 0);
			jQuery('.deco_5').stop().clearQueue().animate({ bottom: 30+((scrollAmount-250) * speedF)}, 0);
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
function posterAnimation()
{
    posX += 1.5;
  	jQuery('.galeria_curiosidad').css({ backgroundPosition: -posX +"px 0px" });
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





