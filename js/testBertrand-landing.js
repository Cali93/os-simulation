// dorothyBall.animate({ 
// 	transform: 'translateY(200%)' 
// }, 600, 'easeOutElastic', function () { … });


// dorothyBall.click(function() {
//   dorothyBall.animate({
//     height: '10%'
//   }, {
//     duration: 500,
//     specialEasing: {
//       // width: "linear",
//       height: "easeOutBounce"
//     }
//     // complete: function() {
//     //   $( this ).after( "<div>Animation complete.</div>" );
//     // }
//   });
// });

let dorothyBall = $('.dorothy-ball');
let ballClicked = false;

let breathingBall = anime({
	targets: '.dorothy-ball',
	delay: 600,
	translateX: ['-50%', '-50%'],
	translateY: ['-50%', '-50%'],
	scale: [1, 1.05],
	direction: 'alternate',
	easing: 'easeInOutQuad',
	duration: 1300,
	loop: true,
	autoplay: false
});


$( window ).on( "load", function() {
	anime({
		targets: '.dorothy-ball',
		translateX: '-50%',
		translateY: '-50%',
		opacity: 1,
		scale: [0, 1],
		duration: 1000,
		easing: 'easeInOutBack',
		complete: breathingBall.play()
	});

	dorothyBall.click(function() {
		breathingBall.pause();
		anime({
			targets: '.dorothy-ball',
			translateY: '120%',
			translateX: '-50%'
			// duration: 500
			// easing: 'easeOutBounce'
		});
		$('.ball-menu-item').show();
		let myTimeline = anime.timeline();
		myTimeline
		  .add({
		    targets: '.terminal',
		    // translateX: [],
		    // translateY: [],
		    scale: [0, 1],
		    offset: '+=500'
		    // duration: 200
		    // delay: 50
		    // easing: 
		  })
		  .add({
		    targets: '.profile',
		    // translateX: [],
		    // translateY: [],
		    scale: [0, 1],
		    offset: '-=700'
		    // duration: 200
		    // delay: 50
		    // easing: 
		  })
		  .add({
		    targets: '.challenges',
		    // translateX: [],
		    // translateY: [],
		    scale: [0, 1],
		    offset: '-=700'
		    // duration: 200
		    // delay: 50
		    // easing: 
		  })
		  .add({
		    targets: '.calendar',
		    // translateX: [],
		    // translateY: [],
		    scale: [0, 1],
		    offset: '-=700'
		    // duration: 200
		    // delay: 50
		    // easing: 
		  });
	});
});



// anime({
//   targets: '.dorothy-ball',
//   scale: [0, 1],
//   duration: 300,
//   complete: function() {

//   }
//   translateX: [
//     { value: 100, duration: 1200 },
//     { value: 0, duration: 800 }
//   ],
//   rotate: '1turn',
//   backgroundColor: '#FFF',
//   duration: 2000,
//   loop: true
// });