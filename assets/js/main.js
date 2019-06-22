$("document").ready(function(){
   


    //On click functions that capture the click of category screen

    var category;
    var difficulty;
    var length;



    $("#").on("click",function(){
        //grab inner text of clickd on category and store in category var
        if (this.text == "something"){
            //api structures category by number so need to transfer that over
            category = "thisCategory"
        } //elif //elif for however many categories\


        
        //maybe need to trim/tolower/toupper dunno yet
        category = this.text();
        //make dropdown visible in css

    });
    
    $("#").on("click",function(){

        difficulty = this.text();
    });



    $("#").on("click",function(){
        length = this.text();

    });

    //making ajax call
    queryURL = "https://opentdb.com/api.php?amount="+ length + "&category=9&difficulty="+ difficulty + "";
    $.ajax({
        url: queryURL
    })

});
