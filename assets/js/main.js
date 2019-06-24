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
  
    

    $(".categories").on("click",function(){
        
        var categoryName = ($(this).attr("category"))


        if(categoryName == "Animals"){
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



    database.ref("-Li6vJmWPUCPZGVlKj0W/Categories/").on("value",function(snapshot){
        console.log(snapshot.val());
        var category = snapshot.val().category;
        amount = snapshot.val().length;
        difficulty = snapshot.val().difficulty;
        queryURL = "https://opentdb.com/api.php?amount="+amount +"&category="+ category +"&difficulty="+ difficulty +"&type=multiple"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            results = response.results;
            console.log(amount);
           
            
            
                for(i= 0; i < amount; i++){
                    var answers = [results[i].incorrect_answers[0], results[i].incorrect_answers[1], results[i].incorrect_answers[2]]
                    var randIndex = Math.floor(Math.random() * answers.length);
                    var rs = answers.splice(randIndex, 1);
                    

                    $("#question").text(results[i].question);
                    $("#choiceA").text(results[i].correct_answer);
                    $("#choiceB").text(answers[0]);
                    $("#choiceC").text(answers[2]);
                    $("#choiceD").text(answers[1]);
                    break;
                }

               
            });










    
          
        });
    });
    
    

    



    









    
   
    //creating categories js

    //

























