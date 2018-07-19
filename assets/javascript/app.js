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

        console.log("working")
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
        console.log(childSnapshot.val())
        $(".table-data").prepend(
            "<tr><td>" + childSnapshot.val().name + "</td>" +
            "<td>" + childSnapshot.val().destination + "</td>" +
            "<td>" + childSnapshot.val().start + "</td>" +
            "<td>" + childSnapshot.val().monthsWorked + "</td>" +
            "<td>" + childSnapshot.val().rate + "</td></tr>"
        );
    });

});

// 
// 
// 