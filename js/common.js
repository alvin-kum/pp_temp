// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

//jQuery.noConflict();
!function($) {
	'use strict';

	$(function(){
		if(location.port == '9999' || location.hostname.indexOf('uxdev.etribe.co.kr') != -1){

		}else{
			initUI.setup();
		}
	});

	window.initUI = (function(){

		function setup(){

			registUI('#header', uiGnbMenu, false); //개발 전달시 사용 코드
			registUI('.snb_content_wrap', uiSubMenu, false);
			registUI('.ui_tab', uiTab, false);
			registUI('.tab_cnt', uiTabEvt, false);
			registUI('.swiper-container', uiSwiper, false);
			registUI('.faq_list_wrap', uiFaq, false);
			registUI('.tooltip_ico', uiTooltip, false);
			registUI('.floor_map_wrap', uiFloormap, false);
			registUI('.ticket_list', uiGiftHover, false);
			registUI('.news_list', uiNewsHover, false);
			registUI('.benefit_wrap', uiBenefitSlide, false);
			registUI('.course_view_list, .tour_info_wrap', uiTourViewSlide, false);
			registUI('.package_wrap_inner', uiPakageSlide, false);
			registUI('.rsv_form', uiReservStep, false);
			// registUI('.special_offers_wrap', uiReservEvent, false);
			registUI('.bx_selection_wrap', uiToggleOrder, false);
			registUI('.ui_oper_over', gameOver, false);
			registUI('.ui_glr_slide', gallerySlide, true);
			registUI('.ui_art_slide', artSlide, true);
			registUI('.room_preview_wrap', uiRoomPreviewSlide, true);
			registUI('.ui_csn_slide', casinoSlide, false);
			registUI('.ui_spa_slide', uiSpaSlide, false);
			registUI('.ui_para_slide', uiParaSlide, false);
			registUI('.ui_para_map', uiParaTooltip, false);
			registUI('.ui_cas_video', uiVideo, false);
			registUI('.event_slide_wrap', mainSlide, false);
			registUI('#footer', topBtn, false);
			/*registUI('.go_top', uiTopPosi, false);*/
			// 공통 적용
			textPlaceHolderInit(); // ie7,8 가능한 placeholder
			formControl.init();
			if(location.port == '9999' || location.hostname.indexOf('uxdev.etribe.co.kr') != -1){
				try {
					header.init(); // 개발언어로 변경시 이 부분 삭제 해야 합니다. (개발언어로 인클루드 필요.)
					footer.init(); // 개발언어로 변경시 이 부분 삭제 해야 합니다. (개발언어로 인클루드 필요.)
				}  catch(e) {}
			}

		}

		function registUI(el, fn, saveData){
			if(saveData === undefined){
				saveData = true;
			}

			var _inst;
			console.log(el)
			$(el).each(function(idx, obj){
				_inst = new fn();
				console.log(_inst)
				_inst.init(obj);
				if(saveData){
					$(el).data('_inst', _inst);
					console.log($(el).data('_inst', _inst))
				}
			});
		}

		return {
			setup: setup
		};
	})();

	window.textPlaceHolderInit = function(_selector){

		var havePlaceholder = false;
		var input = document.createElement('input');
		havePlaceholder = ('placeholder' in input);
		var selectEl;

		if(_selector && _selector.length > 0){
			selectEl = _selector.find('input[type=text], textarea, input[type=password], textarea');
		}else{
			selectEl = $('input[type=text], textarea, input[type=password], textarea');
		}

		if(!havePlaceholder){
			selectEl.each(function(idx, obj){
				var _this = $(this);
				var placeholderAttr = 'placeholder';

				var placeholderText = _this.attr(placeholderAttr);

				/*
				if(_this.val() == ''){
					_this.val(placeholderText);
				}
				*/
				if(_this.prev(".placeholder_guidetext").length <= 0){
					_this.wrap("<span class='placeholder_wrap' style='display:inline-block;position:relative'></span>");
					_this.before("<span class=\"placeholder_guidetext\"></span>");
					var prevGuideText = _this.prev(".placeholder_guidetext");
					prevGuideText.css({"position":"absolute","top":"50%","left":"10px","margin-top":"-10px"}).text(placeholderText);
					prevGuideText.hide();
					if(_this.val() == ""){
						prevGuideText.show();
					}

					prevGuideText.addClass("placeholder_text");

					_this.bind("mousedown focus", function(e){
						prevGuideText.hide();
					}).bind("blur", function(e){
						if($(this).val() == ""){
							prevGuideText.show();
						}
					});

					prevGuideText.bind("mousedown", function(e){
						$(this).hide();
						setTimeout(function(){
							_this.focus();
						}, 100);
					});
				}
				/*if(_this.prev('.placeholder_guidetext').length <= 0){
					_this.wrap('<span class="placeholder_wrap" style="display:inline-block;position:relative;"></span>');

					if(_this.hasClass('input_b')){
						_this.before('<span class="placeholder_guidetext bold"></span>');
					}else{
						_this.before('<span class="placeholder_guidetext"></span>');
					}

					var prevGuideText = _this.prev('.placeholder_guidetext');
					prevGuideText.text(placeholderText);
					prevGuideText.hide();
					if(_this.val() == ''){
						prevGuideText.show();
					}

					if(_this.css('text-align') == 'right'){
						prevGuideText.css({left: 'auto', right: 13});
					}

					prevGuideText.addClass('placeholder_text');

					_this.bind('mousedown focusin', function(e){
						if(!$(this).attr('disabled') || !$(this).attr('readonly')){
							prevGuideText.hide();
						}
					}).bind('focusout', function(e){
						if($(this).val() == ''){
							prevGuideText.show();
						}
					});

					prevGuideText.bind('mousedown', function(e){
						if(!$(this).next(input).attr('disabled') || !$(this).next(input).attr('readonly')){
							$(this).hide();
						}
						setTimeout(function(){
							_this.focus();
						}, 100);
					});
				}*/
			});
		}
	};

	var header = (function(){
		var el;

		function init(){
			el = $('#header');

			if(el.children().length <= 0){
				window.header = $.get('/inc/layout/header.html');
				window.header.done(function(data){
					el.html(data);

					setTimeout(function(){
						complete();
					}, 0);
				});
			}else{
				complete();
			}
		}

		function complete(){
			/*
			ex)

			gnb등의 header에 속한 스크립트는 header안에서 서술
			*/
			loadProperties('#header');
			var pcGnb = new uiGnbMenu();
			pcGnb.init('#header');
			$('#header').data('pcGnb', pcGnb);

		}

		return {init: init};
	})();

	var footer = (function(){
		var el;

		function init(){
			el = $('#footer');

			if(el.children().length <= 0){
				window.footer = $.get('/inc/layout/footer.html');
				window.footer.done(function(data){
					el.html(data);

					setTimeout(function(){
						complete();
					}, 0);
				});
			}else{
				complete();
			}
		}

		function complete(){
			/*
			ex)

			familysite등의 footer에 속한 스크립트는 footer안에서 서술
			*/
			loadProperties('#footer');
			var topBt = new uiTopPosi();
			topBt.init('#footer');
			$('#footer').data('topBt', topBt);
		}

		return {init: init};
	})();

	var uiGnbMenu = function(){
		var el, depth1, depth2, startTimer, elChk, utillBtn, utilList, langTxt;
		var gnbH, scrollPosi;

		function init(_el){
			el = $(_el);
			depth1 = el.find('.depth1 li a');
			depth2 = el.find('.depth2');
			utillBtn = el.find('.util_lang > a');
			utilList = el.find('.util_lang > ul > li');

			gnbH = el.height();

			bindEvetns();
		}

		function bindEvetns(){
			overEvent();
			utilEvents();
			gnbScroll();
		}

		function overEvent(){
			depth1.on('mouseenter focus', function(){
				elChk = $(this).closest('li').index();
				depth2.show();
				if(elChk === 0){
					/*$('.depth2 .gnb_list > li').first().find('>a').focus();*/
				} else {
					/*$('.depth2 .gnb_list > li').last().find('>a').focus();*/
				}
				clearMenu();
			}).on('mouseleave focusout', function(){
				closeMenu();
			});
			depth2.find('li a').on('mouseenter focus', function(){
				clearMenu();
			}).on('mouseleave focusout', function(){
				closeMenu();
			});
		}

		function closeMenu(){
			startTimer = setTimeout(function(){
				depth2.hide();
			},500);
		}

		function clearMenu(){
			clearTimeout(startTimer);
		}

		function utilEvents(){
			utillBtn.on('click', function(e){
				e.preventDefault();

				$(this).toggleClass('on');
			});

			utilList.on('click', ' > a' , function(e){
				e.preventDefault();
				langTxt = $(this).text();

				utillBtn.text(langTxt);
				utillBtn.removeClass('on');
			});
		}

		function gnbScroll(){
			$(window).on('load scroll', function(){
				scrollPosi = $(this).scrollTop();

				if( gnbH < scrollPosi ){
					el.addClass('fixed');
				} else {
					el.removeClass('fixed');
				}
			});
		}

		return{init:init}
	}

	var uiSubMenu = function(){
		var el, subBtn, subdepth2, startTimer, snsBtn, snsCloseBtn;

		function init(_el){
			el = $(_el);
			subBtn = el.find('.btn_dep');
			subdepth2 = el.find('.sub_depth > li > a');
			snsBtn = el.find('.share_wrap .btn_sns');
			snsCloseBtn = el.find('.share_wrap .close');

			bindEvents();
		}

		function bindEvents(){
			overEvents();
			snsEvent();
		}

		function overEvents(){
			subBtn.on('mouseenter focus', function(){
				subBtn.siblings('ul').stop().slideUp();
				$(this).siblings('ul').stop().slideDown();
				clearMenu();
			}).on('mouseleave focusout', function(){
				closeMenu();
			});
			subdepth2.on('mouseenter focus', function(){
				$(this).closest('ul').stop().slideDown();
				clearMenu();
			}).on('mouseleave focusout', function(){
				closeMenu();
			});
		}

		function closeMenu(){
			startTimer = setTimeout(function(){
				el.find('.depth > ul').stop().slideUp();
			},300);
		}

		function clearMenu(){
			clearTimeout(startTimer);
		}

		function snsEvent(){
			snsBtn.on('click', function(e){
				e.preventDefault();

				$(this).siblings('.bx_share').show();
			});

			snsCloseBtn.on('click', function(e){
				e.preventDefault();

				$(this).closest('.bx_share').hide();
			});

		}

		return{init:init}
	};

	// selectbox
	var SelectboxUI = function(){
		var el;
		var $text, $list, $select;
		var selectedIndex, htmlSelectList, selectListTimer = -1;

		function init(_el){
			el = $(_el);

			setup();
			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$text = el.find('> .select_result');
			$list = el.find('>ul');
			$select = el.find('>select');
			selectedIndex = -1;

			htmlSelectList = '';

			setList();

			if($select.attr('disabled')){
				el.addClass('disabled');
				$text.off('click').on('click', function(e){
					e.preventDefault();
				});

				return;
			}

			bindEvents();
		}

		function bindEvents(){
			setSelectedIndex(selectedIndex);
			$select.off('change').on('change', function(e){
				setSelectedIndex();
			});

			$text.off('click').on('click', function(e){
				e.preventDefault();

				if(!el.hasClass('active')){
					showList();
				}else{
					hideList();
				}
			});
		}

		function showList(){
			el.addClass('active');
			$list.show().css({zIndex: 10});

			$list.off('.listEvent').on('click.listEvent', '>li>a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();

				$select.get(0).selectedIndex = index;

				$select.trigger('change');
				setSelectedIndex();
				hideList();
			}).on('focusin.listEvent', function(e){
				clearTimeout(selectListTimer);

				$list.find('>li').removeClass('on');
				$(e.target).closest('li').addClass('on');
			}).on('focusout.listEvent', function(e){
				selectListTimer = setTimeout(function(){
					hideList(true);
				}, 100);
			}).on('mouseover.listEvent', function(e){
				$list.find('>li').removeClass('on');
				$(e.target).closest('li').addClass('on');
			});

			$('body').off('mousedown').on('mousedown.listEvent', function(e){
				if($(e.target).closest(el).length <= 0){
					hideList(true);
				}
			});

			$(document).off('keyup').on('keyup.listEvent', function(e){
				if(e.keyCode == 27){
					hideList();
				}
			});
		}

		function hideList(notFocus){
			el.removeClass('active');
			$list.hide().css({zIndex: 5});

			$list.off('.listEvent');
			if(!notFocus){
				$text.focus();
			}

			$('body').off('.listEvent');
			$(document).off('.listEvent');
		}

		function setList(){
			htmlSelectList += '<a href="#" class="select_result"></a>';

			htmlSelectList += '<ul class="sel_list">';

			$select.find('>option').each(function(idx, obj){
				var value = $(this).attr('value');
				if(value){
					value = ' data-value="' + value + '"';
				}else{
					value = '';
				}
				htmlSelectList += '<li><a href="#"' + value + '>' + $(this).text() + '</a></li>';


			});
			htmlSelectList += '</ul>';

			$list.remove();

			el.find('> .select_result').remove();
			el.append(htmlSelectList);

			$list = el.find('>ul');
			$text = el.find('> .select_result');

			// $list.width(el.width());

			//20161123 p-city 휴대폰인증(국제번호) 예외 처리 -  넓이 값
			if(el.hasClass('wid_auto')){
				$list.width(300);
			}else{
				$list.width(el.width());
			}
			$text.width(el.width() - 40);

			if($select.find('>option').length > 11){
				$list.css({height: 310});
			}else{
				$list.css({height: 'auto'});
			}
		}

		function setSelectedIndex(){
			if($select.length <= 0){
				selectedIndex = 0;
			}else{
				selectedIndex = $select.get(0).selectedIndex;
			}
			// $text.text($list.find('>li>a').eq(selectedIndex).text());
			//20161123 p-city 휴대폰인증(국제번호) 예외 처리
			if(el.hasClass('wid_auto')){
				var valChk = $list.find('>li>a').eq(selectedIndex).attr('data-value');
				if( valChk === undefined ){
					$text.text($list.find('>li>a').eq(selectedIndex).text());
				} else {
					$text.text('+'+$list.find('>li>a').eq(selectedIndex).attr('data-value'));
				}
			}else{
				$text.text($list.find('>li>a').eq(selectedIndex).text());
			}
			$text.attr({title: $select.attr('title')});
			$list.find('>li').removeClass('on').eq(selectedIndex).addClass('on');
		}

		function refresh(){
			setup();
		}

		return {
			init: init
			, refresh: refresh
			,setSelectedIndex:setSelectedIndex
		};
	};

	// checkbox
	var CheckboxUI = function(){
		var el;
		var $input, $text;
		var checked, disabled;

		function init(_el){
			el = $(_el);

			setup();
			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$input = el.find('input:checkbox');
			$text = el.find('label > span');

			refresh();

			bindEvents();
		}

		function bindEvents(){
			$input.on('focusin', function(e){
				$text.addClass('focus');
			}).on('focusout', function(e){
				$text.removeClass('focus');
			}).on('change', function(e){
				refresh();
			});
		}

		function refresh(){
			checked = $input.prop('checked') || $input.prop('checked') == 'checked';
			disabled = $input.prop('disabled') || $input.prop('disabled') == 'disabled';

			/*
			기본형: .checkbox_basic
			비활성: .checkbox_disabled
			체크: .checkbox_checked
			비활성체크: .checkbox_disabled_checked
			*/

			$text.removeClass('checkbox_basic checkbox_disabled checkbox_checked checkbox_disabled_checked');
			if(checked && disabled){
				$text.addClass('checkbox_disabled_checked');
			}else if(checked){
				$text.addClass('checkbox_checked');
			}else if(disabled){
				$text.addClass('checkbox_disabled');
			}else{
				$text.addClass('checkbox_basic');
			}
		}

		return {
			init: init
			, refresh: refresh
		};
	};

	// radio
	var RadioUI = function(){
		var el;
		var $input, $text, $radioSet;
		var checked, disabled;

		function init(_el){
			el = $(_el);

			setup();
			el.addClass('ui_complete');

			return this;
		}

		function setup(){
			$input = el.find('input:radio');
			$text = el.find('label > span');
			if($input.attr('name')){
				$radioSet = $('.input_radio input[name=' + $input.attr('name') + ']');
			}else{
				$radioSet = $;
			}


			refresh();

			bindEvents();
		}

		function bindEvents(){
			$input.on('focusin', function(e){
				$text.addClass('focus');
			}).on('focusout', function(e){
				$text.removeClass('focus');
			}).on('change', function(e){

				$radioSet.each(function(idx, obj){
					$(obj).data('radio').refresh();
				});
			});
		}

		function refresh(){
			checked = $input.prop('checked') || $input.prop('checked') == 'checked';
			disabled = $input.prop('disabled') || $input.prop('disabled') == 'disabled';

			/*
			기본형: .radio_basic
			비활성: .radio_disabled
			체크: .radio_checked
			비활성체크: .radio_disabled_checked
			*/

			$text.removeClass('radio_basic radio_disabled radio_checked radio_disabled_checked');
			if(checked && disabled){
				$text.addClass('radio_disabled_checked');
			}else if(checked){
				$text.addClass('radio_checked');
			}else if(disabled){
				$text.addClass('radio_disabled');
			}else{
				$text.addClass('radio_basic');
			}
		}

		return {
			init: init
			, refresh: refresh
		};
	};

	// form controls
	window.formControl = (function(){
		// var selectEl, checkEl, radioEl;

		function init(){
			// selectEl = $('.selectbox_wrap:not(.ui_complete)');
			// checkEl = $('.input_checkbox:not(.ui_complete)');
			// radioEl = $('.input_radio:not(.ui_complete)');

			initSelect();
			initCheckbox();
			initRadio();
		}

		function selectVal(id, val){
			var valueIdx;
			$(id).next().next('.sel_list').find('li').each(function(){
 				if($(this).find('a').attr('data-value') == val){
 					valueIdx = $(this).index();
 				}
			})
			$(id).next('.select_result').text($(id).next().next('.sel_list').find('>li>a').eq(valueIdx).text());
			$(id).next().next('.sel_list').find('>li').removeClass('on').eq(valueIdx).addClass('on');
		}

		function initSelect(){
			$('.selectbox_wrap.ui_complete').removeClass('ui_complete');
			$('.selectbox_wrap:not(.ui_complete)').each(function(idx, obj){
				var $obj = $(obj);
				var $select = $obj.find('select');

				var selectbox = new SelectboxUI();
				selectbox.init($obj);
				$select.data('selectbox', selectbox);
			});
		}

		function initCheckbox(){
			$('.input_checkbox:not(.ui_complete)').each(function(idx, obj){
				var $obj = $(obj);
				var $input = $obj.find('input');

				var checkbox = new CheckboxUI();
				checkbox.init($obj);
				$input.data('checkbox', checkbox);
			});
		}

		function initRadio(){
			$('.input_radio.ui_complete').removeClass('ui_complete');
			$('.input_radio:not(.ui_complete)').each(function(idx, obj){
				var $obj = $(obj);
				var $input = $obj.find('input');

				var radio = new RadioUI();
				radio.init($obj);
				$input.data('radio', radio);
			});
		}

		return {
			init: init
			,selectVal:selectVal
			, initRadio: initRadio
			, initCheckbox: initCheckbox
			, initSelect: initSelect
		}
	})();

	var uiTab = (function(){
		function init(){
			bindEvents();
		}

		function bindEvents(){
			$(document).on('click', '.ui_tab a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();
				$(this).closest('.ui_tab').find('.ui_selected').remove();
				$(this).closest('.ui_tab').find('>li').removeClass('on').eq(index).addClass('on').find('a').append('<span class="hide_txt ui_selected">선택됨</span>');
			});

			$(document).on('click', '.ui_tab_a a', function(e){
				e.preventDefault();

				var index = $(this).index();
				$(this).closest('.ui_tab_a').find('.ui_selected').remove();
				$(this).closest('.ui_tab_a').find('>a').removeClass('on').eq(index).addClass('on').append('<span class="hide_txt ui_selected">선택됨</span>');
			});
		}

		return {
			init: init
		};
	})();

	var uiTabEvt = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.find('li.on > a').append('<span class="hide_txt ui_selected">선택됨</span>');
			$('.bx_tab').not(':eq(0)').hide();
			bindEvents();
		}

		function bindEvents(){
			el.on('click', 'li > a', function(e){
				e.preventDefault();

				var index = $(this).closest('li').index();
				// el.find('li').removeClass('on');
				$(this).closest(el).find('.ui_selected').remove();
				$(this).closest(el).find('li').removeClass('on').eq(index).addClass('on').find('a').append('<span class="hide_txt ui_selected">선택됨</span>');
				$('.bx_tab').hide().eq(index).show();
			});
		}

		return {
			init: init
		};
	};

	var uiSwiper = function(){
		var el;

		function init(_el){
			el = $(_el);

			bindEvents();
		}

		function bindEvents(){

		}

		return {
			init: init
		};
	};

	//faq
	var uiFaq = function(){
		var el, elListBox, elListItem;

		function init(_el){
			el = $(_el);
			elListBox = el.find('.faq_list');
			elListItem = elListBox.find('li');

			elListItem.removeClass('on');

			bindEvents();
		}

		function bindEvents(){
			elListBox.off('click').on('click', 'li >.qu', function(e){
				e.preventDefault();
				var _thisIdx = $(this).closest('li').index();
				if($(this).closest('li').hasClass('on')){
					answerClose(_thisIdx);
				}else{
					answerOpen(_thisIdx);
				}
			});
		}

		function answerOpen(_thisIdx){
			elListBox.find('li').removeClass('on');
			elListBox.find('li').eq(_thisIdx).addClass('on');
		};

		function answerClose(){
			elListBox.find('li').removeClass('on');
		};

		return {
			init: init
		};
	};

	var uiFloormap  = function(){
		var el ,cObjP,aVal,seq;
		function init(_el){
			el = $(_el);
			cObjP = el.find('ul.box_floor li');
			bindEvents();
		}
		function bindEvents(){
			resetSta();
			cObjP.on('click','a',function(e){
				e.preventDefault();
				if(el.hasClass('ui-active')){
					//개발 aJax 처리 되는 동안  클릭을 막기위해  클래스 있음.
					return;
				}
				cObjP.removeClass('on');
				$(this).parent('li').addClass('on')

				activeDom($(this).parent('li').index(),$(this).attr('data-seq'));

				$('.info01 strong').text($(this).text()).css({
					marginLeft:20,
					opacity:0
				});
			})
		}
		function activeDom(_val,seq) {
			el.addClass('ui-active')
			//개발 aJax 처리 되는 동안  클릭을 막기위해  클래스 붙임.
			TweenMax.to($('.info01 strong'), .7, {marginLeft:0, opacity: 1 })
			var obj1 = $('ul.line_list') , obj2 = $('div.info02 span') , obj3 = $('div.img img') ;
			obj1.hide().eq(_val).delay(200).fadeIn();
			obj2.hide().eq(_val).fadeIn();
			obj3.hide().eq(_val).fadeIn();
			//개발 AJax 호출 펑션을 여기가 기술  인자는 seq 넘겨 주기
			jsFacilityChange(seq);
			//개발 aJax 완료후 ui-active 를 리무브 해야함
			el.removeClass('ui-active')
		}
		function resetSta(){
			//리셋은 바인드 될때 한번만 실행
			el.find('ul.box_floor li').removeClass('on').last().addClass('on');
			el.find('.info01 strong').text(el.find('ul.box_floor li').last().text());
			//el.find('.info01 ul.line_list', '.info02 i.ico_floor .img img').hide();

		}

		return {
			init: init
		};
	};



	var uiTooltip = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.removeClass('on');
			el.find('.tooltip_box').hide();

			bindEvents();
		}

		function bindEvents(){
			el.on('click', '>a', function(e){
				e.preventDefault();

				if($(this).closest('.tooltip_ico').hasClass('on')){
					$(this).closest(el).removeClass('on');
					$(this).next('.tooltip_box').hide();
				}else{
					$('.tooltip_ico').removeClass('on');
					$('.tooltip_ico').find('.tooltip_box').hide();
					$(this).closest(el).addClass('on');
					$(this).next('.tooltip_box').show();
				}
			});
		}

		return {
			init: init
		};
	};

	var uiToggleOrder = function(){
		var el;

		function init(_el){
			el = $(_el);

			el.removeClass('open');

			bindEvents();
		}

		function bindEvents(){
			el.on('click', '.btn_select_product', function(e){
				e.preventDefault();

				if($(this).closest(el).hasClass('open')){
					$(this).closest(el).removeClass('open');
				}else{
					$(this).closest(el).addClass('open');
				}
			});
		}

		return {
			init: init
		};
	};

	var uiGiftHover = function(){
		var el, elBox;

		function init(_el){
			el = $(_el);
			elBox = el.find('ul');

			elBox.find('li').removeClass('on');

			bindEvents();
		}

		function bindEvents(){
			elBox.on('mouseover focus', 'li > .btn_select', function(){
				elBox.find('li').removeClass('on');
				$(this).closest('li').addClass('on');
			}).on('blur', 'li > .btn_select', function(){
				elBox.find('li').removeClass('on');
			});

			elBox.on('mouseout', 'li > .abox', function(){
				elBox.find('li').removeClass('on');
			});
		}

		return {
			init: init
		};
	}

	var uiNewsHover = function(){
		var el, elBox;

		function init(_el){
			el = $(_el);
			elBox = el.find('ul');

			elBox.find('li').removeClass('on').attr({tabindex:0});

			bindEvents();
		}

		function bindEvents(){
			elBox.on('mouseenter focus', '>li', function(){
				elBox.find('li').removeClass('on');
				$(this).addClass('on');
			}).on('mouseleave', '>li', function(){
				elBox.find('li').removeClass('on');
			});
		}

		return {
			init: init
		};
	}

	var uiBenefitSlide = function(){
		var el, elList, elBox, elItem, elWidth, elLen;

		function init(_el){
			el = $(_el);
			elList = el.find('.benefit_list')
			elBox = elList.find('>ul');
			elItem = elBox.find('>li');
			elWidth = elItem.width();
			elLen = elItem.length;

			elBox.css({width:elWidth * elLen});

			el.find('.controller > a').remove();
			if(elLen <= 1){
				el.find('.controller').hide();
			}else{
				for(var i = 1; i <= elLen; i++){
					el.find('.controller').append('<a href="#" class=""><span class="hide_txt">'+i+'번째 페이지</span></a>');
				}

				el.find('.controller > a').eq(0).addClass('on').append('<span class="hide_txt ui_selItem">선택됨</span>');
				el.find('.controller > a').not(':eq(0)').css({marginLeft:6})
			}

			bindEvents();
		}

		function bindEvents(){
			el.on('click', '.controller > a', function(e){
				e.preventDefault();
				var benefitIdx = $(this).index();

				elBox.stop().animate({marginLeft:-elWidth * benefitIdx});
				// TweenMax.to(elBox, 300, {marginLeft:-elWidth * benefitIdx})
				el.find('.controller > a').removeClass('on');
				el.find('.controller > a >.ui_selItem').remove();
				$(this).addClass('on');
				$(this).append('<span class="hide_txt ui_selItem">선택됨</span>')
			});
		}

		return {
			init: init
		};
	};



	var uiPakageSlide = function(){
		var el, elList, elControll, elBox, elItem, elWidth, elLen, currentId, listMargin;

		function init(_el){
			el = $(_el);
			elList = el.find('.package_list');
			elControll = el.find('.btn_controll');
			elBox = elList.find('>ul');
			elItem = elBox.find('>li');
			elWidth = elItem.width();
			elLen = elItem.length;

			currentId = 0;

			setup();
		}

		function setup(){
			if($('.benefit_list').length > 0){
				listMargin = 12;
				if(elLen <= 2){
					elControll.find('.btn_prev').addClass('off');
					elControll.find('.btn_next').addClass('off');
				}
			}else{
				listMargin = 22
				if(elLen <= 4){
					elControll.find('.btn_prev').addClass('off');
					elControll.find('.btn_next').addClass('off');
				}
			}

			elBox.css({width:(elWidth+listMargin) * elLen});

			bindEvents();
		}

		function bindEvents(){
			elControll.on('click', '.btn_prev', function(e){
				e.preventDefault();
				if(currentId > 0){
					currentId--;
					moveRolling();
				}
			});

			elControll.on('click', '.btn_next', function(e){
				e.preventDefault();
				if($('.benefit_list').length > 0){
					if(currentId < (elLen/2)-1){
						currentId++;
						moveRolling();
					}
				}else{
					if(currentId < elLen-4){
						currentId++;
						moveRolling();
					}
				}
			});
		}

		function moveRolling(){
			if($('.benefit_list').length > 0){
				elBox.stop().animate({marginLeft: -currentId * (elList.width()+listMargin)});
				if(currentId >= (elLen/2)-1){
					elControll.find('.btn_prev').removeClass('off');
					elControll.find('.btn_next').addClass('off');
				}
				else if(currentId <= 0){
					elControll.find('.btn_next').removeClass('off');
					elControll.find('.btn_prev').addClass('off');
				}
				else{
					elControll.find('.btn_next').removeClass('off');
					elControll.find('.btn_prev').removeClass('off');
				}
			}else{
				elBox.stop().animate({marginLeft: -currentId * (elWidth+listMargin)});
				if(currentId >= elLen-4){
					elControll.find('.btn_prev').removeClass('off');
					elControll.find('.btn_next').addClass('off');
				}
				else if(currentId <= 0){
					elControll.find('.btn_next').removeClass('off');
					elControll.find('.btn_prev').addClass('off');
				}
				else{
					elControll.find('.btn_next').removeClass('off');
					elControll.find('.btn_prev').removeClass('off');
				}
			}
		}

		return {
			init: init
		};
	};

	var uiTourViewSlide = function(){
		var el, elList, elPrev, elNext, elBox, elItem, elWidth, elLen, currentId;

		function init(_el){
			el = $(_el);
			elList = el.find('.course_list_wrap, .tour_slide');
			elPrev = el.find('.btn_prev');
			elNext = el.find('.btn_next');
			elBox = elList.find('>ul');
			elItem = elBox.find('>li');
			setTimeout(function(){
				elWidth = elItem.width();
			},10);

			elLen = elItem.length;

			currentId = 0;

			setup();
		}

		function setup(){
			elBox.css({width:elWidth * elLen});
			if(elLen <= 1){
				elPrev.hide();
				elNext.hide();
			}

			bindEvents();
		}

		function bindEvents(){
			el.on('click', '.btn_prev', function(e){
				e.preventDefault();
				if(currentId > 0){
					currentId--;
					moveRolling();
				}
			});

			el.on('click', '.btn_next', function(e){
				e.preventDefault();

				if(currentId < elLen-1){
					currentId++;
					moveRolling();
				}
			});
		}

		function moveRolling(){

			elBox.stop().animate({marginLeft: -currentId * elWidth});
			if(currentId >= elLen-1){
				elPrev.show();
				elNext.hide();
			}
			else if(currentId <= 0){
				elNext.show();
				elPrev.hide();
			}
			else{
				elNext.show();
				elPrev.show();
			}

		}

		return {
			init: init
		};
	};

	var uiRoomPreviewSlide = function(){
		var el, itemList, btnNext, btnPrev;
		var tabEl, tabIdx, slideBox ,slideBox01, slideBox02, slideBox03, slideCurrentBox, mouseOutChk, mouseOutChk;
		var itemSize, itemIdx, viewItem, itemLength, itemLength01 ,itemLength02, itemLength03, item01Size, item02Size, item03Size, slideCurrentLgt;
		var autoRolling;

		function init(_el){
			el = $(_el)
			itemList = el.find('.room_list > ul > li');
			btnNext = el.find('.next');
			btnPrev = el.find('.prev');
			itemSize = itemList.width();

			slideBox = $('.room_list > ul');
			slideBox01 = $('.room_list > ul:eq(0)');
			slideBox02 = $('.room_list > ul:eq(1)');
			slideBox03 = $('.room_list > ul:eq(2)');
			itemLength01 = $('.room_list > ul:eq(0) > li').length;
			itemLength02 =  $('.room_list > ul:eq(1) > li').length;
			itemLength03 =  $('.room_list > ul:eq(2) > li').length;

			item01Size = itemLength01 * itemSize + (itemLength01-1) * 10;
			item02Size = itemLength02 * itemSize + (itemLength02-1) * 10;
			item03Size = itemLength03 * itemSize + (itemLength03-1) * 10;

			tabEl = el.find('.room_nav > li');
			tabIdx = 0;
			itemIdx = 0;
			viewItem = 4;
			mouseOutChk = true;
			itemLength = slideBox.eq(0).find('li').length;

			bindEvents();
		}

		function bindEvents(){
			loadSet();
			tabEvent();
			clickEvents();
			overEvents();
			autoMove(itemLength);
		}

		function loadSet(){
			slideBox.hide();
			slideBox.eq(0).show();
			slideBox.eq(0).css('width',item01Size);
			slideBox.eq(1).css('width',item02Size);
			slideBox.eq(2).css('width',item03Size);
		}

		function tabEvent(){
			tabEl.find('>a').on('click', function(e){
				e.preventDefault();
				var tabLi = $(this).closest('li');
				tabIdx = tabLi.index();
				itemLength = slideBox.eq(tabIdx).find('li').length;

				tabEl.removeClass('on');
				tabLi.addClass('on');

				slideBox.hide();
				slideBox.eq(tabIdx).fadeIn(500);
				clearInterval(autoRolling);
				autoMove(itemLength);
			});
		}

		function clickEvents(){
			btnNext.on('click', function(e){
				e.preventDefault();
				var clickCurrent = tabIdx+1;
				slideCurrentBox = slideBox.eq(tabIdx);
				slideCurrentLgt = slideCurrentBox.find('li').length;

				if( itemIdx < slideCurrentLgt - 3 ){
					itemIdx++;
					rollingMove(slideCurrentBox);
				} else if( itemIdx < slideCurrentLgt - 2 ){
					tabEl.find('>a').eq(clickCurrent).trigger('click');
					clearInterval(autoRolling);
					if(clickCurrent === 3){
						clickCurrent = 0;
						tabEl.find('>a').eq(clickCurrent).trigger('click');
					}
				}
			});
			btnPrev.on('click', function(e){
				e.preventDefault();
				slideCurrentBox = slideBox.eq(tabIdx);
				slideCurrentLgt = slideCurrentBox.find('li').length;

				if( itemIdx > 0 ){
					itemIdx--;
					rollingMove(slideCurrentBox);
				} else if( tabIdx === 0 ){
					tabEl.find('>a').eq(2).trigger('click');
				} else if( tabIdx ===1 ){
					tabEl.find('>a').eq(0).trigger('click');
				} else if( tabIdx ===2 ){
					tabEl.find('>a').eq(1).trigger('click');
				}
			});
		}

		function overEvents(){
			var mouseLgtChk = slideBox.eq(tabIdx).find('li').length;

			btnNext.on('mouseenter focusin', function(){
				clearInterval(autoRolling);
			}).on('mouseleave focusout', function(){
				mouseOutChk = false;
				clearInterval(autoRolling);
				autoMove(mouseLgtChk);
			});
			btnPrev.on('mouseenter focusin', function(){
				clearInterval(autoRolling);
			}).on('mouseleave focusout', function(){
				mouseOutChk = false;
				clearInterval(autoRolling);
				autoMove(mouseLgtChk);
			});
		}

		function rlgSwich(){
			switch(tabIdx){
				case 0:
					rollingMove(slideBox01);
				break;
				case 1:
					rollingMove(slideBox02);
				break;
				case 2:
					rollingMove(slideBox03);
				break;
			}
		}

		function autoMove(itemLength){
			if(mouseOutChk){
				slideBox.css('margin-left' ,'0');
				itemIdx = 0;
			}
			mouseOutChk = true;
			autoRolling = setInterval(function(){
				itemIdx++;
				if( itemIdx >= 0 && itemIdx < itemLength -2 ){
					rlgSwich();
				}
				if(itemIdx === itemLength -2 && tabIdx === 0 ){
					tabEl.find('>a').eq(1).trigger('click');
				} else if(itemIdx === itemLength -2 && tabIdx === 1 ){
					tabEl.find('>a').eq(2).trigger('click');
				} else if(itemIdx === itemLength -2 && tabIdx === 2 ){
					tabEl.find('>a').eq(0).trigger('click');
				}
			}, 3000);
		}

		function rollingMove(rlgCurrent){
			$(rlgCurrent).stop().animate({marginLeft : -(itemSize + 10) * itemIdx });
		}

		return{
			init : init
		}
	};

	var uiReservEvent = function() {
			//$( "#datepicker" ).datepicker();
			$( "#datepicker01, #datepicker02" ).datepicker({
				dateFormat:"yy-mm-dd",
				showOn: "button",
				buttonImage: "/resource/front/images/sprite/ico_cal.png",
				buttonImageOnly: true,
				buttonText: "달력보기"
			});

			$( "#datepicker01").datepicker("option", "beforeShow", function(input, inst){
				$( "#ui-datepicker-div").addClass("topx");
				$("#ui-datepicker-div").css("bottom", $(input).offset().top + 30 +"px");
			})
			$( "#datepicker02").datepicker("option", "beforeShow", function(input, inst){
				$( "#ui-datepicker-div").addClass("topx");
				$("#ui-datepicker-div").css("bottom", $(input).offset().top - 380 +"px");
			})
			var uiReservEvent = (function(){
			var el, dateRange_min, dateRange_max, returnTimer, timer, firstDate, lastDate, $dateEl, nowDate = new Date(), $handles;
			// dateRange_min : 검색될 최소 날짜 (YYYYMMDD)
			// dateRange_min : 검색될 최대 날짜 (YYYYMMDD)
			function init(_el){
				el = $(_el);
				timer = 500;
				bindEvents();
			}

			function bindEvents(){
				setRangeSlide();
			}

			function setDate(minDate, maxDate){
				var defaultVal;

				//인자 없을때 디폴트
				if(!minDate && !maxDate) {
					maxDate = new Date(getCalcedMonthTime(nowDate, 1));
					defaultVal = [0, getDiffDate(nowDate, maxDate)];
					minDate = getDateFormatStr(nowDate, "-");
					maxDate = getDateFormatStr(maxDate, "-");
				} else {
					defaultVal = [getDiffDate(nowDate, new Date(minDate)), getDiffDate(nowDate, new Date(maxDate))];
				}
				$dateEl.find("input").eq(0).datepicker("setDate", minDate);
				$dateEl.find("input").eq(1).datepicker("setDate", maxDate);
				$("#slider-range-date").slider("option", "values", defaultVal);
				dateElemPosSet($(".ui-slider-handle").get(0));
				dateElemPosSet($(".ui-slider-handle").get(1));

			}

			function setRangeSlide(){
				var	$slider = $("#slider-range-date"),
					aftMonthTime = getCalcedMonthTime(nowDate, 6);
						// aftMonthTime : 슬라이더 max 날짜 값, getCalcedMonthTime(nowDate, 6) 에서 6이 6개월 뒤를 의미함
				$dateEl = $(".bx_graph").find(".ipt.start, .ipt.end");
				$slider.slider({
					range: true,
					min: 0,
					max: getDiffDate(nowDate, aftMonthTime),
					step: 1,
					slide: function( event, ui ) {
						var handleIdx = ui.handleIndex;
						var step = $slider.slider("option", "step");
						$('.price span').each(function(idx,obj){
							if(handleIdx == 1){
								$('.price span').not('.uiMin').removeClass('on');
								$('.price span').removeClass('uiMax');
								$('.price span').eq((ui.values[1]/step)-1).addClass('on uiMax');
							}
							if(handleIdx == 0){
								$('.price span').not('.uiMax').removeClass('on');
								$('.price span').removeClass('uiMin');
								$('.price span').eq((ui.values[0]/step)-1).addClass('on uiMin');
							}
						});
						dateElemPosSet(ui.handle);
						slideToDate(ui.handle, ui.value);
					},

					create: function(event, ui) {
						// 슬라이더 생성시 최초 실행
						$handles = $(".ui-slider-handle");
						$handles.eq(0).attr("data-index", 0);
						$handles.eq(1).attr("data-index", 1);

						$dateEl.find("input").datepicker("option", "minDate", nowDate);
						$dateEl.find("input").datepicker("option", "maxDate", "+6m");
						$dateEl.find("input").datepicker("option", "onSelect", function(){
								var selectDate = new Date($(this).val().replace(/-/g, '/')),
								index = $dateEl.find("input").index(this),
								values = $slider.slider("values"),
								backupValue = values[index],
								beforeDate;
								values[index] = getDiffDate(selectDate, nowDate);
								// 예외처리
								if(values[0] > values[1]){
									values[index] = backupValue;
									beforeDate = getDateFormatStr(new Date(getCalcedDateTime(nowDate, values[index])), "-");
									$(this).datepicker("setDate", beforeDate);
								} else {
									$slider.slider("option", "values", values);
									if(index === 0){
										dateRange_min = selectDate;
										firstDate = $('.start.ipt input').val();
										//console.log(firstDate)
									} else {
										dateRange_max = selectDate;
										lastDate = $('.end.ipt input').val();
										//console.log(lastDate)
									}
								}
								dateElemPosSet($handles.get(index));
							});
						//$handles.find(".ui-datepicker").hide();

						// 달력 아이콘 클릭시
						//- $dateEl.find("span").click(function(){
						//- 	var $dateInput = $(this).prev();
						//- 	$dateInput.focus();
						//- });
					},
					// 슬라이드 시작
					start: function(event, ui){
						var $curr_dateEl = $dateEl.eq($(ui.handle).attr("data-index"));
						stopSlide();
					},
					//슬라이드 중단
					stop: function(event, ui){
						var index = ui.handleIndex;
						var values = $slider.slider("values");
						// 값이 겹칠때 값을 변경해줌
						var value = ui.handleIndex === 0 ? (ui.values[0] === ui.values[1] ? ui.value - 1 : ui.value) : (ui.values[0] === ui.values[1] ? ui.value + 1 : ui.value)
						var stopDate = getDateFormatStr(slideToDate(ui.handle, value), "-");
						dateElemPosSet(ui.handle);
						if(index === 0){
							dateRange_min = stopDate;
						} else {
							dateRange_max = stopDate;
						}
						if(value !== ui.values[ui.handleIndex]){
							values[ui.handleIndex] = value;
							$slider.slider("option", "values", values);
						}
						startSlide(dateRange_min, dateRange_max);
					}
				});
			}
			// 달력 위치 세팅&show 함수
				function dateElemPosSet(handleEl){
					var $curr_dateEl = $dateEl.eq($(handleEl).attr("data-index"));
						$curr_dateEl.css({
						left: window.parseInt($(handleEl).css("left")) + 143 +"px"
					});
				}
				// 슬라이드시 Date 값 세팅 함수
				function slideToDate(handleEl, val) {
					var $dateInput = $dateEl.eq($(handleEl).attr("data-index")).find("input"),
						computedDate = new Date(nowDate.getTime() + val * 86400000);
						$dateInput.val(getDateFormatStr(computedDate, "-"));
					return computedDate;
				}
						// date 객체를 통해 포멧 변환
				function getDateFormatStr(date, char) {
						var month = date.getMonth() + 1,
						day = date.getDate();
						char = char || "";
						return (date.getFullYear() + char + ((month < 10 ? "0" : "") + month) + char + ((day < 10 ? "0" : "") + day));
				}
				// date에 +v 만큼 계산된 달의 time을 구함
				function getCalcedMonthTime(date, v) {
					return new Date(date).setMonth(date.getMonth() + v);
				}
				// date에 +v 만큼 계산된 일의 time을 구함
				function getCalcedDateTime(date, v) {
					return new Date(date).setDate(date.getDate() + v);
				}
				// dateT1 , dateT2 의 일 수 차이를 구함
				function getDiffDate(dateT1, dateT2) {
					return Math.abs(Math.floor((dateT1 - (dateT2 ? dateT2 : 0)) / 86400000));
				}
			function startSlide(dateRange_min, dateRange_max){
				returnTimer = setTimeout(function(){
					console.log(dateRange_min)
					console.log(dateRange_max)
				},timer);
			}
			function stopSlide(){
				clearTimeout(returnTimer);
			}
			return {
				init: init,
				setDate: setDate
			};
		})();
		uiReservEvent.init('.special_offers_wrap');
		uiReservEvent.setDate();
		// Date 세팅 예제
		// uiReservEvent.setDate("2016-12-9", "2017-1-9");
		}

	var uiReservStep = function(){
		var el, leftForm,rangeChk, stepChk;

		function init(_el){
			el = $(_el);
			leftForm = el.find('.rsv_l');
			rangeChk = el.hasClass('ui_rsv_range');
			stepChk = el.hasClass('step01')

			listOpen();
			if(rangeChk){
				setCalendar();
				setRangeSlide();
			}
		}

		function setCalendar(){
			//http://longbill.github.io/jquery-date-range-picker/ 참고해주세요
			/*$('#date-range12').dateRangePicker({
				inline:true,
				container: '#date-range12-container',
				language:'ko',
				stickyMonths: true,
				format:'YYYY.MM.DD',
				startDate: new Date(), 개발요청 [ 이전달 접근 가능 요청건 // 개발 끝나면 옵션 적용해야됨 ]
				selectForward: false,
				separator : '|',
				getValue: function()
				{
					$('#startTimestamp').val();
      				$('#endTimestamp').val();
					return $(this).val();
				},
				setValue: function(s,s1,s2)
				{
					$('#summary_date').find('div').eq(0).text(s);
					$('#summary_date').find('div').eq(1).text('('+($('.selected-days-num').text()-1)+'박)');
					jsSetCalendar(s1,s2);
				},
				maxDays: 5,
				beforeShowDay:jsCheckDays,
				alwaysOpen:true
			});*/
			$('#date-range12-container').width('100%');
			$('.month-wrapper').width('100%');
			$('.gap').hide();
			$('.month1').find('.real-today').removeClass('valid').addClass('invalid');
		}

		function setRangeSlide(){

			$( "#slider-range").slider({
				range: true,
				min: 150000,
				max: 1200000,
				step: 150000,
				slide: function( event, ui ) {

					var handleIdx = ui.handleIndex
					var step = $( "#slider-range" ).slider( "option", "step" );
					var firstPrice = ui.values[0] === 150000 ? 0 : ui.values[0] ;
					var secondPrice = ui.values[1] === 1200000 ? 10000000000 : ui.values[1] ;

					$('.price span').each(function(idx,obj){

						if(handleIdx == 1){
							$('.price span').not('.uiMin').removeClass('on');
							$('.price span').removeClass('uiMax');
							$('.price span').eq((ui.values[1]/step)-1).addClass('on uiMax');
						}
						if(handleIdx == 0){
							$('.price span').not('.uiMax').removeClass('on');
							$('.price span').removeClass('uiMin');
							$('.price span').eq((ui.values[0]/step)-1).addClass('on uiMin');
						}
					})
					jsSetPrice(firstPrice,secondPrice);
				}
			});
			// console.log($("#slider-range").val(ui.value))
			$( "#slider-range" ).slider( "values", [150000, 1200000]);
		}

		function listOpen(){
			el.find('.rsv_package_list').on('click', 'ul > li > a', function(e){
				e.preventDefault();
				var rqVal = $(this).find('.cnt').attr('data-rp-seq');
				var rqCategory = $(this).find('.cnt').attr('data-room-category');
				var rqRoomTyp = $(this).find('.cnt').attr('data-room-type');
				var rqEl = $(this).siblings('.option_select');
				var valChk = $(this).find('.cnt').is('[data-rp-seq]');

				if($(this).closest('li').find('.option_select').is(':visible')){
					el.find('.rsv_package_list ul li').removeClass('on');
					el.find('.rsv_package_list ul li .option_select').slideUp(function(){scrollResize();});
					$(".optionDetail").html("");
				}else{
					el.find('.rsv_package_list ul li').removeClass('on');
					el.find('.rsv_package_list ul li .option_select').slideUp();
					$(this).closest('li').addClass('on');
					$(this).closest('li').find('.option_select').slideDown(function(){scrollResize();});
					//개발시 console 확인
					if(valChk){
						jsLoadDetail(rqVal, rqEl);
					} else {
						jsLoadDetail(rqCategory, rqRoomTyp, rqEl);
					}
				}
				scrollResize();
			});
		}

		function scrollResize(){
			if(stepChk){
				$(".rsv_package_list.default-skin").customScrollbar("resize",true);
			}
		}

		return {
			init: init
			,listOpen:listOpen
		};
	};

	var gallerySlide = function(){
		var el, sEl_list, sEl_box, prevBtn, nextBtn, thumEl, thum_list, thumBtn;
		var itemLgh,boxSize,currentIdx, thumIdx;

		function init(_el){
			el = $(_el);
			sEl_box = el.find('.large_view');
			sEl_list = sEl_box.find('> ul > li');
			itemLgh = sEl_list.length;

			boxSize = sEl_box.width();
			prevBtn = el.find('.btn_prev');
			nextBtn = el.find('.btn_next');
			currentIdx = 0;

			thumEl = $('.small_view');
			thum_list =thumEl.find('.view_list > ul > li');
			thumBtn = thum_list.find(' > a');

			bindEvents();
		}

		function bindEvents(){
			setCss();
			btnEvent();
			thumClick();
		}

		function setCss(){
			sEl_box.css('width',boxSize);
			sEl_box.find('>ul').css('width',itemLgh*boxSize);
		}

		function slideMove(){
			sEl_box.find('ul').stop().animate({
				marginLeft : -boxSize * currentIdx
			},300);
		}

		function btnEvent(){
			prevBtn.on('click', function(e){
				e.preventDefault();
				if(currentIdx > 0){
					currentIdx--;
					slideMove();

					thumBtn.removeClass('on');
					thumBtn.eq(currentIdx).addClass('on');
				}
			});
			nextBtn.on('click', function(e){
				e.preventDefault();
				if(currentIdx < itemLgh-1){
					currentIdx++;
					slideMove();

					thumBtn.removeClass('on');
					thumBtn.eq(currentIdx).addClass('on');
				}
			});
		}

		function thumClick(){
			thumBtn.on('click', function(e){
				e.preventDefault();
				thumIdx = $(this).closest('li').index();
				currentIdx = thumIdx;

				thumBtn.removeClass('on');
				$(this).addClass('on');
				slideMove();
			});
		}

		return{
			init:init
		}
	};

	var artSlide = function(){
		var el, sEl_list, sEl_box, prevBtn, nextBtn, thumEl, thum_list, thumBtn, viewEl, indiEl;
		var itemLgh,boxSize,currentIdx, thumIdx, indiIdx, subItemLgt;

		function init(_el){
			el = $(_el);
			sEl_box = el.find('.large_view');
			viewEl = sEl_box.find(' >ul > li');
			sEl_list = viewEl.find('.sub_gallery > span');
			itemLgh = sEl_list.length;
			subItemLgt = sEl_box.find(' >ul > li').eq(0).find('span').length;
			boxSize = sEl_box.width();
			prevBtn = el.find('.btn_prev');
			nextBtn = el.find('.btn_next');
			currentIdx = 0;

			thumEl = $('.small_view');
			thum_list =thumEl.find('.view_list > ul > li');
			thumBtn = thum_list.find(' > a');

			indiEl = el.find('.controller > a');

			bindEvents();
		}

		function bindEvents(){
			indicator();
			thumClick();
			setCss();
			btnEvent();
		}

		function setCss(){
			$('.sub_gallery').css('margin-left','0');
			sEl_box.find(' >ul > li ').css('width', '0');
			sEl_box.find(' >ul > li ').css('width',boxSize);
			viewEl.find('.sub_gallery').css('width',itemLgh*boxSize);
		}

		function slideMove(){
			sEl_box.find('.sub_gallery').stop().animate({
				marginLeft : -boxSize * currentIdx
			},300);
		}

		function btnEvent(){
			prevBtn.on('click', function(e){
				e.preventDefault();
				console.log(1)
				if(currentIdx > 0){
					currentIdx--;
					slideMove();
					indiEl.removeClass('on');
					indiEl.eq(currentIdx).addClass('on');
				}
			});
			nextBtn.on('click', function(e){
				console.log(2)
				e.preventDefault();
				console.log(subItemLgt)
				if( currentIdx < itemLgh-1 && currentIdx < subItemLgt ){
					currentIdx++;
					slideMove();
					indiEl.removeClass('on');
					indiEl.eq(currentIdx).addClass('on');
				}
			});
		}

		function thumClick(){
			thumBtn.on('click', function(e){
				thumIdx = $(this).closest('li').index();
				currentIdx = thumIdx;
				subItemLgt = sEl_box.find(' >ul > li').eq(currentIdx).find('span').length;

				setCss();
				indiEl.removeClass('on');
				indiEl.eq(0).addClass('on');
				thumBtn.removeClass('on');
				$(this).addClass('on');
			});
		}

		function indicator(){
			indiEl.on('click', function(e){
				e.preventDefault();
				indiIdx = $(this).index();
				currentIdx = indiIdx;

				indiEl.removeClass('on');
				$(this).addClass('on');
				slideMove();
			});
		}

		return{
			init:init
		}
	};

	var gameOver = function(){
		var el, listItem, boxEl, detailViewEl;

		function init(_el){
			el = $(_el);
			listItem = el.find(' > ul > li');
			detailViewEl = el.find('.detail > a');

			setStyle();
			overEvent();
		}

		function setStyle(){
			el.find('.detail').css({
				'top' : '260px'
				, 'opacity' : '0'
			});
		}

		function overEvent(){
			var _this;
			listItem.on('mouseenter focus',' > a' ,  function(){
				_this = $(this).siblings('.detail');
				_this.show();
				_this.stop().animate({
					'top' : '134px'
					, 'opacity' : '1'
				});
			}).on('mouseleave focusout', function(){
				el.find('.detail').stop().animate({
					'top' : '260px'
					, 'opacity' : '0'
				});
			});
			detailViewEl.on('focus', function(){
				_this.stop().animate({
					'top' : '134px'
					, 'opacity' : '1'
				});
			}).on('focusout', function(){
				el.find('.detail').stop().animate({
					'top' : '260px'
					, 'opacity' : '0'
				});
			});
		}

		function boxMotion(boxEl){
			boxEl.stop().animate({
				'top' : '134px'
				, 'opacity' : '1'
			});
		}

		return{init:init}
	};

	var casinoSlide = function(){
		var el, itemList, itemBoxEl, currentEl, prevEl, nextEl, currentEl, listItem01, listItem02, listItem03, listItem04, listItem05 ,listItem06, indiEl;
		var totalWidth, currentIdx, itemSize, posiLeft, prevIdx, nextIdx, motionTime, itemLgt, docuW;

		function init(_el){
			el = $(_el);
			itemList = el.find('.img_area li');
			itemLgt = itemList.length;
			itemBoxEl = el.find('.img_area ul');
			currentIdx = el.find('.img_area li.on').index();
			totalWidth = itemList.eq(0).width() + itemList.eq(1).width() * 5;
			indiEl = el.find('.controller em');
			docuW = document.innerWidth || $(window).width();

			listItem01 = itemList.eq(0);
			listItem02 = itemList.eq(1);
			listItem03 = itemList.eq(2);
			listItem04 = itemList.eq(3);
			listItem05 = itemList.eq(4);
			listItem06 = itemList.eq(5);
			itemSize = [ 420 , 840 ];
			posiLeft = [ -420 , 0 , 420 ,1260 , 1680 ];
			motionTime = 1;

			bindEvents();
		}

		function bindEvents(){
			loadSet();
			clickEvent();
		}

		function loadSet(){
			itemBoxEl.css('width', totalWidth);
			itemList.eq(currentIdx-1).addClass('prev_item');
			itemList.eq(currentIdx+1).addClass('next_item');
			TweenMax.set(el.find('.img_area li.prev_item') , { left : 0})
			TweenMax.set(el.find('.img_area li.next_item') , { left : 1260})

			if( docuW <= 1280 ){
				$('.slide_wrap .img_area').css('margin-left','-200px');
			}
		}

		function clickEvent(){
			itemList.find('a').on('click', function(e){
				e.preventDefault();
				var prevIChk = $(this).closest('li').hasClass('prev_item');
				var nextIChk = $(this).closest('li').hasClass('next_item');
				itemList.removeClass('on prev_item next_item');
				$(this).closest('li').addClass('on');
				currentIdx = $(this).closest('li.on').index();
				itemList.eq(currentIdx-1).addClass('prev_item');
				itemList.eq(currentIdx+1).addClass('next_item');
				prevIdx = el.find('.img_area li.prev_item').index();
				nextIdx = el.find('.img_area li.next_item').index();
				indiEl.removeClass('on');
				indiEl.eq(currentIdx).addClass('on');

				if( currentIdx <= nextIdx && nextIChk || nextIdx === -1 && nextIChk ){
					nextMotion();
					if( currentIdx === 5 ){
						itemList.eq(0).addClass('next_item');
					}
				}
				if( currentIdx >= prevIdx && prevIChk || prevIdx === 5 && prevIChk ){
					if( currentIdx === 0 ){
						var prevChk = true;
					}
					prevMotion(prevChk);
					if( currentIdx === 5 ){
						itemList.eq(0).addClass('next_item');
					}
				}
			});
		}

		function nextMotion(){
			switch(currentIdx){
				case 0 :
					TweenMax.set( listItem02 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[2] , marginTop : 131 })

					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem01 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible' })
				break;

				case 1 :
					TweenMax.set( listItem01 , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.set( listItem02 , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 })
					TweenMax.set( listItem03 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem02 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible'})
				break;

				case 2 :
					TweenMax.set( listItem04 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem03 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible'})
				break;

				case 3 :
					TweenMax.set( listItem05 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.set( listItem06 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible'})
				break;

				case 4 :
					TweenMax.set( listItem01 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.set( listItem06 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131})

					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible'})
				break;

				case 5 :
					TweenMax.set( listItem01 , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 , visibility : 'visible' })
				break;

			}
		}

		function prevMotion(prevChk){
			switch(currentIdx){
				case 0 :
					if(!prevChk){
						TweenMax.set( listItem01 , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131})
						TweenMax.set( listItem05 , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131})
						TweenMax.set( listItem06 , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0})
					}

					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131, visibility : 'visible'})
					TweenMax.to( listItem01 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0, visibility : 'visible'})
					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131})
					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 })
				break;

				case 1 :
					TweenMax.set( listItem01 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.set( listItem06 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131, visibility : 'visible'  })
					TweenMax.to( listItem02 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131})
					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 })
				break;

				case 2 :
					TweenMax.set( listItem02 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131, visibility : 'visible'  })
					TweenMax.to( listItem03 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131})
					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 })
				break;

				case 3 :
					TweenMax.set( listItem03 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem03 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131, visibility : 'visible'  })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131})
					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 })
				break;

				case 4 :
					TweenMax.set( listItem04 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })

					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131, visibility : 'visible'  })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0})
					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131 })
				break;

				case 5 :
					TweenMax.set( listItem01 , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.set( listItem04 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.set( listItem05 , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'hidden' })
					TweenMax.set( listItem06 , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 })

					TweenMax.to( listItem01 , motionTime , { width : itemSize[0] , left : posiLeft[3] , marginTop : 131 })
					TweenMax.to( listItem06 , motionTime , { width : itemSize[1] , left : posiLeft[2] , marginTop : 0 })
					TweenMax.to( listItem04 , motionTime , { width : itemSize[0] , left : posiLeft[0] , marginTop : 131 , visibility : 'visible' })
					TweenMax.to( listItem05 , motionTime , { width : itemSize[0] , left : posiLeft[1] , marginTop : 131 , visibility : 'visible' })
					TweenMax.to( listItem02 , motionTime , { width : itemSize[0] , left : posiLeft[4] , marginTop : 131})
				break;
			}
		}

		return{
			init: init
		}
	};

	var uiParaTooltip = function(){
		var el, mapBtn;

		function init(_el){
			el = $(_el);
			mapBtn = el.find('.ico');

			clickEvent();
		}

		function clickEvent(){
			mapBtn.on('click', 'a' , function(e){
				e.preventDefault();

				if($(this).hasClass('on')){
					$('.location_box').removeClass('on');
					mapBtn.find('a').removeClass('on');
				} else {
					$('.location_box').removeClass('on');
					mapBtn.find('a').removeClass('on');
					$(this).addClass('on');
					$(this).siblings('.location_box').addClass('on');
				}
			});
		}
		return{init:init}
	};

	var uiParaSlide = function(){
		var el, slideList, prevBtn, nextBtn, indeList;
		var itemLgt, moveSize, idx, slideBox;
		function init(_el){
			el = $(_el);
			slideBox = el.find('.list > ul');
			slideList = el.find('.list > ul >li');
			nextBtn = el.find('.btn_next');
			prevBtn = el.find('.btn_prev');
			indeList = el.find('.controller > a');

			moveSize = 1120;
			itemLgt = slideList.length / 2;
			idx = 0;

			bindEvets();
		}

		function bindEvets(){
			clickEvent();
			indiCtr();
		}

		function clickEvent(){
			nextBtn.on('click', function(e){
				e.preventDefault();
				if( itemLgt-1 > idx ){
					idx++;
					slideMotion();
				}
				indiStyle();
			});
			prevBtn.on('click', function(e){
				e.preventDefault();
				if( itemLgt > idx && idx >= 1 ){
					idx--;
					slideMotion();
				}
				indiStyle();
			});
		}

		function slideMotion(){
			slideBox.stop().animate({ marginLeft : -moveSize * idx },function(){
				btnCtr();
			});
		}

		function btnCtr(){
			if( idx === 0 ){
				prevBtn.addClass('off');
				nextBtn.removeClass('off');
			} else if( idx === 4 ){
				nextBtn.addClass('off');
				prevBtn.removeClass('off');
			}  else if( itemLgt > idx ){
				prevBtn.removeClass('off');
				nextBtn.removeClass('off');
			}
		}

		function indiCtr(){
			indeList.on('click', function(e){
				e.preventDefault();
				idx = $(this).index();

				indiStyle();
				slideMotion();
			});
		}

		function indiStyle(){
			indeList.removeClass('on');
			indeList.eq(idx).addClass('on');
		}

		return{init:init}
	};

	var uiSpaSlide = function(){
		var el, slideBox, slideList, prevBtn, nextBtn, indeEl;
		var idx, listLgt, moveSize;

		function init(_el){
			el = $(_el);
			slideBox = el.find('.visual ul');
			slideList = slideBox.find(' > li');
			prevBtn = el.find('.btn_prev');
			nextBtn = el.find('.btn_next');
			indeEl = el.find('.controller > a');

			listLgt = slideList.length;
			moveSize = slideList.width();
			idx = 0;

			bindEvents();
		}

		function bindEvents(){
			clickEvent();
			indiCtr();
		}

		function clickEvent(){
			prevBtn.on('click', function(e){
				e.preventDefault();

				if( idx > 0 ){
					idx--;
					moveMotion();
				}
				indeStye();
			});
			nextBtn.on('click', function(e){
				e.preventDefault();

				if( idx < listLgt -1){
					idx++;
					moveMotion();
				}
				indeStye();
			});
		}

		function moveMotion(){
			slideBox.stop().animate({ marginLeft : -moveSize * idx });
		}

		function indiCtr(){
			indeEl.on('click', function(e){
				e.preventDefault();
				idx = $(this).index();

				indeStye();
				moveMotion();
			});
		}

		function indeStye(){
			indeEl.removeClass('on');
			indeEl.eq(idx).addClass('on');
		}
		return{init:init}
	};

	var uiTopPosi = function(){
		var el, topBtn;
		var footerTop, scrollTop, winH, docuH, scrollChk, topPosiChk, footerH;

		function init(_el){
			el = $(_el);
			topBtn = el.find('.go_top');
			footerTop = $('#footer').offset().top;
			footerH = $('#footer').height();
			winH = window.innerHeight || $(window).height();
			docuH = document.innerHeight || $(document).height();
			scrollChk = winH <= docuH;
			scrollTop = $(document).scrollTop();
			topPosiChk = docuH - winH - footerH;

			topCheck();
			clickEvent();
		}

		function clickEvent(){
			topBtn.on('click', function(e){
				e.preventDefault();

				$(window).scrollTop(0);
			});
		}

		function topCheck(){
			$(window).on('scroll load', function(){
				scrollTop = $(document).scrollTop();

				if( scrollTop > 0 && topPosiChk > scrollTop){
					topBtn.css({
						'position' : 'fixed'
						, 'bottom' : '0'
					});
				} else {
					topBtn.attr('style',true);
				}
			});
		}

		return{init:init}
	};

	var uiVideo = function(){
		var el, videoEl, btnEl, playBtn, stopBtn, btBtn;
		var docuW, docuH, btnTop, sectionTop;

		function init(_el){
			el = $(_el);
			videoEl = el.find('#video_player');
			btnEl = el.find('.btn_arr');
			playBtn = el.find('.ico_play');
			stopBtn = el.find('.ico_stop');
			btBtn = el.find('.ico_arr_casino');

			docuW = window.innerWidth || $(window).width();
			docuH = window.innerHeight || $(window).height();

			bindEvetn();
		}

		function bindEvetn(){
			widthCheck();
			videoControll();
		}

		function widthCheck(){
			$(window).on('scroll',function(){
				btnEl.removeAttr('style');
			});
			$(window).on('resize load', function(){
				docuW = window.innerWidth || $(window).width();
				docuH = window.innerHeight || $(window).height();
				btnTop = docuW <= 1280 ? 680 : 864;
				if( docuW <= 1280 ){
					videoEl.css('width', '1280px');
					if( docuH <= btnTop ){
						btnEl.css({
							'position' : 'fixed'
							, 'bottom' : '20px'
						});
					} else if( docuH  >= btnTop ){
						btnEl.removeAttr('style');
					}
				} else if ( docuW >= 1281 && docuW >= 1680 ){
					videoEl.css('width', '1680px');
					if( docuH <= btnTop ){
						btnEl.css({
							'position' : 'fixed'
							, 'bottom' : '20px'
						});
					} else if( docuH  >= btnTop ){
						btnEl.removeAttr('style');
					}
				}
			});
		}

		function videoControll(){
			playBtn.on('click', function(e){
				e.preventDefault();

				$(this).css('display','none');
				stopBtn.css('display','inline-block');
				$('#video_player')[0].play();
			});
			stopBtn.on('click', function(e){
				e.preventDefault();

				$(this).css('display','none');
				playBtn.css('display','inline-block');
				$('#video_player')[0].pause();
			});
			btBtn.on('click', function(e){
				e.preventDefault();
				sectionTop = $('.wrap_cont').offset().top;

				$('html,body').animate({ scrollTop : sectionTop });
			});
		}

		return{init:init}
	};

	var mainSlide = function(){
		var el, prevBtn, nextBtn, list, slideBox;
		var idx, listLgt, moveSize, boxSize;

		function init(_el){
			el = $(_el);
			prevBtn = el.find('.prev');
			nextBtn = el.find('.next');
			slideBox = el.find('ul');
			list = el.find('ul li');

			idx = 0;
			listLgt = el.find('ul li').length;
			moveSize = -285;
			boxSize = (listLgt * 285) -20;

			slideBox.css('width',boxSize);
			bindEvents();
		}

		function bindEvents(){
			clickEvents();
		}

		function clickEvents(){
			nextBtn.on('click', function(e){
				e.preventDefault();

				if( listLgt-5 >= idx ){
					idx++;
					motion();

					if ( idx < listLgt-4 ){
						prevBtn.find('img').attr('src', prevBtn.find('img').attr('src').replace('_off','_on'));
					}else if( idx === listLgt-4 ){
						nextBtn.find('img').attr('src', nextBtn.find('img').attr('src').replace('_on','_off'));
					}
				}
			});
			prevBtn.on('click', function(e){
				e.preventDefault();

				if( idx > 0 ){
					idx--;
					motion();
					if( idx === 0 ){
						prevBtn.find('img').attr('src', prevBtn.find('img').attr('src').replace('_on','_off'));
					}else if ( idx < listLgt-4 ){
						nextBtn.find('img').attr('src', nextBtn.find('img').attr('src').replace('_off','_on'));
					}
				}
			});
		}

		function motion(){
			slideBox.stop().animate({ marginLeft : moveSize * idx });
		}

		return {init:init}
	};

	var topBtn = function(){
		var el, topBtn;
		var windowH, visualH, scrollPosi, scrollTop, footerTop;

		function init(_el){
			el = $(_el);
			topBtn = el.find('.btn_go_top');

			windowH = window.innerHeight || $(window).height();
			visualH = $('.scene_01').height();
			scrollPosi = visualH - windowH;
			footerTop = $(document).height() - windowH - el.height();
			$('.btn_more').on('click', function(e){
				setTimeout(function(){
					footerTop = $(document).height() - windowH - el.height();
				},1000);
			});
			scrollEvents();
		}

		function scrollEvents(){
			$(window).on('load scroll', function(){
				scrollTop = $(this).scrollTop();
				console.log(scrollTop)
				console.log(footerTop)
				if( windowH < visualH ){
					if( scrollTop > scrollPosi ){
						$('.go_top').css({
							'position' : 'fixed'
							, 'bottom' : '0'
						});
						if( scrollTop > footerTop){
							$('.go_top').removeAttr('style');
						};
					} else {
						$('.go_top').removeAttr('style');
					}
				}
			});
		}

		return{init:init}
	};

}(jQuery);

