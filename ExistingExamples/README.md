# Existing Examples

Here are some existing websites that gives a resource related to this project.

## YT-Cutter
https://ytcutter.com/

### [a](all.ytcutter.js)

#### Start / Stop time setting Logic

This logic sets the embedded `player`'s time to appropriate start / end time HTML component (#startTime, #endTime).

```javascript
$('#startButton').click(function() {
	$('#startTime').val(secToTime(player.getCurrentTime()));
	updateControls();
});
$('#startTime').bind('input', updateControls);

$('#endButton').click(function() {
	$('#endTime').val(secToTime(player.getCurrentTime()));
	updateControls();
});
$('#endTime').bind('input', updateControls);
```

And the `#duration` element gets calculated in the `updateControls()` function as well.

#### Preview button

This logic simply sets the timestamp of the embedded player & plays it.

```javascript
$('#previewButton').click(function() {
	player.seekTo(timeToSec($('#startTime').val()));
	setTimeout(function() {
		player.playVideo();
		inPreview = true;
	}, 100);
});
```