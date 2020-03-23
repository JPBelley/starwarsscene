var spanText = function spanText(text) {
  var string = text.innerText;
  var spaned = '';
  for (var i = 0; i < string.length; i++) {
    if (string.substring(i, i + 1) === ' ') spaned += string.substring(i, i + 1);
    else spaned += '<span>' + string.substring(i, i + 1) + '</span>';
  }
  text.innerHTML = spaned;
}

var headline = document.querySelector("h1");

spanText(headline);

let animations = document.querySelectorAll('.animation');

animations.forEach(animation => {
  let letters = animation.querySelectorAll('span');
  letters.forEach((letter, i) => {
    letter.style.animationDelay = (i * 0.1) + 's';
  });
});

let animationStep2 = document.querySelector('h1 span:last-of-type');
let animationStep3 = document.querySelector('h1::before');
animationStep2.addEventListener('animationend', () => {
  headline.classList.add('animation--step-2');
  setTimeout(() => {
    document.querySelector('.intro').classList.add('fade-out');
  }, 760);
  setTimeout(() => {
    headline.classList.remove('animation--step-2');
    headline.classList.add('animation--step-3');
  }, 1000);
});

