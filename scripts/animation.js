let pierogi_spin = anime({
  targets: '#pierogi',
  rotateZ: 360,
  duration: 30000,
  easing: 'linear',
  loop: true
});

let pierogi_grow = anime({
  targets: '#pierogi_img',
  scale: 1.2,
  duration: 2000,
  easing: 'linear',
  direction: 'alternate',
  loop:true
});

let rays_spin = anime({
  targets: '#rays',
  rotateZ: -360,
  duration: 40000,
  easing: 'linear',
  loop: true
});

var pierogi_click = anime({
  targets: '#pierogi_img',
  scale: 1.6,
  duration: 200,
  easing: 'linear',
  direction: 'alternate',
    autoplay:false
});

$( "#buttons img" ).on( "click", function() {
   if($(this).attr('id') == "home-btn"){
       $("#home").css({"display":"flex"});
       $("#jobs").hide();
       $(this).css({"background-position":"0 0"});
       $("#jobs-btn").css({"background-position":"210px 72px"});
       $( "#jobs-btn" ).addClass( "jobs-inactive" );
       $(this).removeClass( "home-inactive" );
   }else if($(this).attr('id') == "jobs-btn"){
       $("#home").hide();
       $("#jobs").css({"display":"flex"});
       $("#home-btn").css({"background-position":"0 72px"});
       $(this).css({"background-position":"210px 0"});
       $( "#home-btn" ).addClass( "home-inactive" );
       $(this).removeClass( "jobs-inactive" );
   } 
});