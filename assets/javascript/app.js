$(document).ready(function () {
    // CONNECT THE DATABASE
    var config = {
        apiKey: "AIzaSyAcb5UPJcAGskECbOUazo6q6Db4x0CiAAk",
        authDomain: "employee-timesheet-9272b.firebaseapp.com",
        databaseURL: "https://employee-timesheet-9272b.firebaseio.com",
        projectId: "employee-timesheet-9272b",
        storageBucket: "",
        messagingSenderId: "994925552987"
    };
    // INITIALIZE THE DATABASE
    firebase.initializeApp(config);
    var database = firebase.database();

    // VAR
    var name = "";
    var destination = " ";
    var start = " ";
    var rate = " ";


    // BUTTON LISTENER
    $("body").on("click", "#btn-add", function () {
        event.preventDefault();
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        start = $("#start").val().trim();
        rate = $("#rate").val().trim();

        // STORES IN DATABASE
        database.ref().push({
            name: name,
            destination: destination,
            start: start,
            rate: rate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    });
    // PUSHES TO THE TABLE
    database.ref().on("child_added", function (childSnapshot) {
        var timeTrain = moment(childSnapshot.val().start, "HH:mm").subtract(1, "years");
        var timeDif = moment().diff(moment(timeTrain), "minutes");
        var trainRate = childSnapshot.val().rate;
        var timeAway = timeDif % trainRate;
        var timeNext = trainRate - timeAway;
        var time = moment().add(timeNext, "minutes");
        var arrival = moment(time).format("HH:mm");
        
        $(".table-data").prepend(
            "<tr><td>" + childSnapshot.val().name + "</td>" +
            "<td>" + childSnapshot.val().destination + "</td>" +
            "<td>" + childSnapshot.val().rate + "</td>" +
            "<td>" + timeNext + " Minutes" + "</td>" +
            "<td>" + arrival + "</td></tr>"
        );
    });

});

// 
// 
// 