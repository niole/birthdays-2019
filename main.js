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

function createElements(createElement) {
	var totalPies = getTotalPies();
	var pies = Array(totalPies).fill(null).map(function(x, i) {
		if (Math.random() >= .5) {
			var container = document.createElement('span');
			container.setAttribute('class', getFallingClasses());
			var img = createElement();
			container.appendChild(img);
			container.setAttribute('style', 'left:' + getPieLeft(i));
			document.body.append(container);
			return container;
		}
	}).filter(function (x) { return !!x; });

	setTimeout(function() {
		pies.forEach(function(pie) {
			pie.remove();
		});
	}, 10000);
}

function startPieFall() {
	createPies();
	setInterval(function() {
		createPies();
	}, 2500);
}

function startBeerFall() {
	createBeers();
	setInterval(function() {
		createBeers();
	}, 3000);
}

function startCarnivalFall() {
	createCarnivals();
	setInterval(function() {
		createCarnivals();
	}, 4000);
}

function startBluePeepFall() {
	createElements(createBluePeep);
	setInterval(function() {
		createElements(createBluePeep);
	}, 3500);
}

document.addEventListener("DOMContentLoaded", function () {
	console.log('read');
	startCarnivalFall();
	startBluePeepFall();
	startBeerFall();
	startPieFall();
});
