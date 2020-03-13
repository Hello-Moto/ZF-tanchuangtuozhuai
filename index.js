$(function(){
	let $mark = $(".mark"),
		 $box = $(".box"),
		 $title = $('.title'),
		 $closeBtn = $title.find('i');

	//浮层居中
	let winHeight = document.documentElement.clientHeight,
		 winWidth = document.documentElement.clientWidth,
		 boxWidth = $box.outerWidth(),
		 boxHeight = $box.outerHeight();
	$box.css({
		top: (winHeight - boxHeight)/2,
		left: (winWidth - boxWidth)/2
	});
	//点击关闭浮层
	$closeBtn.on('click',function () {
		$box.stop().fadeOut(200,function () {
			$mark.stop().fadeOut(200);
		})
	});

	let dragStart = function dragStart(e) {
		this.startX = e.clientX;
		this.startY = e.clientY;
		this.startLeft = parseFloat($box.css('left'));
		this.startTop = parseFloat($box.css('top'));
		//鼠标焦点丢失处理
		this.DRAG_MOVE = dragMove.bind(this);
		this.DRAG_END = dragEnd.bind(this);
		$(document).on('mousemove',this.DRAG_MOVE).on('mouseup',this.DRAG_END);
	};
	let dragMove = function dragMove(e) {
		let {startX, startY, startLeft, startTop} = this;
		let curLeft = e.clientX - startX + startLeft,
			 curTop = e.clientY - startY + startTop;
		//边界判断
		let minLeft = 0,minTop = 0,
			 maxLeft = winWidth - boxWidth,
			 maxTop = winHeight - boxHeight;
		curLeft = curLeft < minLeft ? minLeft : (curLeft > maxLeft ? maxLeft : curLeft);
		curTop = curTop < minTop ? minTop : (curTop > maxTop ? maxTop : curTop);
		$box.css({
			left: curLeft,
			top: curTop
		})
	};
	let dragEnd = function dragEnd() {
		$(document).off('mousemove',this.DRAG_MOVE).off('mouseup',this.DRAG_END);
	};
	$title.on('mousedown',dragStart);
});