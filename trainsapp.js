
$(document).ready(function(){
var config = {
  apiKey: "AIzaSyDvlixhSGG238ORybhqsxPe6nZq_5TBTUs",
  authDomain: "trainshomework.firebaseapp.com",
  databaseURL: "https://trainshomework.firebaseio.com",
  projectId: "trainshomework",
  storageBucket: "",
  messagingSenderId: "576498767286"
};
firebase.initializeApp(config);
var trainData = firebase.database();

$('#submitButton').on('click', function(){
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
		nextTrainTime: nextTrainTime,
		nextTrainTimeLeft: nextTrainTimeLeft,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	}

	trainData.ref().push(newTrains);

	alert("Train successfully added!");
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

trainData.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(childSnapshot) {
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	var currentTime = moment();
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		var tRemainder = diffTime % frequency;
	
	var tMinutesTillTrain = frequency - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
});
