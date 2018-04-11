/*
----------------------------------------------------------------------
INTRO ANIMATIONS (ball & menu)
----------------------------------------------------------------------
*/


// Hide ball on page load
$('.ball-menu-item').hide();

let dorothyBall = $('.dorothy-ball');
let menuOpen = false; // used to tell whether menu was clicked or not (acts as switch)
let message = document.querySelector('.welcome-message-style');
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
			    targets: '.menu-terminal',
			    scale: [0, 1],
			    offset: '+=500'
			  })
			  .add({
			    targets: '.menu-profile',
			    scale: [0, 1],
			    offset: '-=950'
			  })
			  .add({
			    targets: '.menu-info',
			    scale: [0, 1],
			    offset: '-=950'
			  })
			  .add({
			    targets: '.menu-calendar',
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
			    targets: '.menu-terminal',
			    scale: 0.4
			  })
			  .add({
			    targets: '.menu-profile',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			    targets: '.menu-info',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			    targets: '.menu-calendar',
			    scale: 0.4,
			    offset: '-=850'
			  })
			  .add({
			  	targets: '.menu-terminal',
			  	scale: 0.4,
			  	translateX: '150%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.menu-profile',
			  	scale: 0.4,
			  	translateX: '100%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.menu-info',
			  	scale: 0.4,
			  	translateX: '-100%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack'
			  })
			  .add({
			  	targets: '.menu-calendar',
			  	scale: 0.4,
	    		translateX: '-150%',
			  	translateY: '400%',
			  	duration: 300,
			  	offset: '-=800',
			  	easing: 'easeInBack',
	    		complete: function(){ // once all of these animations are completed run the following:
	    			$('.ball-menu-item').hide();
	    			$('.menu-terminal').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.menu-profile').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.menu-info').css({transform: 'translateX(0%) translateY(0%)'});
	    			$('.menu-calendar').css({transform: 'translateX(0%) translateY(0%)'});
	    		}
			  })
		}	
	});
});


/*
----------------------------------------------------------------------
MOUSE TRACKING ANIMATION [OPTIONAL]
----------------------------------------------------------------------
*/



/*
----------------------------------------------------------------------
WELCOME MESSAGE CENTRE PAGE
----------------------------------------------------------------------
*/
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
	welcomeMessageSpan.innerHTML = randomMessage;


	/* TO IMPLEMENT LATER:

	if (USER HAS UPDATED PROFILE) {
		welcomeMessageH1.innerHTML = messageGeneral;
	} else if(USER HAS NOT UPDATED PROFILE) {
		welcomeMessageH1.innerHTML = messageNoName;
	}
	*/
}


/*
----------------------------------------------------------------------
IDLE MESSAGE CENTRE PAGE [OPTIONAL]
----------------------------------------------------------------------
*/

// When user is idle for too long, launch function below:
/*let inactivityTime = function () {
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
};*/



