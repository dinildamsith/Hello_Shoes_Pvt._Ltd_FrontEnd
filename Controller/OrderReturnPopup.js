// Pop Up window Animations And Popup Control

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("orderReturnBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    setTimeout(function() {
        modal.classList.add("show");
        document.querySelector(".modal-content").classList.add("show");
    }, 10); // Small delay to ensure display:block is applied
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.classList.remove("show");
    document.querySelector(".modal-content").classList.remove("show");
    setTimeout(function() {
        modal.style.display = "none";
    }, 500); // Match the transition duration
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        document.querySelector(".modal-content").classList.remove("show");
        setTimeout(function() {
            modal.style.display = "none";
        }, 500); // Match the transition duration
    }
}


// -----------------------------------------------------------------------------------------------

// Return Date Set TextFiled
var currentDate = new Date();
var formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
document.getElementById('returnDateTxt').value = formattedDate;