$(function () {});
/* Declare Variables */
var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");

/* Array for each hour of the workday, 9am-5pm */
var planWorkday = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
];

/* Checks Local Storage  */
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
    planWorkday = workEvents;
}

$("#currentDay").text(today);

/* Creates rows that will have our block color,adds classes, adds css due to classes */
planWorkday.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adds row to container div */
	$(".container").append(row);
});

/* Colors rows based on current time, called by above function */
function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Save Event clicker on button*/
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkday[blockID].event = userEntry;

	/* Sets local storage */
	localStorage.setItem("workDay", JSON.stringify(planWorkday));
});