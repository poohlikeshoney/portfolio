'use strict';

// ✅ navbar 스크롤 되면 box-shadow 만들기
const navbar = document.querySelector('.navbar__container');
const navbarheight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarheight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
});

// ✅ navbar메뉴 클릭했을 때 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  //id가 클릭이 될때만 출력
  if(link == null){
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoViews(link);
});
  // ✅ Toogle Button
  const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
  navbarToggleBtn.addEventListener('click',() => {
    const navbarMenu = document.querySelector('.navbar__menu');
    navbarMenu.classList.toggle('open');
  });

// ✅ home의 contact버튼 클릭했을 때 스크롤링
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoViews('#contact')
});

// ✅ 스크롤시 home 투명하게 처리
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / (homeHeight - 150); 
  // 1 - 0 / 800 = 1 ==> opacity:1
  // 1 - 400 / 800 = 0.5 ==> opacity:0.5
  // 1 - 800 / 800 = 0 ==> opacity:0
});

// ✅ 스크롤시 scroll up 버튼 생성
const scrollUpBtn = document.querySelector('.scrollup-btn')
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2){
    scrollUpBtn.classList.add('visible');
  } else{
    scrollUpBtn.classList.remove('visible');
  }
});
// ✅ scroll up 클릭 시 home으로 이동
scrollUpBtn.addEventListener('click', () => {
  scrollIntoViews('#home')
});

// ✅ Experience tab버튼
const tabList = document.querySelectorAll('.experience .experience__tab-btn li');
const contents = document.querySelectorAll('.experience .experience__content .content_box')
let activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

for(var i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.tab').addEventListener('click', function(e){
    e.preventDefault();
    for(var j = 0; j < tabList.length; j++){
      // 나머지 버튼 클래스 제거
      tabList[j].classList.remove('active');
      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }
    // 버튼 관련 이벤트
    this.parentNode.classList.add('active');
    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}

// ✅ project filter
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if(filter == null){
    return;
  }

  // 버튼 active
  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');

  projectContainer.classList.add('animate-out');
  // projcet요소들 배열 방식으로 받아오기
  setTimeout(()=>{
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if(filter === '*' || filter === project.dataset.type){
        project.classList.remove('invisible');
      } else{
        project.classList.add('invisible'); 
      }
    });
    projectContainer.classList.remove('animate-out');
  }, 300)
});


// ✅ intersectionObserver
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 이용해 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션의 해당하는 메뉴 아이템을 활성화시킨다.
// 배열을 빙글 빙글 돌면서 각각의 아이디를 섹션 돔 요소로 변환하는 새로운 배열로 변환 할 수 있는 API = map

const sectionIds = ['#home', '#about', "#skills", "#work", "#testimonials", "#contact"]
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoViews(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior:"smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin : '0px',
  threshold: 0.3,
}
const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if(entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      } else{
        selectedNavIndex = index -1;
      }
    }
  }); 
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section))

window.addEventListener('wheel', () => {
  if(window.scrollY === 0){
    selectedNavIndex = 0;
  } else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
  
});