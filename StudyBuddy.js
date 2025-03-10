// StudyBuddy.js

// Eric Provost
// This program uses a form to determine if someone would be a good study buddy. 
// Each time a condition that I personally determine to be a good study buddy is met, points
// are added. Each time a condition is met that I don't personally want, points are deducted.
// This is totally subjective, and based on my personal preferences. I tried to keep it as neutral
// possible though and generally inclusive :)
// Dev note: Yes, it's for a study buddy and not a friend. When I started to write this, I had "friend"
// stuck in my head for some reason, and when I finally stopped being super ADHD about it, I realized
// it was supposed to be a study buddy with friend typed about 100 times. So, fRiEnD!
// Last updated: 3/9/2025

document.addEventListener("DOMContentLoaded" , ()=>{
    // To keep track of how good of a study buddy I think they'll be
    var totalPoints = 0; 
    var redoCount = 0;

    // Declarations for information on the form
    var resultFill = document.getElementById("resultID");
    const friendName = document.getElementById("friendNameID");
    const friendContactChoice = document.getElementById("friendContactTypeID");
    const friendContactLabelWriter = document.getElementById("friendContactLabelID");
    const friendContactInput = document.getElementById("friendContactID");
    
    // Sets focus at the start to the friendName text box
    friendName.focus();

    // Massive declarations for the checkboxes for interests
    let friendInterest0 = document.getElementById("friendInterest0ID")
    let friendInterest1 = document.getElementById("friendInterest1ID")
    let friendInterest2 = document.getElementById("friendInterest2ID")
    let friendInterest3 = document.getElementById("friendInterest3ID")
    let friendInterest4 = document.getElementById("friendInterest4ID")
    const friendInterestsVars = [
        friendInterest0 , 
        friendInterest1 , 
        friendInterest2 , 
        friendInterest3 , 
        friendInterest4
    ]; // Used to iterate over the checked boxes
    var friendInterestValues = []; // Establishes the array and puts it global for use in multiple functions.

    const friendGradeLabel = document.getElementById("friendGradeLabelID");
    // More massive declarations for friend grade radio buttons
    let friendGrade40 = document.getElementById("friendGrade40ID");
    let friendGrade35 = document.getElementById("friendGrade35ID");
    let friendGrade30 = document.getElementById("friendGrade30ID");
    let friendGrade25 = document.getElementById("friendGrade25ID");
    let friendGrade20 = document.getElementById("friendGrade20ID");
    let friendGradeLow = document.getElementById("friendGradeLowID");
    const friendGradesVar = [
        friendGrade40 ,
        friendGrade35 ,
        friendGrade30 ,
        friendGrade25 ,
        friendGrade20 ,
        friendGradeLow ,
    ]; // Used to iterate over checked radio buttons
    var friendGradeValues = []; // Establishes the array and puts it global for use in multiple functions. 


    // Verification functions for text inputs
    function friendNameVer(e){
        if (friendName.value == "" || friendName.value == " "){
            inputEmptyChanger(friendName);
        }
        else{
            friendName.style.backgroundColor = "";
            friendName.style.color = "";
        }
    }

    function friendContactVer(e){
        if (friendContactInput.value == "" || friendContactInput.value == " "){
            inputEmptyChanger(friendContactInput);
        }
        else{
            friendContactInput.style.backgroundColor = "";
            friendContactInput.style.color = "";
        }
    }


    function friendContactChoiceWriter(){
        // Adds the appropriate information to the text input when the user selects a preferred contact method.
        if (friendContactChoice.value == "email"){
            friendContactLabelWriter.innerHTML = "Email Address";
            friendContactInput.placeholder = "jackryan@gmail.com";
            friendContactInput.autocomplete = "email";
        }
        else if (friendContactChoice.value == "phone"){
            friendContactChoicePhone();
        }
        else if (friendContactChoice.value == "text"){
            friendContactChoicePhone();
        }
        else if (friendContactChoice.value == "bird"){
            friendContactLabelWriter.innerHTML = "Preferred Bird Type: ";
            friendContactInput.placeholder = "African Swallow";
            friendContactInput.autocomplete = "";
        }
    }

    function friendContactChoicePhone(){
        // Separate function to avoid re-writing code
        friendContactLabelWriter.innerHTML = "Phone Number";
        friendContactInput.placeholder = "123-456-7890";
        friendContactInput.autocomplete = "tel";
    }

    function inputEmptyChanger(x){
        // Recieves x as the attribute to be modified. Example: friendNameVer sends "friendName", which is then used as "x" to modify the friendName input box. Color is changed to purple to get your attention, but stil let you read the text
        x.style.backgroundColor = "purple"
        x.style.color = "white";
        x.placeholder = "Please fill this out!"
    }

    function friendIntCheck(){
        // This function edits the friendInterestValues array to clear, and then add what is checked into the array for potential study buddy scoring.
        friendInterestValues = [];
        for (var i = 0 ; i < 5 ; i++){
            if (friendInterestsVars[i].checked){
                friendInterestValues.push(friendInterestsVars[i].value);
            }
        }
    }

    function friendGradeCheck(){
        // This function edits the friendGradeValues array to clear, and then add what is checked into the array for potential study buddy scoring.
        friendGradeValues = [];
        for (var i = 0 ; i < friendGradesVar.length ; i++){
            if (friendGradesVar[i].checked){
                friendGradeValues.push(friendGradesVar[i].value);
            }
        }
        friendGradeLabel.style.color = ""; // Returns the color to default in case the user had to redo this step
    }

    // Making the submit button not refresh the page, but still work as intended.
    const sumbitBtn = document.getElementById("submitBtnID");

    function submitBtnFx(){
        // Double verification of the text inputs, as well as verification of the grade selection
        var errorCount = 0;

        if (friendName.value == "" || friendName.value == " "){
            friendNameVer();
            errorCount += 1;
        }
        
        if (friendContactInput.value == "" || friendContactInput.value == " "){
            friendContactVer();
            errorCount += 1;
        }

        if (friendGradeValues.length === 0){
            friendGradeLabel.style.color = "purple";
            errorCount += 1;
        }

        if (friendInterestValues.length === 0){
            friendInterestValues.push("nothing"); // Adds literally nothing to the values array. Not any real purpose, I just wanted to and it was the nicest thing I could do
        }

        // Lets the user know they haven't filled the form out correctly, and cancels 
        if (errorCount > 0){
            document.getElementById("resultID").innerHTML = "Please finish the form. Mistakes are in purple!"; 
            redoCount += 1;
            return; // Stops the program from going further if there are errors.
        }


        if (friendContactChoice.value == "phone"){
            totalPoints += 1;
        }
        else if (friendContactChoice.value == "text"){
            totalPoints += 2;
        }
        else if (friendContactChoice.value == "bird" ){
            totalPoints += 3; // Because I can appreciate sarcasm
        }


        for (var i = 0 ; i < friendInterestValues.length ; i++){
            if (friendInterestValues[i] == "nothing" || friendInterestValues[i] == "sports"){
                totalPoints -= 1; // Just to keep track of which values I have no interest in
            }
            else if (friendInterestValues[i] == "outdoors"){
                totalPoints += 0; // I like outdoors, but not a lot just a little bit.
            }
            else {
                totalPoints += 1; // I like those other things a lot more. Just not more than sarcasm individually.
            }
        }

        if (friendGradeValues[0] >= 3.0){
            totalPoints += 2; // Grades are fun, but once again I appreciate sarcasm more.
        }
        else if (friendGradeValues[i] == 2.5 || friendGradeValues[i] == 2.0) {
            totalPoints += 1; // C's get degrees! (but also means they may just be better at some things than others).
        }
        else {
            totalPoints -= 3; // I'm not too good at school myself, but I don't want to teach someone things I barely have a grasp on
        }

        if (redoCount > 2){
            totalPoints -= 1;
        }
        else if(redoCount == 0){
            totalPoints += 1; // Free point for getting the 3 options filled out the first time!
        }

        // Finally determining if we would be good study buddies!
        if (totalPoints >= 6){
            resultFill.innerHTML = "We would probably be good study buddies!";
        }
        else if (totalPoints < 6 && totalPoints >= 3){
            resultFill.innerHTML = "We might be good study buddies.";
        }
        else if (totalPoints < 3){
            resultFill.innerHTML = "We will keep your resume on file. Thank you for applying.";
        }

        totalPoints = 0; // Resets the total points if the form is redone to avoid having inflated numbers.
    }
    

    // THE GRAND WALL OF EVENT LISTENERS

    // Adds event listeners to the check boxes for when a change is made.
    friendInterest0.addEventListener("change" , friendIntCheck);
    friendInterest1.addEventListener("change" , friendIntCheck);
    friendInterest2.addEventListener("change" , friendIntCheck);
    friendInterest3.addEventListener("change" , friendIntCheck);
    friendInterest4.addEventListener("change" , friendIntCheck);

    // Adds event listeners to the radio buttons for a change to add the appropriate values
    friendGrade40.addEventListener("change" , friendGradeCheck);
    friendGrade35.addEventListener("change" , friendGradeCheck);
    friendGrade30.addEventListener("change" , friendGradeCheck);
    friendGrade25.addEventListener("change" , friendGradeCheck);
    friendGrade20.addEventListener("change" , friendGradeCheck);
    friendGradeLow.addEventListener("change" , friendGradeCheck);

    // I figured out the blur issue! :D
    friendName.addEventListener("blur" , friendNameVer);
    friendContactInput.addEventListener("blur" , friendContactVer);
    sumbitBtn.addEventListener("click" , submitBtnFx);
    friendContactChoice.addEventListener("click" , friendContactChoiceWriter);
})