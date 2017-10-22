function getWidth() {
	var wpx = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
	return wpx;
}

function getHeight() {
	var hpx = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	return hpx;
}

function drawNode(cxt, x, y, rpx, txt, tpx) {
	cxt.beginPath();
	cxt.arc(x, y, rpx, 0, Math.PI * 2, true);
	cxt.stroke();
	cxt.font = String(tpx) + "px sans-serif";
	cxt.fillText(txt, x - rpx / 2, y + rpx / 2);
}

function linkNode(cxt, x1, y1, x2, y2, rpx) {
	var dx = Math.abs(x1 - x2);
	var dy = Math.abs(y1 - y2);
	var ang = Math.atan2(dy, dx);
	var xmv = rpx * Math.cos(ang);
	var ymv = rpx * Math.sin(ang);
	function drawLine(cxt, x1, y1, x2, y2) {
		cxt.moveTo(x1, y1);
		cxt.lineTo(x2, y2);
		cxt.stroke();
	}
	if (x1 < x2 && y1 <= y2) {
		drawLine(cxt, x1 + xmv, y1 + ymv, x2 - xmv, y2 - ymv);
	} else if (x1 <= x2 && y1 > y2) {
		drawLine(cxt, x1 + xmv, y1 - ymv, x2 - xmv, y2 + ymv);
	} else if (x1 > x2 && y1 >= y2) {
		drawLine(cxt, x1 - xmv, y1 - ymv, x2 + xmv, y2 + ymv);
	} else {
		drawLine(cxt, x1 - xmv, y1 + ymv, x2 + xmv, y2 - ymv);
	}
}

function isDigit(x) {
	if (x === '0' || x === '1' || x === '2' || x === '3' || x === '4'
	|| x === '5' || x === '6' || x === '7' || x === '8' || x === '9') {
		return true;
	} else {
		return false;
	}
}

function build(tree, cxt, rpx, tpx, wpx) {
	var len = tree.length;
	var cur = 0;
	function dfs(layer, pxShift, unitShift) {
		while (cur < len && tree.charAt(cur) === ' ') {
			++cur;
		}
		if (isDigit(tree.charAt(cur))) {
			var end = cur;
			while (end < len && isDigit(tree.charAt(end))) {
				++end;
			}
			value = parseInt(tree.slice(cur, end));
			cur = end;
			var x = pxShift;
			var y = layer * rpx + (layer - 1) * 2 * rpx;
			drawNode(cxt, x, y, rpx, String(value), tpx);
			var left = dfs(layer + 1, pxShift - unitShift / 2, unitShift / 2);
			if (!(left === 0)) {
				linkNode(cxt, x, y, left[0], left[1], rpx);
			}
			var right = dfs(layer + 1, pxShift + unitShift / 2, unitShift / 2);
			if (!(right === 0)) {
				linkNode(cxt, x, y, right[0], right[1], rpx);
			}
			var ret = new Array(2);
			ret[0] = x;
			ret[1] = y;
			return ret;
		} else {
			++cur;
			return 0;
		}
	}
	dfs(1, wpx / 2, wpx / 2);
}

function main() {
	maxRowNode = parseInt(prompt("Please enter the maximum number of nodes one row can contain, so the program can adjust the size of nodes.", "64"));
	var wpx = getWidth() - 100;
	var hpx = getHeight() - 100;
	document.getElementById("Cvs").setAttribute("width", String(wpx));
	document.getElementById("Cvs").setAttribute("height", String(hpx));
	var cxt = document.getElementById("Cvs").getContext("2d");
	var tree = prompt("Please enter the pre-order traversal series (including the empty node) of the binary tree, sepreted by spaces.", "1 2 4 # # 5 12 # 13 # 14 15 # # # # 3 6 8 10 # # 11 # # 9 # # 7 # #");
	var r = wpx / (maxRowNode * 2);
	build(tree, cxt, r, r / 3 * 4, wpx);
}

main();
