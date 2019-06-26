$("document").ready(function () {
    var player;

    
 
    


    if (localStorage.getItem("player") != null) {
        player = localStorage.getItem("player");
        console.log(player);
    }
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
    function setState(player, state) {
        database.ref("-Li-SK5eziAtIuM4aLJJ/playerState/p" + player + "Taken").set(state);

    }
    //2 on click functions to set database calls

    $("#p1Choice").on("click", function () {

        setState(1, "yes");
        localStorage.setItem("player", "1");
    });
    $("#p2Choice").on("click", function () {
        setState(2, "yes");
        localStorage.setItem("player", "2");
    })

    //checks to see whene data changes and sets visibility to hidden;
    database.ref("-Li-SK5eziAtIuM4aLJJ/playerState").on("value", function (snap) {
        if (snap.val().p1Taken == "yes") {
            $("#p1Choice").css("visibility", "hidden");
            $(".playerButton").css("border", "none");

        }

        //makes buttons dissapear on click

        console.log(snap.val().p2Taken);
        if (snap.val().p2Taken == "yes") {
            $("#p2Choice").css("visibility", "hidden");
            $("#p2Choice").css("border", "none");
        }


        if ((snap.val().p1Taken == "yes") && (snap.val().p2Taken) == "yes") {
            window.location.href = "category.html"
            console.log(window.location.href);
            setState(1, "no");
            setState(2, "no");



        }







    });


    //end main page JS
    //start category JS

    //on click functions that sets the category/difficulty/length of the game within the database for later API calls

    $(".category").on("click", function () {


        var categoryName = ($(this).attr("category"))
        console.log(categoryName);


        if (categoryName == "politics") {
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(24);

        } else if (categoryName == "history") {
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(23);
        } else if (categoryName == "genKnowledge") {
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(9);
        } else if (categoryName == "comps") {
            database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/category").set(18);

        }




    });






    $(".diffButtonss").on("click", function () {

        database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/difficulty").set($(this).text());

    })

    $(".questionAmount").on("click", function () {
        var button = this;

        database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/length").set($(this).text());

    })



    $("#categorySubmit").on("click", function () {
        window.location.href = "index.html"
    });
    //end category JS

    //start questions JS
    

    //building the API call with what we answered on the previous screen
    database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/").on("value", function (snapshot) {
        console.log(snapshot.val());
        category = snapshot.val().category;
        amount = snapshot.val().length;
        difficulty = snapshot.val().difficulty;
        queryURL = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty + "&type=multiple"



        
        var p1Right = 0;
        var p2Right = 0;

        var p1Correct = false;
        var p2Correct = false;



        $(".choiceButton").on("click", function () {


            var isCorrect = $("span", this).attr("answer");
            console.log(isCorrect);

            if (player == 1) {
                if (isCorrect == "correct") {
                    p1Correct = true;
                }




            } else if (player == 2) {
                if (isCorrect == "correct") {
                    p2Correct = true;
                }

            }


        });


        var questionCounter = 0;



        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            results = response.results;
            console.log(results.length);
            var questionArray = []


            for (i = 0; i < results.length; i++) {
                questionArray.push(results[i]);
                console.log(questionArray);

            }
            function generateQuestions(questionNumb) {

                var tempSelec = ["choiceA", "choiceB", "choiceC", "choiceD"];
                var tempQuestionOrder = []

                for (i = 0; i < 4; i++) {
                    var ri = Math.floor(Math.random() * tempSelec.length);
                    var rs = tempSelec.splice(ri, 1);
                    tempQuestionOrder.push(rs);

                }



                $("#question").html(results[questionNumb].question);
                $("#" + tempQuestionOrder[0]).html(results[questionNumb].incorrect_answers[0]).attr("answer", "incorrect");
                $("#" + tempQuestionOrder[1]).html(results[questionNumb].incorrect_answers[1]).attr("answer", "incorrect");
                $("#" + tempQuestionOrder[2]).html(results[questionNumb].incorrect_answers[2]).attr("answer", "incorrect");
                $("#" + tempQuestionOrder[3]).html(results[questionNumb].correct_answer).attr("answer", "correct");







            }
            generateQuestions(0);


            $("#submitButton").on("click", function () {
                console.log(p1Correct);
                if (player == 1) {
                    if (p1Correct == true) {
                        p1Right++;
                        database.ref("questions/p1rightanswers").set(p1Right);
                        p1Correct = false;
                    }
                }

                if (player == 2) {
                    if (p2Correct == true) {
                        p2Right++;
                        database.ref("questions/p2rightanswers").set(p2Right);
                        p2Correct = false;
                    }
                }

                if (questionCounter < results.length - 1) {
                    questionCounter++;
                } else {
                   
                    window.location.href="resultsPage.html"
                    



                   
                }
                console.log(questionCounter);
                generateQuestions(questionCounter);





            });
            
         




        });


        $("#p1answers").text(p1Right);
        $("#p2answers").text(p2Right);
      
    






       


     
    


    });
    $("#buttonResults").on("click",function(){
        database.ref("questions/showResults").set("show");
        
    });
    database.ref("questions").on("value",function(snapshot){
        $("#p1answers").text(snapshot.val().p1rightanswers);
        $("#p2answers").text(snapshot.val().p2rightanswers);
    });


    $("#reset").on("click",function(){
        database.ref("-Li-SK5eziAtIuM4aLJJ/playerState").set({
            p1Taken : "no",
            p2Taken : "no"
        });
        database.ref("-Li6vJmWPUCPZGVlKj0W/Categories").set({
            category : "null",
            difficulty : "null",
            length : "5"
        })
        database.ref("questions").set({
            p1rightanswers: 0,
            p2rightanswers: 0,
            showResults:"no"
        })
        window.location.href="mainPage.html";
        
    })






});





//end questions JS





