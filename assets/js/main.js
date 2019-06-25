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
    function setState(player, state){
        database.ref("-Li-SK5eziAtIuM4aLJJ/playerState/p" + player +"Taken").set(state);

    }
    //2 on click functions to set database calls

    $("#p1Choice").on("click", function () {

        setState(1,"yes");
        localStorage.setItem("player","1");
    });
    $("#p2Choice").on("click", function () {
        setState(2,"yes");
        localStorage.setItem("player","2");
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
             window.location.href = "category.html"
            console.log(window.location.href);
            setState(1,"no");
            setState(2,"no");
           
            

        }



        



    });


    //end main page JS
    //start category JS

    $(".categories").on("click",function(){
        
        var categoryName = ($(this).attr("category"))


        if(categoryName == "animals"){
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(27);

        } else if (categoryName == "sports"){
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(21);
        } else if (categoryName == "genKnowledge"){
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(9);
        } else if (categoryName == "vehicles"){
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(28);

        }

        


    });



    $(".diffButton1").on("click",function(){
     
         database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/difficulty").set($(this).text());
     
    })

    $(".quesButton1").on("click",function(){
        var button = this;
     
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/length").set($(this).text());
    
    })



    $("#submitButtonCat").on("click",function(){
        window.location.href="index.html"
    });
//end category JS

//start questions JS
database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/").on("value",function(snapshot){
    console.log(snapshot.val());
    category = snapshot.val().category;
    amount = snapshot.val().length;
    difficulty = snapshot.val().difficulty;
    queryURL = "https://opentdb.com/api.php?amount="+amount +"&category="+ category +"&difficulty="+ difficulty +"&type=multiple"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        results = response.results;
        console.log(response);
           
        
            for(i= 0; i < amount; i++){


                
                var answers = [results[i].incorrect_answers[0], results[i].incorrect_answers[1], results[i].incorrect_answers[2]];



                
                

                $("#question").text(decodeURI(results[i].question));
                $("#choiceA").text(results[i].correct_answer);
                $("#choiceB").text(answers[0]);
                $("#choiceC").text(answers[2]);
                $("#choiceD").text(answers[1]);
                break;
            }

           
        });











      
    });
    
});





//end questions JS





























