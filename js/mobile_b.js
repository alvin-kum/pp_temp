$(function(){
	TweenMax.set($('.roll_up_dw').eq(1), {y: 563});
	TweenMax.set($('.roll_up_dw').eq(2), {position: 'absolute', y: 600, autoAlpha: 0});
	TweenMax.set($('.roll_up_dw').eq(3), {position: 'absolute', y: 600, autoAlpha: 0});
	TweenMax.set($('.roll_up_dw').eq(4), {position: 'absolute', y: 600, autoAlpha: 0});
	TweenMax.set('.ch_pagename', {y: -3});

	var currentId = 0;

	function down(){
		currentId++;

		if(currentId >= 7){
			currentId = 7;
		}

		move();
	}

	function up(){
		currentId--;

		if(currentId <= 0){
			currentId = 0;
		}

		move();
	}
	var a = Utils.throttle(0.5, down);
	var b = Utils.throttle(0.5, up);
	
	function move(){
		if(currentId == 0){
			TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 563, ease: Power2.easeOut});
			TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 600, ease: Power2.easeOut});

			$('.ch_explain img').attr({src: '../images/mobile/b_txt_21.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/b_txt_31.png'});

			TweenMax.set('.ch_pagename', {y: -3});
		}else if(currentId == 1){
			TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 0, ease: Power2.easeOut});
			TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});
			
			$('.ch_explain img').attr({src: '../images/mobile/b_txt_22.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/b_txt_32.png'});

			TweenMax.set('.ch_pagename', {y: 0});
		}else if(currentId == 2){
			TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
			TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});

			$('.ch_explain img').attr({src: '../images/mobile/b_txt_23.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/b_txt_33.png'});
		}else if(currentId == 3){
			TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
			TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});

			$('.ch_explain img').attr({src: '../images/mobile/b_txt_24.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/b_txt_34.png'});
		}else if(currentId == 4){
			TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
			TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});

			$('.ch_explain img').attr({src: '../images/mobile/b_txt_25.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/b_txt_35.png'});
		}else if(currentId == 5){
			TweenMax.to($('.visual'), 0.7, {y: -420, ease: Power2.easeInOut});
		}else if(currentId == 6){
			TweenMax.to($('.visual'), 0.7, {y: -694, ease: Power2.easeInOut});
		}else if(currentId == 7){
			TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		}
		// if(currentId == 0){
		// 	TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 563, ease: Power2.easeOut});
		// }else if(currentId == 1){
		// 	TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 0, ease: Power2.easeOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }else if(currentId == 2){
		// 	// TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: -232, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: -232, ease: Power2.easeInOut});
		// }else if(currentId == 3){
		// 	// TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: -232, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// 	TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});
		// }else if(currentId == 4){
		// 	TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }else if(currentId == 5){
		// 	TweenMax.to($('.visual'), 0.7, {y: -118, ease: Power2.easeInOut});
		// }else if(currentId == 6){
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// 	TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});
		// }else if(currentId == 7){
		// 	TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }else if(currentId == 8){
		// 	TweenMax.to($('.visual'), 0.7, {y: -113, ease: Power2.easeInOut});
		// }else if(currentId == 9){
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// 	TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});
		// }else if(currentId == 10){
		// 	TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }else if(currentId == 11){
		// 	TweenMax.to($('.visual'), 0.7, {y: -420, ease: Power2.easeInOut});
		// }else if(currentId == 12){
		// 	TweenMax.to($('.visual'), 0.7, {y: -694, ease: Power2.easeInOut});
		// }else if(currentId == 13){
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }

	}

	$('.visual').on('mousewheel', function(e){
		if(e.deltaY < 0){
			a();
		}else{
			b();
		}
	});

	$('.item_swipe:eq(0)').on('click', function(e){
		e.preventDefault();

		TweenMax.to($('.item_swipe:eq(0)'), 0.7, {x: -436, ease: Power2.easeInOut});
		TweenMax.to($('.item_swipe:eq(1)'), 0.7, {x: -436, ease: Power2.easeInOut});
	});

	$('.item_swipe:eq(1)').on('click', function(e){
		e.preventDefault();

		TweenMax.to($('.item_swipe:eq(0)'), 0.7, {x: -0, ease: Power2.easeInOut});
		TweenMax.to($('.item_swipe:eq(1)'), 0.7, {x: -0, ease: Power2.easeInOut});
	});
});