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

    var gameDifficulty;
    $("#difficulty").on("click",function(){
        gameDifficulty = $(this).text();

    })

    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        

    })
    
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    


    var database = firebase.database();
    database.ref().set({
        player1 : "notChosen",
        player2 : "notChosen"

    
    }); 
    database.ref().push({
        questionID : 1,
        answer : false


    });
    var stateKey; 
    
    console.log(database);


    database.ref().on("child_added", function(snapshot){
        console.log(snapshot.key);
        stateKey = snapshot.key

    })


    console.log(stateKey)

    var taken = false;
    $("#p1Button").on("click",function(){
        database.ref("-LhcnYCg262fREhYvYpd").set({
            player1 : "chosen"
            

        })

        

        

      



     

        
    });















  

    






});
