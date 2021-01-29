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