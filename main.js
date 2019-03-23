function get(id) {
	return document.getElementById(id);
}
function getDefaultSave() {
	return {
		matter: 0,
		nanites: 1,
		naniteCost: 10,
		lastTick: 0,
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
}
function update() {
	get("matter").innerHTML = Math.floor(player.matter);
	get("naniteCost").innerHTML = Math.floor(player.naniteCost);
	get("nanites").innerHTML = Math.floor(player.nanites);
}
function buyNanite() {
	player.nanites++;
	player.naniteCost *= 1.1;
}
