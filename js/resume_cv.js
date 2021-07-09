/*------------------- Show Menu -------------------*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu')
    });
  }
}
showMenu('nav-toggle','nav-menu')

/*------------------- Remove munu mobile -------------------*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*------------------- Remove munu mobile -------------------*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
  const scrollY = window.pageYoffset;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')
  
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    }else{
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  });
}

/*------------------- scroll-top -------------------*/
function scrollTop(){
  const scrollTop = document.getElementById('scroll-top');
  if(this.scrollY>=200) scrollTop.classList.add('show-scroll'); 
  else scrollTop.classList.remove('show-scroll'); 
}
window.addEventListener('scroll', scrollTop);

/*------------------- Dark / Light Theme -------------------*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*------------------- ruduce the size print on an A4-------------------*/
function scaleCv(){
  document.body.classList.add('scale-cv')
}
function removeScale(){
  document.body.classList.remove('scale-cv')
}
/*------------------- generate PDF -------------------*/
let areaCv = document.getElementById('area-cv');
let resumeBtn = document.getElementById('resume-button');

/* HTML2PDF Options */
let opt = {
  margin:       1,
  filename:     'myResume.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { format: 'a4', orientation: 'portrait' }
};

function generateResume(){
  // 02
  html2pdf(areaCv, opt)
}




resumeBtn.addEventListener('click', () => {
  // 01 
  scaleCv();
  // 03
  generateResume();

  // 04 - 5초 있다가 다시 원래 사이즈로 돌아감
  setTimeout(removeScale, 3000);
})