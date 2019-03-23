function get(id) {
	return document.getElementById(id);
}
function getDefaultSave() {
	return {
		matter: 0,
		nanites: 1,
		naniteCost: 10,
		lastTick: new Date().getTime(),
	}
}
let player = getDefaultSave();

function produce(time) {
	player.matter += player.nanites * time;
}
function gameLoop() {
	let newTime = new Date().getTime()
	let diff = (newTime - player.lastTick) / 1000;
	player.lastTick = newTime;
	produce(diff);
	update();
}
function update() {
	get("matter").innerHTML = Math.floor(player.matter);
	get("naniteCost").innerHTML = Math.floor(player.naniteCost);
	get("nanites").innerHTML = Math.floor(player.nanites);
}
function buyNanite() {
	if(player.matter >= player.naniteCost) {
		player.nanites++;
		player.matter -= player.naniteCost;
		player.naniteCost *= 1.1;
	}
}
function buyMaxNanite() {
	while(player.matter >= player.naniteCost) {
		buyNanite();
	}
}
function start() {
	setInterval(gameLoop, 33);
}
