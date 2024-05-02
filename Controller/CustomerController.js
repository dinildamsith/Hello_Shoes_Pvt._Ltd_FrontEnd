import {CustomerModel} from "../Model/CustomerModel.js";


var jwtToken = localStorage.getItem("jwtToken")


// Save Customer
$('#customerSaveBtn').on('click', ()=>{
    var customerId = $('#customerIdTxt').val();
    var customerName = $('#customerNameTxt').val();
    var contact= $('#custContactTxt').val();
    var mail = $('#custEmailTxt').val();
    var gender = $('#customerGenderOpation').val();
    var address1 = $('#custAddress1').val();
    var address2 = $('#custAddress2').val();
    var bod = $('#custBirthday').val();
    var joinDate = $('#custJoinDate').val();
    var level = $('#custLevel').val();


    var customerDetails = new CustomerModel(customerId,customerName,gender,joinDate,level,bod,address1,address2,contact,mail);

    var customerDetailsJson = JSON.stringify(customerDetails);




    const sendAJAX = (customerDetails,jwtToken) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/shoes/customer/save",
            contentType: "application/json",
            data: customerDetails,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
            },
            success: function(data) {
                alert("Success");
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    };
    sendAJAX(customerDetailsJson, jwtToken);

})


// Update Customer
$('#custUpdateBtn').on('click', ()=>{
    var customerId = $('#customerIdTxt').val();
    var customerName = $('#customerNameTxt').val();
    var contact= $('#custContactTxt').val();
    var mail = $('#custEmailTxt').val();
    var gender = $('#customerGenderOpation').val();
    var address1 = $('#custAddress1').val();
    var address2 = $('#custAddress2').val();
    var bod = $('#custBirthday').val();
    var joinDate = $('#custJoinDate').val();
    var level = $('#custLevel').val();


    var customerDetails = new CustomerModel(customerId,customerName,gender,joinDate,level,bod,address1,address2,contact,mail);

    var customerDetailsJson = JSON.stringify(customerDetails);




    const sendAJAX = (customerDetails,jwtToken) => {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/shoes/customer/update/"+ customerId,
            contentType: "application/json",
            data: customerDetails,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
            },
            success: function(data) {
                alert("Success");
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    };
    sendAJAX(customerDetailsJson, jwtToken);

})


// Delete Customer
$('#custDeleteBtn').on('click', ()=>{
    var customerId = $('#customerIdTxt').val();

    const sendAJAX = (jwtToken) => {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/shoes/customer/delete/"+ customerId,
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
            },
            success: function(data) {
                alert("Success");
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    };
    sendAJAX(jwtToken);

})


// Customer Search
$('#customerSearchBtn').on('click', ()=>{
    var customerId = $('#custSearchTxt').val();

    const sendAJAX = (jwtToken) => {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/shoes/customer/search/"+ customerId,
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
            },
            success: function(data) {
                alert("Success");
                console.log(data)
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    };
    sendAJAX(jwtToken);

})

// Get All Customer
const sendAJAX = (jwtToken) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/customer/getAllCustomer",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
            // Iterate over each customer in the data array
            data.forEach(customer => {
                // Create HTML for each customer row
                var newRow = "<tr><th scope='row'>" + customer.customerCode + "</th><td>" + customer.customerName + "</td><td>" + customer.contactNumber + "</td><td>" + customer.email + "</td><td>" + customer.customerGender + "</td><td>" + customer.addressLine1 + "</td><td>" + customer.birthDay + "</td><td>" + customer.customerJoinDate + "</td><td>" + customer.level + "</td><td>" + customer.totalPoints + "</td><td>" + customer.recentPurchaseDate  + "</td></tr>";
                // Append the new row to the table
                $("#customer_Table").append(newRow);
            });
            alert("Success");
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};



document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    sendAJAX(jwtToken);
});