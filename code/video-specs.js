$(document).ready(function() {

	$('body').prepend('<div class="video-background"></div>');

	$('.video-background').videobackground({
		videoSource: [['videos/raas_website_video.mp4', 'video/mp4'],
			['videos/raas_website_video.webm', 'video/webm'], 
			['videos/raas_website_video.ogv', 'video/ogg']], 
		poster: 'images/waasheader_overlayed.png',
		loop: true,
		loadedCallback: function() {
			$(this).videobackground('mute');
		}
	});
});