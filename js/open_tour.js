$(function(){
	var btnOpenTour = $('<div/>');
	btnOpenTour.attr({id: 'btnOpenTour'});
	btnOpenTour.css({position: 'absolute', top: 0, left: 910, width: 230, height: 100, backgroundColor: '#f00', zIndex: 1200, opacity: 0, cursor: 'pointer'});
	$('#wrap').prepend(btnOpenTour);

	var btnClose = $('<div/>');
	btnClose.attr({id: 'btnClose'});
	btnClose.css({position: 'absolute', top: 34, left: 1311, width: 41, height: 41, backgroundColor: '#f00', zIndex: 1200, opacity: 0, cursor: 'pointer'});
	$('#mot').prepend(btnClose);

	$('.mot_dimm').css({position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, background: '#000', opacity: 0.7, zIndex: 1500});
	$('#mot').css({zIndex: 100000, width: 1400, height: 850, overflow: 'hidden'});
	$('#mot').css({perspective: 2000, perspectiveOrigin: '50% top'});
	// $('.pos_r').
	$('.mot_01').css({position: 'relative', zIndex: 11});
	$('.mot_01').css({transformOrigin: '50% top'});
	$('.mot_02').css({position: 'relative', zIndex: 10, transformOrigin: '50% top'});
	$('.mot_03').css({transformOrigin: '50% top'});
	TweenMax.set('.mot_02', {y: -550});
	TweenMax.set('.mot_03', {y: -640, rotationX: -90});

	$('#btnOpenTour').on('click', function(e){
		TweenMax.set($('#mot'), {display: 'block', scale: 1.3, y: -20, autoAlpha: 0, rotation: -15});
		TweenMax.to($('#mot'), 1.5, {y: 0, scale: 0.99, autoAlpha: 1, rotation: 0, ease: Power2.easeInOut, onComplete: function(){
			$('.mot_02').off('mouseenter mouseleave').on('mouseenter', function(e){
				TweenMax.to('.mot_01', 0.7, {rotationX: 5, scaleY: 0.95, boxShadow: "0px 18px 12px rgba(0,0,0,.6)"})
			}).on('mouseleave', function(e){
				TweenMax.to('.mot_01', 0.7, {rotationX: 0, scaleY: 1, boxShadow: "0px 6px 8px rgba(0,0,0,.6)"})
			});
		}});
		$('.mot_dimm').fadeIn();
	});

	$('.mot_01').on('click', function(e){
		$('.mot_02').off('mouseenter mouseleave')
		TweenMax.to($('#mot'), 0.5, {y: 0, scale: 1, autoAlpha: 1, rotation: 0, ease: Power2.easeInOut});
		TweenMax.to('.mot_01', 0.7, {rotationX: 90, scaleY: 0.8, ease: Power2.easeOut})
		TweenMax.to('.mot_02', 1.2, {y: -640, ease: Power2.easeOut});
		TweenMax.to('.mot_03', 1, {delay: 0.65, y: -640, rotationX: 0, ease: Back.easeOut, onComplete: function(){
			$('#mot').on('click.btn_close', function(e){
				TweenMax.to($('#mot'), 0.5, {y: 20, autoAlpha: 0});
				$('.mot_dimm').fadeOut();
				setTimeout(function(){
					$('#mot').off('.btn_close');
					TweenMax.set('#mot', {rotationX: 0, scaleY: 1});
					TweenMax.set('.mot_01', {rotationX: 0, scaleY: 1});
					TweenMax.set('.mot_02', {y: -550});
					TweenMax.set('.mot_03', {y: -640, rotationX: -90});
					motScrollId = 0;
					TweenMax.to($('#mot'), 0, {scrollTop: motScrollId*100});
					$('.mot_02').addClass('shadow');
				}, 500);
			});
		}});
		$('.mot_02').removeClass('shadow');

		TweenMax.set('.mot_04', {y: -640});
		TweenMax.set('.mot_05', {y: -640});


		// var tm = new TimelineMax({paused: true});
		// tm.add(TweenMax.to('#mot', 0.2, {y: 0}))
		// tm.add(TweenMax.to('#mot', 0.4, {y: -30}))
		// tm.add(TweenMax.to('#mot', 0.7, {y: 0, ease: Back.easeOut}))
		// tm.play();
		// TweenMax.to('.mot_02', 0.7, {delay: 0.7, rotationX: 0, ease: Back.easeOut})
		// setTimeout(function(){
		// 	$('.mot_01').removeClass('shadow');
		// }, 700);
	});
	
	var motScrollId = 0;
	$('#mot').on('mousewheel', function(e){
		console.log(motScrollId);
		if(e.deltaY < 0){
			motScrollId++;
		}else{
			motScrollId--;
		}

		if(motScrollId <= 0){
			motScrollId = 0;
		}

		if(motScrollId >= 16){
			motScrollId = 16;
		}

		TweenMax.to($('#mot'), 0.5, {scrollTop: motScrollId*100});
	});

	$('#btnClose').on('click', function(e){
		TweenMax.to($('#mot'), 0.5, {y: 20, autoAlpha: 0});
		$('.mot_dimm').fadeOut();
	});
	
	
});