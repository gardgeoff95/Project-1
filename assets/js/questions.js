$(document).ready(function () {
   
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
  
    
    database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/").on("value",function(snapshot){
        console.log(snapshot.val());

    });


    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    // });



});