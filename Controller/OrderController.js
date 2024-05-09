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
});
