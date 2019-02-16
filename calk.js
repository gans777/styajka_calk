$(document).ready(function(){

 
     ///////// слайдер вертикальный для толщины
       $('#slider_h').slider({
              max:21,
              min:1,
                value: 5,
                orientation: 'vertical',
                create: setInputsFromSlider_h,
                slide: setInputsFromSlider_h,
                stop: setInputsFromSlider_h
            })

            function setInputsFromSlider_h() {
                $('#h_styaj').val($('#slider_h').slider("value"));
            }
        /////// конец слайдер вертикальный для толщины

     //// слайдер горизонтальный для площади
        $('#slider_s').slider({
              max:100,
              min:1,
              step: 0.5,
                value: 10,
               // orientation: 'vertical',
                create: setInputsFromSlider_s,
                slide: setInputsFromSlider_s,
                stop: setInputsFromSlider_s
            })

            function setInputsFromSlider_s() {
                $('#s_styaj').val($('#slider_s').slider("value"));
            } 
       //// end

var rashod_all={};

var rashod=function(h, S){
 
   if (h<0.05) {
   	styaj14(h,S);
   	 //alert('не рекомендуется делать стяжку тоньше 5 сантиметров- может плохо прилипнуть\n'+'мешков цемента 50кг марка500='+
   	 	//math.ceil(rashod_all.cement_up));
   	 	//alert('мешков'+rashod_all.cement_up);
      var cement = document.getElementById('cement');
      var pesok = document.getElementById('pesok');
      var keramzit = document.getElementById('keramzit');

         var alert=document.querySelector('.alert_height');
           alert.style.display="block";// предупреждение о нежелательности делать стяжку тоньше пяти см
          rashod_all.cement_up=Math.ceil(rashod_all.cement_up);// округление до целого мешка цемента
        cement.innerHTML = roundPlus(rashod_all.cement_up,3);
        pesok.innerHTML = roundPlus(rashod_all.pesok_up,3);
        keramzit.innerHTML="0(не нужен)";
        
   	 	return;
   }

   if ((h>=0.05)&&(h<=0.061)) { // от 5 см до 6см   делается в пропорции 1 к 4
   	styaj14(h,S);
     var cement = document.getElementById('cement');
      var pesok = document.getElementById('pesok');
      var keramzit = document.getElementById('keramzit');
   	  //alert('мешков'+rashod_all.cement_up);
           var alert=document.querySelector('.alert_height');
           alert.style.display="none";// удаление предупреждения о нежелательности делать стяжку тоньше пяти см
          rashod_all.cement_up=Math.ceil(rashod_all.cement_up);// округление до целого мешка цемента
        cement.innerHTML = roundPlus(rashod_all.cement_up,3);
        pesok.innerHTML = roundPlus(rashod_all.pesok_up,3);
         keramzit.innerHTML="0(не нужен)";

   	  return;
   }

   if (h>0.061){    // верхний слой стяжки толщиной 3см делается в пропорции 1 к 4, а остальной слой грубый с щебнем в пропорции 1:3:5

    styaj14(0.03,S);
    beton135((h-0.03),S);
    rashod_all.cement=Math.ceil(rashod_all.cement_up +rashod_all.cement_bottom);
  /*  alert ('мешков цемента на верх='+rashod_all.cement_up+'\n мешков цемента на бетон='+rashod_all.cement_bottom +
    	'\n всего мешков цемента='+rashod_all.cement+'\n песка на стяжку='+ rashod_all.pesok_up+'\n песок на бетон='+rashod_all.pesok_bottom+ 
'\n всего песка='+(rashod_all.pesok_up+rashod_all.pesok_bottom)+'\n объем керамзита(щебня)='+rashod_all.keramzit_bottom
    	); */
      var alert=document.querySelector('.alert_height');
           alert.style.display="none";// удаление предупреждения о нежелательности делать стяжку тоньше пяти см

    	var cement = document.getElementById('cement');
    	var pesok = document.getElementById('pesok');
    	var keramzit = document.getElementById('keramzit');
    	  cement.innerHTML = rashod_all.cement;
    	  pesok.innerHTML = roundPlus(rashod_all.pesok_up+rashod_all.pesok_bottom,3);
    	  keramzit.innerHTML = roundPlus(rashod_all.keramzit_bottom,3);

   }
   
} // end rashod

 var styaj14=function(h, S) {
 	
 	  
  	    rashod_all.cement_up=h*S*7; // семь 50кг мешков цемента марки 500 ; расчет идет что в мешке примерный объем 35литров цемента
  	    rashod_all.pesok_up=4*35* rashod_all.cement_up/1000;// песок 
        
 } // end styaj14

 var beton135=function(h,S) {
 	 
 	 rashod_all.cement_bottom=h*S*5;// пять 50кг мешков цемента марки 500;расчет идет что  мешок имеет примерный объем 35литров цемента
 	rashod_all.pesok_bottom=3*35*rashod_all.cement_bottom/1000;
 	 rashod_all.keramzit_bottom=5*35*rashod_all.cement_bottom/1000;
 	 
 } // end beton135

function roundPlus(x, n) { //x - число, n - количество знаков
	  if(isNaN(x) || isNaN(n)) return false;
	  var m = Math.pow(10,n);
	  return Math.round(x*m)/m;
	}// end округления 

var block=document.querySelector('.wrap_calk button');
   block.addEventListener('click', function(){
     // block.style.border='5px solid red';
       
var h = document.querySelector('[name^="h_styaj"]').value;
  var S=document.querySelector('[name^="s_styaj"]').value;
     //h.style.border='2px solid red';
    // alert('высота='+ h +'\n площадь='+S);

     rashod(h/100,S);



   });
});// закрывающая скобка $(document).ready(function(){
//rashod(0.15,10);
