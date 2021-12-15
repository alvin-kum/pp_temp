$(function(){
	TweenMax.set('.section_02', {y: 626});
	TweenMax.set('.section_03', {y: 626});
	TweenMax.set('.section_04', {y: 626});
	TweenMax.set('.section_05', {y: 626});

	var currentId = 0;

	function down(){
		currentId++;

		if(currentId >= 4){
			currentId = 4;
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
			TweenMax.to('.section_02', 0.7, {y: 626});

			$('.ch_explain img').attr({src: '../images/mobile/a_txt_21.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/a_txt_31.png'});

			TweenMax.set('.ch_pagename', {y: -3});
		}else if(currentId == 1){
			TweenMax.to('.section_02', 0.7, {y: 0});
			TweenMax.to('.section_03', 0.7, {y: 626});

			$('.ch_explain img').attr({src: '../images/mobile/a_txt_22.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/a_txt_32.png'});

			TweenMax.set('.ch_pagename', {y: 0});
		}else if(currentId == 2){
			TweenMax.to('.section_03', 0.7, {y: 0});
			TweenMax.to('.section_04', 0.7, {y: 626});

			$('.ch_explain img').attr({src: '../images/mobile/a_txt_22.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/a_txt_32.png'});
		}else if(currentId == 3){
			TweenMax.to('.section_04', 0.7, {y: 0});
			TweenMax.to('.section_05', 0.7, {y: 626});

			$('.ch_explain img').attr({src: '../images/mobile/a_txt_23.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/a_txt_33.png'});
		}else if(currentId == 4){
			TweenMax.to('.section_05', 0.7, {y: 0});

			$('.ch_explain img').attr({src: '../images/mobile/a_txt_24.png'});
			$('.ch_pagename img').attr({src: '../images/mobile/a_txt_34.png'});
		}
		// if(currentId == 0){
		// 	TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 563, ease: Power2.easeOut});
		// 	TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 600, ease: Power2.easeOut});

		// 	$('.ch_explain img').attr({src: '../images/mobile/a_txt_21.png'});
		// 	$('.ch_pagename img').attr({src: '../images/mobile/b_txt_31.png'});

		// 	TweenMax.set('.ch_pagename', {y: -3});
		// }else if(currentId == 1){
		// 	TweenMax.to($('.roll_up_dw').eq(1), 0.7, {y: 0, ease: Power2.easeOut});
		// 	TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});
			
		// 	$('.ch_explain img').attr({src: '../images/mobile/b_txt_22.png'});
		// 	$('.ch_pagename img').attr({src: '../images/mobile/b_txt_32.png'});

		// 	TweenMax.set('.ch_pagename', {y: 0});
		// }else if(currentId == 2){
		// 	TweenMax.to($('.roll_up_dw').eq(2), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});

		// 	$('.ch_explain img').attr({src: '../images/mobile/b_txt_23.png'});
		// 	$('.ch_pagename img').attr({src: '../images/mobile/b_txt_33.png'});
		// }else if(currentId == 3){
		// 	TweenMax.to($('.roll_up_dw').eq(3), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 600, autoAlpha: 0, ease: Power2.easeInOut});

		// 	$('.ch_explain img').attr({src: '../images/mobile/b_txt_24.png'});
		// 	$('.ch_pagename img').attr({src: '../images/mobile/b_txt_34.png'});
		// }else if(currentId == 4){
		// 	TweenMax.to($('.roll_up_dw').eq(4), 0.7, {y: 0, autoAlpha: 1, ease: Power2.easeInOut});
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});

		// 	$('.ch_explain img').attr({src: '../images/mobile/b_txt_25.png'});
		// 	$('.ch_pagename img').attr({src: '../images/mobile/b_txt_35.png'});
		// }else if(currentId == 5){
		// 	TweenMax.to($('.visual'), 0.7, {y: -420, ease: Power2.easeInOut});
		// }else if(currentId == 6){
		// 	TweenMax.to($('.visual'), 0.7, {y: -694, ease: Power2.easeInOut});
		// }else if(currentId == 7){
		// 	TweenMax.to($('.visual'), 0.7, {y: 0, ease: Power2.easeInOut});
		// }

	}

	$('.a_visual').on('mousewheel', function(e){
		if(e.deltaY < 0){
			a();
		}else{
			b();
		}
	});
});