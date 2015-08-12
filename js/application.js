/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 10-8-2015
Cliente: Curiosipics
***********************/


/**********************
VARIABLES
**********************/


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
	
	//Reiniciar Scroll a 0
	/*jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay 
		var hash = window.location.hash.substring(1);
		if(hash!=""){
			jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
		}
	});*/
	
	jQuery(window).scroll(control_scroll);
	
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
  
  //Aparece flecha top
  /*if(scrollAmount>300){
		if (!jQuery('.up-window').is(":visible") ) {
			jQuery('.up-window').stop().clearQueue().fadeIn(400);
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot + 20) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(despl)});
		   }else{
				jQuery('.up-window').css({bottom:0});
		   }  
		}else{
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(despl)});
		   }else{
				jQuery('.up-window').css({bottom:0});
		   } 
		}
   }else{
   		jQuery('.up-window').stop().clearQueue().fadeOut(400);
   }*/
   //jQuery('.marcador').html(scrollAmount);
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



