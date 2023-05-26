// Scroll a page in the beginning after load
// window.addEventListener('load', function() {
//     window.scrollTo(0, 0);
// });

//------------------ Menu --------------------//


//declaring an element, which we want to change
const menu = document.querySelector('header');

//previous scroll value
let prevScrollPosition = window.pageYOffset;

window.addEventListener('scroll', function() {

    //current scroll value
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > prevScrollPosition) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }

    //if scroll position >= 840px, backgroundColor = red;
    if (scrollPosition >= 800) {
        menu.style.backgroundColor = 'rgb(17, 25, 33)';
        menu.style.color = 'white';
        menu.style.transition = 'all 0.3s';
    }
    else {
        menu.style.backgroundColor = 'rgb(0, 0, 0, 0)';
        menu.style.color = 'white';
        menu.style.transition = 'all 0.3s';
    }
    //save a current value of scrolling in variable prevScrollPosition
    prevScrollPosition = scrollPosition;
});

//scrollTo() after click to 'Mark Taratynov' 
const backTop = document.getElementById('backTop');
backTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
})

//------------------ First slide -------------------//

// Choose slideOne and text which will be hidden
const slideOne = document.querySelector('.slideOne');
const hiddenText = document.querySelectorAll('.titleOne');
const hiddenButton = document.getElementById('digInto');

// After load a page, add class 'show' for slideOne with setTimeout
// window.onload = all actions AFTER loading page
window.onload = function() {

    //setTimeout - function, which starting a function after time (500)
    //In our case, we run a function, which add class 'show'.
  setTimeout(function() {
    
    slideOne.classList.add('show');
    hiddenButton.classList.add('show');
    
  }, 1000); // delay 0.5s (500ms)
};  

//declare titles as array of some words
const titles = ['Coffeeman', 'Enthusiast', 'Developer', 'Problem Solver'];
    
//declare index of title
let titleIndex = 0;
//declare index of every letter of title
let letterIndex = 0;
//declare direction for decide where will appear such letter
let direction = 'forward';

//declare our title, which will be change
const titleTwo = document.querySelector('.titleTwo');

//create a function for animate title
function animateTitle() {

//declare one title variable from titles array with index
const title = titles[titleIndex];

let slicedTitle = title.slice(0, letterIndex + 1);

//our titleTwo = content of slicedTitle
titleTwo.textContent = slicedTitle;

if (direction === 'forward') {
    //add one letter on this step
    letterIndex++;
    //change the direction when letterIndex === title.length
    if (letterIndex === title.length) {
        direction = 'backward';
        setTimeout(() => {
            animateTitle();
    }, 1000);
    return;
}

} else {
    //otherwise change the direction to back and cut a title and choose the other text
    slicedTitle = slicedTitle.slice(0, -1);

    titleTwo.textContent = slicedTitle;

    letterIndex--;
    if (letterIndex === -1) {
        direction = 'forward';
        titleIndex++;
    if (titleIndex === titles.length) {
        titleIndex = 0;
    }
    setTimeout(() => {
        animateTitle();
    }, 1000);
    return;
    }
}
titleTwo.style.opacity = '1';
    setTimeout(() => {
        animateTitle();
}, 100);
}

    animateTitle();

//------------------Slides Between-------------------//

const slideBetween = document.querySelector('.slidesBetween');

//previous scroll value

window.addEventListener('scroll', function() {

    let scrollPosition = window.pageYOffset;
    //current scroll value

    if (scrollPosition > prevScrollPosition) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }

    //if scroll position >= 1200, add class 'show2'
    if (scrollPosition >= 1200) {
        slideBetween.classList.add('show2');
    }
});

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

//------------------ Appearing projects during scroll -------------------//

//declare projects from class .containerInside
const projects = document.querySelector('.containerInside');

function appearProjects() {

    //previous scroll value
    let scrollPosition = window.pageYOffset;

    if (scrollPosition > prevScrollPosition) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }

    //When scroll coordinate >= 1300px
    if (scrollPosition >= 1300) {
        //opacity: 1
        projects.style.opacity = '1';
        //add class to projects from CSS
        projects.classList.add('show3');
    }
    //create timing for () equal 0.5s
    setTimeout(() => {
        appearProjects();
    }, 500);
}

//During scroll down to 1300, after 0.5s running a function
window.addEventListener('scroll', appearProjects());

//------------------ Function of sending inputs to telegram -------------------//

function sendToTelega() {

    //declare input name
    let name = document.getElementById('typeYourName').value;
    //declare input email
    let email = document.getElementById('typeYourEmail').value;
    //declaer input message
    let message = document.getElementById('message').value;

    if (name === '') {
        alert('Please, enter your name!');
        //stop a function
        return;
    } else if (email === '') {
        alert('Please, enter your email!');
        //stop a function
        return;
    } else if (message === '') {
        alert('Please, enter your message!');
        //stop a function
        return;
    };

    // Validate email using regular expression
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
  }

    //declare template for telegram message:
    let text = 'Message from ' + name + ' with adress ' + email + ': ' + message;

    //check text on console
    console.log(text);

    //function, which created below
    sendRequest(text);

    modalSent.style.transition = 'all 0.7s ease-in-out';
    modalSent.style.display = 'flex';

    //function, which creates a modal window after success request sending
    appearModal();

    //Clear inputs
    document.getElementById('typeYourName').value = '';
    document.getElementById('typeYourEmail').value = '';
    document.getElementById('message').value = '';

};

//--------------- Appearing a modal window after sending a request ------------------//

//declare modal window in constant variable for all functions
const modalSent = document.querySelector('.sentModal');


function appearModal() {

    //Change opacity = 1
    modalSent.style.opacity = '1';
    modalSent.style.transition = 'all 0.7s ease-in-out';
    //Change default z-index to upper than early, for visible
    modalSent.style.zIndex = '10';

    //declare variable closeModal for closing modal after sending values
    let closeModal = document.getElementById('closeBtn');

    //During click to button, we change modal's style display to 'none'
    closeModal.addEventListener('click', ()=> {
        modalSent.style.display = 'none';
    });

    //During click to any place, we change modal's style display to 'none'
    window.addEventListener('click', (event)=> {
        if (event.target === modalSent) {
            modalSent.style.transition = 'all 0.7s ease-in-out';
            modalSent.style.display = 'none';
        }
    });
}

//--------------- Send request function --------------//

function sendRequest(text) {
    //create array whose can send request
    let requestObj = new XMLHttpRequest();

    //create link for request
    let link = 'https://api.telegram.org/bot5658228438:AAFGjijllq5VE3ZI8w-ezPabGtEqVKd8Mjo/sendMessage?chat_id=1750693728&text=' + text;

    console.log(link);

    //Configure object
    requestObj.open('GET', link, false);
        
    //Send request
    requestObj.send();

    //Output to console
    console.log('Sent');
};