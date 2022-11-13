// Local variables

// YT Player initializer
player = new YT.Player('player', {
    // width: w,
    // height: h,
    videoId: "5lN4EAIrJNo",
    'origin': location.origin,
    playerVars: {
        'autoplay': 1,
        'origin': location.origin,
        'rel' : 0
    },
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});

// Helper for processing YTPlayer triggers
function onPlayerReady()
{
	$('#videoReadyButton').prop('disabled', false);
}

function onPlayerStateChange(ev)
{
	if (ev.data == YT.PlayerState.ENDED || ev.data == YT.PlayerState.PAUSED) {
		if (currTimeInterval) {
			clearInterval(currTimeInterval);
			currTimeInterval = null;
		}
		inPreview = false;
	}
	if (ev.data == YT.PlayerState.PLAYING) {
		currTimeInterval = window.setInterval(function() {
			$('#currentTime').val(secToTime(player.getCurrentTime()));
			if (inPreview && player.getCurrentTime() >= timeToSec($('#endTime').val()) - 0.05) {
				inPreview = false;
				player.pauseVideo();
			}
		}, 100);
		$('#backButton').prop('disabled', true);
		$('#forwardButton').prop('disabled', true);
	} else {
		$('#backButton').prop('disabled', false);
		$('#forwardButton').prop('disabled', false);
	}
	updateControls();
}