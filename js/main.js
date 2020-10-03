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

  // Slider 2

  const sliderRevPrev = document.querySelector('.reviews_slider-prev');
  const sliderRevMext = document.querySelector('.reviews_slider-next');

  let slideIndex = 1;
  showSlides(slideIndex);

  function nextSlide() {
    showSlides(slideIndex += 1);
  }

  function previousSlide() {
    showSlides(slideIndex -= 1);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  sliderRevPrev.addEventListener("click", previousSlide);
  sliderRevMext.addEventListener("click", nextSlide);

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("reviews_block-slider");

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }

    for (let slide of slides) {
      slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }

  // form

  let form = document.querySelector('.form');
  let [inputName, inputEmail, formSubject] = form.querySelectorAll('input');
  let formTextarea = form.querySelector('textarea');
  let popup = document.querySelector('.popup');

  let nameRegExp = /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/;
  let emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;

  inputName.addEventListener('change', () => {
    checkInputValue(inputName, nameRegExp);
  });

  inputEmail.addEventListener('change', () => {
    checkInputValue(inputEmail, emailRegExp);
  });

  function checkInputValue(elem, reg) {
    if (reg.test(elem.value)) {
      elem.classList.remove('input_invalid');
    } else {
      elem.classList.add('input_invalid');
    }
  }

  form.querySelector('.input_submit').addEventListener('click', () => {
    checkInputValue(inputName, nameRegExp);
    checkInputValue(inputEmail, emailRegExp);

    if (!inputName.classList.contains('input_invalid') && !inputEmail.classList.contains('input_invalid')) {
      popup.parentElement.classList.remove('popup_hidden');

      if (formSubject.value !== '') {
        popup.querySelector('.popup_subject').innerText = `Subject: ${formSubject.value}`;
      }
      if (formTextarea.value !== '') {
        popup.querySelector('.popup_describe').innerText = `Description: ${formTextarea.value}`;
      }
    }
  });

  popup.querySelector('button').addEventListener('click', () => {
    [inputName, inputEmail, formSubject, formTextarea].forEach(item => item.value = '');
    popup.querySelector('.popup_subject').innerText = 'Without subject';
    popup.querySelector('.popup_describe').innerText = 'Without description';
    popup.parentElement.classList.add('popup_hidden');
  });

});