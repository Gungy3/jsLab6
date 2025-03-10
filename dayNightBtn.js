// dayNightBtn.js
// Serves as just a day and night button to switch for the user.
// AND IT STILL WORKS WOOOOOOOOOOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener("DOMContentLoaded" , ()=>{
    
    const styleSwitch = document.getElementById("stylesheet");

    const dayNightButton = document.getElementById("modeBTN");

    function dayNightSwitch(){
        if (dayNightButton.value == "day"){
            styleSwitch.href = "dayMode.css";
        }
        else if (dayNightButton.value == "night"){
            styleSwitch.href = "nightMode.css";
        }
    }

    dayNightButton.addEventListener("click" , dayNightSwitch);
});