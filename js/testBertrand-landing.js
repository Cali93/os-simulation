/*
----------------------------------------------------------------------
INTRO ANIMATIONS (ball & menu)
----------------------------------------------------------------------
*/


// Hide ball on page load
$('.ball-menu-item').hide();

let dorothyBall = $('.dorothy-ball');
let menuOpen = false; // used to tell whether menu was clicked or not (acts as switch)
let message = document.querySelector('.idle-message-style');
let welcomeMessageContainer = document.getElementById('welcomeMessageContainer');

// intro animation [Anime JS], "breathing" ball effect
let breathingBall = anime({
	targets: '.dorothy-ball',
	delay: 1500,
	translateX: ['-50%', '-50%'],
	translateY: ['50%', '50%'],
	scale: [1, 1.05],
	direction: 'alternate',
	easing: 'easeInOutQuad',
	duration: 1600,
	loop: true,
	autoplay: false
});


$( window ).on( "load", function() {
	// on page load first make ball appear [Anime JS]
	anime({
		targets: '.dorothy-ball',
		translateX: '-50%',
		translateY: '50%',
		opacity: 1,
		scale: [0, 1],
		duration: 1000,
		easing: 'easeInOutBack',
		complete: breathingBall.play()
	});

	// When ball is clicked
	dorothyBall.click(function() {
		// pause the breathing animation to avoid problems with its loop property [Anime JS]
		breathingBall.pause();
		// then move ball to the bottom [Anime JS]
		anime({
			targets: '.dorothy-ball',
			bottom: '-130px',
			translateX: '-50%',
			translateY: '0%',
			duration: 1200,
			easing: 'easeOutElastic'
		});	
		// create a timeline [Anime JS] to chain more animations
		let myTimeline = anime.timeline();

		// if menu isn't open do following:
		if (menuOpen === false) {
			welcomeMessageContainer.style.opacity = 0;
			menuOpen = true;
			// 'display block' (show) the menu (tiny balls)
			$('.ball-menu-item').show();
			// lay out the timeline [Anime JS]
			myTimeline
			  .add({
			    targets: '.terminal',
			    scale: [0, 1],
			    offset: '+=500'
			  })
			  .add({
			    targets: '.profile',
			    scale: [0, 1],
			    offset: '-=950'
			  })
			  .add({
			    targets: '.info',
			    scale: [0, 1],
			    offset: '-=950'
			  })
			  .add({
			    targets: '.calendar',
			    scale: [0, 1],
			    offset: '-=950',
			    complete: function(){
			    	displayMessage();
			    	welcomeMessageContainer.style.opacity = 1;
			    	// message.style.display = 'block';
			    }
			  });
		
		// if menu is open do following:
		} else {
			menuOpen = false;
			// lay out the timeline [Anime JS]
			myTimeline
			  .add({
			    targets: '.terminal',
			    scale: 0.4
			  })
			  .add({
			    targets: '.profile',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			    targets: '.info',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			    targets: '.calendar',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			  	targets: '.terminal',
			  	scale: 0.4,
			  	translateX: '150%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.profile',
			  	scale: 0.4,
			  	translateX: '100%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.info',
			  	scale: 0.4,
			  	translateX: '-100%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.calendar',
			  	scale: 0.4,
	    		translateX: '-150%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack',
	    		complete: function(){ // once all of these animations are completed run the following:
	    			$('.ball-menu-item').hide();
	    			$('.terminal').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.profile').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.info').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.calendar').css({transform: 'translateX(0%) translateY(0%)'});
	    		}
			  })
		}	
	});
});


/*
----------------------------------------------------------------------
EYE (MOUSE TRACKING)
----------------------------------------------------------------------
*/

let ball = {};
let n_ball = document.querySelector(".dorothy-ball");
// let n_iris = n_eye.querySelector(".iris");
let size = n_ball.clientWidth;

(window.onresize = function () {
	ball.x = n_ball.offsetLeft + size / 2;
	ball.y = n_ball.offsetTop + size / 2;
})();

window.onmouseout = window.onmouseleave = function () {
	n_iris.setAttribute("class", "iris anim");
};

window.ontouchend = function (e) {
	if (e.touches.length == 0) window.onmouseout();
};

window.onmousemove = function (e) {
	n_iris.setAttribute("class", "iris");
	let m = {
		x: e.clientX - ball.x,
		y: e.clientY - ball.y
	};
	let dist = Math.min(60, Math.max(-60, Math.sqrt(Math.pow(m.x, 2) + Math.pow(m.y, 2)) / 6));
	let dir = Math.atan2(m.x, m.y);
	m.rx = dist * -Math.cos(dir);
	m.ry = dist * Math.sin(dir);
	n_ball.style.transform = "rotateX(" + m.rx + "deg) rotateY(" + m.ry + "deg) translateZ(68px) scale(0.6)";
};

