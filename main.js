function get(id) {
	return document.getElementById(id);
}
function getDefaultSave() {
	return {
		matter: 0,
		nanites: 1,
		naniteCost: 10,
		int: 0,
		lastTick: new Date().getTime(),
		escapes: 0,
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
	if(intOnEscape() >= 1) {
		get("escape").style.display = "";
	} else {
		get("escape").style.display = "none";
	}
	get("intOnEscape").innerHTML = intOnEscape();
	if(player.escapes > 0) {
		get("overworldTab").style.display = "";
		get("internetTab").style.display = "";
	} else {
		get("overworldTab").style.display = "none";
		get("internetTab").style.display = "none";
	}
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
function intOnEscape() {
	return Math.sqrt(player.nanites/20);
}
function showTab(tabName) { //Tab switching function
	var tabs = document.getElementsByClassName('tab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = '';
			player.currentTab = tabName;
		}
		else tab.style.display = 'none';
	}
}
function escape() {
	player.matter = 0;
	player.nanites = 1;
	player.naniteCost = 10;
	player.escapes++;
}
function start() {
	setInterval(gameLoop, 33);
}