jQuery(function($) {
	jQuery.fn.selectVal = function(val) {
		var valueIdx;
		$(this).next().next('.sel_list').find('li').each(function(){
			if($(this).find('a').attr('data-value') == val){
				valueIdx = $(this).index();
			}
		});
		$(this).next('.select_result').text($(this).next().next('.sel_list').find('>li>a').eq(valueIdx).text());
		$(this).next().next('.sel_list').find('>li').removeClass('on').eq(valueIdx).addClass('on');
		$(this).val(val)
	}
});
function autoCheck(name, val){
	var value = val
	$('input[name='+name+']').each(function(){
		var checkVal = $(this).attr('value');
		if(val == checkVal){
			$(this).trigger('click');
		}
	});
}

//로딩바 append
function lodingLoad(){
	var el = $('body');
	var el_loading = '<div class="loding_bar"><div class="dimm" style="display:block"></div><span class="loding" style="position:absolute;top:50%;left:50%;z-index:100;margin:-26px 0 0 -60px"><img src="/resource/front/images/common/loading.gif" alt="">로딩바</span></div>';

	el.append(el_loading)

}
//로딩바 remove
function lodingClose(){
	$('.loding_bar').remove();
}

// 개발 함수 에러 방지용 ( 프로퍼티 )
function jsSetCalendar(test1,test2){

}
function uiFloormap(test1){

}

function jsLoadDetail(test1, test2, test3){

}

function jsSetPrice(test1, test2){

}

//슬라이드 섬네일 추가
function slideThum(){
	var el, thumList, pane, paneScroll;
	var listLgt, scrollW, moveSize, thisIdx;

	el = $('.scroll-pane');

	listLgt = $('.view_list ul li').length;
	scrollW = (($('.view_list ul li').width() + 20) * listLgt) - 20;

	$('.view_list ul').css('width',scrollW);

	el.jScrollPane();
	paneScroll = el.data('jsp');
	$('.jspTrack').css('width',scrollW);

	$('.view_list ul li').find('a').on('click', function(e){
		e.preventDefault();
		moveSize = $('.view_list ul li').width() + 20;
		thisIdx = (($(this).closest('li').index()) * moveSize ) - moveSize;

		paneScroll.scrollTo(parseInt(thisIdx));
		return false;
	});
}




