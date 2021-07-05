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
  const link = target.dataset.link;
  //id가 클릭이 될때만 출력
  if(link == null){
    return;
  }
  scrollIntoViews(link);
});

// home의 contact버튼 클릭했을 때 스크롤링
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoViews('#contact')
});

// 스크롤시 home 투명하게 처리
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / (homeHeight - 300); 
  // 1 - 0 / 800 = 1 ==> opacity:1
  // 1 - 400 / 800 = 0.5 ==> opacity:0.5
  // 1 - 800 / 800 = 0 ==> opacity:0
});




function scrollIntoViews(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior:"smooth"});
}