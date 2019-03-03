var pieSizes = ['medium', 'big', 'small'];
var durations = ['big-duration', 'small-duration', 'medium-duration'];
var depths = ['big-depth', 'small-depth', 'medium-depth'];
var fallingDurations = ['small-falling', 'big-falling', 'medium-falling'];

function getTotalPies() {
	return Math.ceil(window.innerWidth / 200);
}

function getPieLeft(index) {
	var piesPerWidth = getTotalPies();
	var left = ((index % piesPerWidth) * 200) + 'px;';
	return left;
}

function getRandomIndex(maxLength) {
	return Math.floor(Math.random() * maxLength);
}

function getFallingClasses() {
	var duration = fallingDurations[getRandomIndex(fallingDurations.length)];
	return 'falling %duration'.replace('%duration', duration);
}

function getPieClasses() {
	var size = pieSizes[getRandomIndex(pieSizes.length)];
	var duration = durations[getRandomIndex(durations.length)];
	var depth = depths[getRandomIndex(depths.length)];

	return 'rotate circle %size %duration %depth'
	.replace('%size', size)
	.replace('%duration',  duration)
	.replace('%depth', depth);
}

function createElement(path) {
	var img = document.createElement('img');
	img.setAttribute('src', path);
	img.setAttribute('class', getPieClasses());
	return img;
}

function createBluePeep() {
	return createElement('bluepeep.svg');
}

function createPie() {
	return createElement('cherrypie.svg');
}

function createBeer() {
	return createElement('beer.svg');
}

function createCarnival() {
	return createElement('carnival.svg');
}

function createBeers() {
	createElements(createBeer);
}

function createPies() {
	createElements(createPie);
}

function createCarnivals() {
	createElements(createCarnival);
}

function createElements(createElement, clearPiesTimeout) {
	var totalPies = getTotalPies();
	var divPool = [];
	var usedDivs = [];
	function creator() {
		for (var i = 0; i < totalPies; i++) {
			if (Math.random() >= .5) {
				var container;
				var img;
				var shouldAppendChild = false;
				if (divPool.length > 0) {
					container = divPool.pop();
					img = container.childNodes[0];
					img.setAttribute('class', getPieClasses());
				} else {
					shouldAppendChild = true;
					container = document.createElement('span');
					img = createElement();
				}
				usedDivs.push(container);
				container.setAttribute('class', getFallingClasses());
				container.setAttribute('style', 'left:' + getPieLeft(i));

				if (shouldAppendChild) {
					container.appendChild(img);
					document.body.append(container);
				}
			}
		}
	}
	creator();
	setInterval(function() {
		console.log(document.querySelectorAll('img'));
		var toAdd = usedDivs.splice(0, totalPies);
		divPool = divPool.concat(toAdd);
		creator();
	}, 5000);
}

function startPieFall() {
	createPies();
}

function startBeerFall() {
	createBeers();
}

function startCarnivalFall() {
	createCarnivals();
}

function startBluePeepFall() {
	createElements(createBluePeep);
}

document.addEventListener("DOMContentLoaded", function () {
	startCarnivalFall();
	startBluePeepFall();
	startBeerFall();
	startPieFall();
});
