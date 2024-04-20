function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "white";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

window.onload = function() {
    openNav(); // Call the openNav function when the window is loaded
};
document.addEventListener("DOMContentLoaded", function() {
    openNav(); // Call the openNav function when the DOM content is loaded
});


window.addEventListener('DOMContentLoaded', function() {
    if (748<innerWidth) {
        openNav();
    }
});
window.addEventListener('DOMContentLoaded', function() {
    if (749<innerWidth) {
        closeNav();
    }
});
