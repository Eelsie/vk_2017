function playVideo(id, code) {
  document.getElementById(id).innerHTML = '<iframe  src="https://www.youtube.com/embed/'+code+'?autoplay=1&rel=0&theme=light&color=white" frameborder="0"></iframe>';
}

var menu = document.querySelector(".inner-menu");

function closeMenu(){
  if (menu.style.visibility === 'visible') {
    menu.style.visibility = 'hidden';
  } else {
    menu.style.visibility = 'visible';
  }
};

// SMOOTH SCROLL (https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/)

function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    easeOutQuad(t) {
      return t * (2 - t);
    }
  };

  // Store initial position of a window and time
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  // Take height of window and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  // If requestAnimationFrame is not supported
  // Move window to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  // function resolves position of a window and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    // Stop requesting animation when window reached its destination
    // And run a callback function
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    // If window still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll);
  }

  // Invoke scroll and sequential requestAnimationFrame
  scroll();
}

function scrollToSection(id) {
  scrollIt(
    document.querySelector(id),
    400,
    'easeOutQuad');
  closeMenu();
}


