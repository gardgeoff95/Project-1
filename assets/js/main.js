$("document").ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyA45eFTNK6tPmxWAEseW3BSqNEgwpm9JmQ",
        authDomain: "project-1-f43b7.firebaseapp.com",
        databaseURL: "https://project-1-f43b7.firebaseio.com",
        projectId: "project-1-f43b7",
        storageBucket: "project-1-f43b7.appspot.com",
        messagingSenderId: "520619679344",
        appId: "1:520619679344:web:9c9addca899ebfba"
    };
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();



   

    //creating main page js

    //2 on click functions to set database calls

    $("#p1Choice").on("click", function () {

        database.ref("-Li-SK5eziAtIuM4aLJJ/playerState/p1Taken").set("yes");
    });
    $("#p2Choice").on("click", function () {
        database.ref("-Li-SK5eziAtIuM4aLJJ/playerState/p2Taken").set("yes");
    })

    //checks to see whene data changes and sets visibility to hidden;
    database.ref("-Li-SK5eziAtIuM4aLJJ/playerState").on("value", function (snap) {
        if (snap.val().p1Taken == "yes") {
            $("#p1Choice").css("visibility", "hidden");
        }
        console.log(snap.val().p2Taken);
        if (snap.val().p2Taken == "yes") {
            $("#p2Choice").css("visibility", "hidden");
        }
        
        if ((snap.val().p1Taken =="yes")&&(snap.val().p2Taken)=="yes"){
            window.location.href = "https://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches";
        }





    });


    //end main page Js



});
























