$(document).ready(function(){
	$("#derp").on("click", function(){
		chrome.tabs.create({"url": "https://minecraft.novaskin.me/gallery/tag/derp"});
	})
})