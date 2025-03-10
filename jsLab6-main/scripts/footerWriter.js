// footerWriter.js

// Writes a footer into the html to make life easier

document.addEventListener("DOMContentLoaded" , ()=>{
    const footerID = document.getElementById("footer");

    let footerText = document.createElement("p1");
    footerID.appendChild(footerText);
    footerText.innerHTML = "Eric Provost CGS2840 &#169 2025";
});