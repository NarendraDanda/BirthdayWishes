function openUp() {
    const $opentop = document.querySelector("#opentop");
    const $top = document.querySelector("#top");
    const $front = document.querySelector("#front");
    const $back = document.querySelector("#back");
    const $letter = document.querySelector("#letter");
    const $button = document.querySelector("button");

    $opentop.beginElement();
    $top.style.zIndex = 2;

    $top.classList.add("animate");
    $front.classList.add("animate");
    $back.classList.add("animate");
    $button.classList.add("animate");
    $letter.classList.add("animate");
    
   stars()
   setTimeout(shooting, 5000);
    
  }
  

  