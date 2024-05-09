// Customer Ids Set
const getAllCustomerSendAJAX = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/customer/getAllCustomer",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {

            var dropdown = $('#customerCodeOption');
            data.forEach(customer => {
                dropdown.append($('<option></option>').attr('value', customer.customerCode).text(customer.customerCode));
            });
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

// Select Customer Name Set Text Field
$('#customerCodeOption').change(function() {

    var selectCustomerId = $('#customerCodeOption').val()

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/customer/search/"+ selectCustomerId,
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
           $('#customerNameTxt').val(data.customerName)
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

});

// Get All Items Ids
const getAllItems = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/allItems",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            data.forEach(items => {
                $('#itemCodeOption').append($('<option></option>').attr('value', items.itemCode).text(items.itemCode));
            });

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

// Select Item Id after item name set
$('#itemCodeOption').change(function() {

    var selectItemId = $('#itemCodeOption').val()

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/search/"+ selectItemId,
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#itemDescriptionTxt').val(data.itemDesc)
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

    // Select Item After Item Have All Sizes Set Item Option
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/selectItemSizesGet/"+ selectItemId,
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            data.forEach(items => {
                console.log(items)
                $('#sizeOption').append($('<option></option>').attr('value', items).text(items));
            });
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

});

// Purchase Date Set
function purchaseDateSet(){
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1 < 10) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
var day = (currentDate.getDate() < 10) ? '0' + currentDate.getDate() : currentDate.getDate();
var formattedDate = year + '-' + month + '-' + day;
$('#purchaseDateTxt').val(formattedDate);
}



document.addEventListener('DOMContentLoaded', function() {
    getAllCustomerSendAJAX()
    purchaseDateSet();
    getAllItems();
});
