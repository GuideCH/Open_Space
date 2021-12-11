var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

var manualNav = function(manual){
  slides.forEach((slide) => {
    slide.classList.remove('active');

    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
  });

  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});


var repeat = function(activeClass){
  let active = document.getElementsByClassName('genres_active');
  let i = 1;

  var repeater = () => {
    setTimeout(function(){
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove('genres_active');
      });

    slides[i].classList.add('genres_active');
    btns[i].classList.add('genres_active');
    i++;

    if(slides.length == i){
      i = 0;
    }
    if(i >= slides.length){
      return;
    }
    repeater();
  }, 10000);
  }
  repeater();
}
repeat();
