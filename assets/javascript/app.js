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
    var role = " ";
    var start = " ";
    var rate = " ";


    // BUTTON LISTENER
    $("body").on("click", "#btn-add", function () {
        event.preventDefault();
        name = $("#name").val().trim();
        role = $("#role").val().trim();
        start = moment($("#start").val().trim(), "MM/DD/YYYY").format("X");
        rate = $("#rate").val().trim();

        console.log("working")
        // STORES IN DATABASE
        database.ref().push({
            name: name,
            role: role,
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
            "<td>" + childSnapshot.val().role + "</td>" +
            "<td>" + childSnapshot.val().start + "</td>" +
            "<td>" + childSnapshot.val().monthsWorked + "</td>" +
            "<td>" + childSnapshot.val().rate + "</td>" +
            "<td>" + childSnapshot.val().amountPaid + "</td></tr>"
        );
    });

});

// 
// 
// 