window.addEventListener('load', () => {

// slider
  const images = document.querySelectorAll(".slider_li");
  const pages = document.querySelectorAll(".slider_pages-li");
  const sliderBlock = document.querySelector(".slider");
  const slider = new Slider(
    images,
    pages
  );
  slider.startSlideShow();
  sliderBlock.addEventListener("click", slider.controllerClick.bind(slider));

  // burger
  let header = document.querySelector('.header');
  let headerContainer = document.querySelector('.header .container');
  let burgerEnable = false;

  header.querySelector('.burger-menu').addEventListener('click', () => {
    burgerActive();
  });

  document.querySelector('.navigation').addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() == "a") {
      if (burgerEnable) {
        burgerActive();
      }
    }
  });

  function burgerActive() {
    burgerEnable = !burgerEnable;
    document.querySelector('.burger-menu_button').classList.toggle('burger_active');
    document.querySelector('.header_navigation').classList.toggle('burger_active');
    document.querySelector('.burger_overlay').classList.toggle('burger_active');
    document.querySelector('.logo').classList.toggle('burger_active');
  }

  // nav
  document.addEventListener('scroll', onScroll);

  function onScroll() {
    let currentPosition = window.scrollY + header.offsetHeight;
    let pageSections = document.querySelectorAll('section');
    let links = document.querySelectorAll('.header_navigation a');

    pageSections.forEach((item) => {
      if (item.offsetTop <= currentPosition && (item.offsetTop + item.offsetHeight) > currentPosition) {
        links.forEach((a) => {
          a.classList.remove('item_active');
          if (item.getAttribute('id') === a.getAttribute('href').substring(1)) {
            a.classList.add('item_active');
          }
        });
      }
    });

    if (window.scrollY <= header.offsetHeight) {
      header.classList.remove('header_transparency');
      headerContainer.style.padding = '22px 0px'
    } else {
      header.classList.add('header_transparency');
      headerContainer.style.padding = '0px'
    }
  }

  // document.querySelector('.logo').addEventListener('click', (event) => {
  //   event.preventDefault();
  // });

  document.querySelector('.burger-menu_button').addEventListener('click', (event) => {
    event.target.classList.toggle('menu_active');
    document.querySelector('.logo').classList.toggle('logo_move');
  });



  // accordeon
  let acc = document.getElementsByClassName("accordion");
  let i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }



});