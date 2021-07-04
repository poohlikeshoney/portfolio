'use strict';

// navbar 스크롤 되면 box-shadow 만들기
const navbar = document.querySelector('.navbar__container');
const navbarheight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarheight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});

// navbar메뉴 클릭했을 때 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  //id가 클릭이 될때만 출력
  const link = target.dataset.link;
  if(link == null){
    return;
  }
  // console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({behavior:"smooth"});
});