window.ontouchmove = window.ontouchstart = function (e) {
	return window.onmousemove(e.touches[0]);
};


/*
let eye = {};
let n_eye = document.querySelector(".eye");
let n_iris = n_eye.querySelector(".iris");
let size = n_eye.clientWidth;

(window.onresize = function () {
	eye.x = n_eye.offsetLeft + size / 2;
	eye.y = n_eye.offsetTop + size / 2;
})();

window.onmouseout = window.onmouseleave = function () {
	n_iris.setAttribute("class", "iris anim");
};

window.ontouchend = function (e) {
	if (e.touches.length == 0) window.onmouseout();
};

window.onmousemove = function (e) {
	n_iris.setAttribute("class", "iris");
	let m = {
		x: e.clientX - eye.x,
		y: e.clientY - eye.y
	};
	let dist = Math.min(60, Math.max(-60, Math.sqrt(Math.pow(m.x, 2) + Math.pow(m.y, 2)) / 6));
	let dir = Math.atan2(m.x, m.y);
	m.rx = dist * -Math.cos(dir);
	m.ry = dist * Math.sin(dir);
	n_iris.style.transform = "rotateX(" + m.rx + "deg) rotateY(" + m.ry + "deg) translateZ(68px) scale(0.6)";
};

window.ontouchmove = window.ontouchstart = function (e) {
	return window.onmousemove(e.touches[0]);
};
*/


/*
----------------------------------------------------------------------
IDLE MESSAGE CENTRE PAGE
----------------------------------------------------------------------
*/

// When user is idle for too long, launch function below:
let inactivityTime = function () {
    let t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer; // catches touchpad clicks
    window.onscroll = resetTimer; // catches scrolling with arrow keys
    window.onkeypress = resetTimer;

    function display() {
        
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(displayMessage, 3000);
    }
};

// function to display welcome message:
// function displayMessage () {
// 	let welcomeMessageContainer = document.getElementById('welcomeMessageContainer');
// 	// create h1 tag inside container
// 	let welcomeMessageH1 = document.createElement('h1');
// 	// array of different messages
// 	let messageArray = ["wanna talk?", "ask me anything.", "wanna chat?", "can I help you with anything?", "what's up?", "how's it going?"];
// 	// fetch message from messageArray at random
// 	let randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
// 	// what will be displayed once user updated their profile
// 	let messageGeneral = 'Hey fellow becoder,' + ' ' + randomMessage;
// 	// what will be displayed if user hasn't updated their profile
// 	let messageNoName = 'Hello stranger, I would love to know your name! You can do this by updating your profile page in the menu below.';
// 	// let messageWithName = 'Hello <span>FETCH NAME IN DB</span>, wanna talk?'; // Use this with DB (check with backend guys) and associate with this an array of more messages like 'it's good to see you again' or 'long time no see'
// 	welcomeMessageContainer.classList.add('idle-message-style');
// 	// add random message as content in the h1
// 	welcomeMessageH1.innerHTML = messageGeneral;
// 	// append the h1 back into the containing div
// 	welcomeMessageContainer.appendChild(welcomeMessageH1);

// 	/* TO IMPLEMENT LATER:

// 	if (USER HAS UPDATED PROFILE) {
// 		welcomeMessageH1.innerHTML = messageGeneral;
// 	} else if(USER HAS NOT UPDATED PROFILE) {
// 		welcomeMessageH1.innerHTML = messageNoName;
// 	}
// 	*/
// }

function displayMessage () {
	let welcomeMessageSpan = document.querySelector('#welcomeMessageContainer h1 span');
	// array of different messages
	let messageArray = ["wanna talk?", "ask me anything.", "wanna chat?", "can I help you with anything?", "what's up?", "how's it going?"];
	// fetch message from messageArray at random
	let randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
	// what will be displayed once user updated their profile
	// let messageGeneral = 'Hey fellow becoder,' + ' ' + randomMessage;
	// what will be displayed if user hasn't updated their profile
	let messageNoName = 'Hello stranger, I would love to know your name! You can do this by updating your profile page in the menu below.';
	// let messageWithName = 'Hello <span>FETCH NAME IN DB</span>, wanna talk?'; // Use this with DB (check with backend guys) and associate with this an array of more messages like 'it's good to see you again' or 'long time no see'
	
	// add random message as content in the h1
	// welcomeMessageSpan.innerHTML = messageGeneral;
	welcomeMessageSpan.innerHTML = randomMessage;


	/* TO IMPLEMENT LATER:

	if (USER HAS UPDATED PROFILE) {
		welcomeMessageH1.innerHTML = messageGeneral;
	} else if(USER HAS NOT UPDATED PROFILE) {
		welcomeMessageH1.innerHTML = messageNoName;
	}
	*/
}

// displayMessage(); 




