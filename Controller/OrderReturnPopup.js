//------------------------------------------ Pop Up window Animations And Popup Control

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

// Next Return Id Set
function returnIdSet(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/order/returnNextId",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#returnIdTxt').val(data)
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
}


// Return Order Code Type After Set Order Details
$('#returnOrderCodeTxt').on('input', () => {
    let returnOrderId = $('#returnOrderCodeTxt').val();

    if (returnOrderId !== null && returnOrderId !== "") { // Check if returnOrderId is not null and not an empty string

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/shoes/order/searchOrder/"+returnOrderId,
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
            },
            success: function(data) {
                if (!data){
                    console.log("")
                }else{
                    $('#orderBuyDateTxt').val(data.purchaseDate)
                    $('#itemCodeTxt').val(data.buyItem[0].itemCode)
                    $('#itemSizeTxt').val(data.size)
                    $('#qtyTxt').val(data.qty)
                    $('#orderTotalTxt').val(data.total)
                    console.log(data)
                }

            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });

    }


});



document.addEventListener('DOMContentLoaded', function() {
    returnIdSet();
});