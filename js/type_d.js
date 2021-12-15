(function($){


	$(document).ready(function () {
		$(".header").mouseover(function () {
			$(this).find("img").attr("src", "../images/d/header_on.jpg");
		}).mouseout(function () {
			$(this).find("img").attr("src", "../images/d/header.jpg");
		})
	});


	// slide
	(function () {
		var currIdx = 0,
			$lbtn, $rbtn, $vis, $currVis, mainTween = new TweenMax(document, {}), $navBtn;

		$(function () {

			$vis = $(".vis");
			$navBtn = $(".vis_nav .nav_btn img");
			$lbtn = $(".vis_left_btn");
			$rbtn = $(".vis_right_btn");

			$lbtn.click(function () {
				if(mainTween.isActive()) { return }
				slide("left");
				currIdx = 1 - currIdx;
			});
			$rbtn.click(function () {
				if(mainTween.isActive()) { return }
				slide("right");
				currIdx = 1 - currIdx;
			});
			$(".vis_nav .nav_btn").click(function () {
				var i = $(this).index();
				var direction = i < currIdx ? "left" : i > currIdx ? "right" : "curr";
				if(direction === "curr") { return }
				slide(direction);
				currIdx = i;
			});

			function slide(direction) {
				var $elems = $vis.eq(1 - currIdx).find(".t1, .t2, .t3, .v_btn, .v_subbox");
				var vals = [{x: 320}, {x: 550}, {x: 420}, {x: 490}, {x: 380}],
					duration = [0.9, 0.7, 1, 0.9, 1.1];


				if(direction === "left"){
					TweenMax.set($vis.eq(1 - currIdx), {left:"100%"});

				}
				else {
					TweenMax.set($vis.eq(1 - currIdx), {left:"-100%"});
					for(var i = 0; i < vals.length; i++){
						vals[i].x = -vals[i].x
					}
				}
				mainTween = TweenMax.to(document, 1.1, {});
				TweenMax.to($vis.eq(currIdx), 0.6, {left:(direction === "left" ? -100 : 100) + "%"})
				TweenMax.to($vis.eq(1 - currIdx), 0.6, {left:0});

				for(var i = 0; i < $elems.length; i++){
					TweenMax.fromTo($elems[i], duration[i], vals[i], {x:0}, 0);
					if($elems.eq(i).hasClass("v_subbox")){
						TweenMax.staggerFromTo($elems.eq(i).find(".sub_item"), 0.9, {x:60}, {x:0, ease: Power2.easeOut}, 0.2);
					}
				}
				$navBtn.eq(currIdx).attr("src", "../images/d/navi_btn.png");
				$navBtn.eq(1 - currIdx).attr("src", "../images/d/nav_0" + ((1 - currIdx) + 1) + ".png");
			}
		});
		$(window).scroll(function () {
			if($(".l2.l21").attr("data-scroll") === undefined){
				if($(window).scrollTop() > 650){
					TweenMax.staggerTo($(".l2.l21 img"), 0.5, {top:0, opacity:1, ease:Power2.easeOut}, 0.2)
					$(".l2.l21").attr("data-scroll", true)
				}
			}
			if($(".l2.l22").attr("data-scroll") === undefined){
				if($(window).scrollTop() > 950){
					TweenMax.staggerTo($(".l2.l22 img"), 0.5, {top:0, opacity:1, ease:Power2.easeOut}, 0.2)
					$(".l2.l22").attr("data-scroll", true)
				}
			}
		})
	})()

})(jQuery);