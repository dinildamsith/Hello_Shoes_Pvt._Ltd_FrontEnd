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
                $("#customer_Table").empty();
                getAllCustomerSendAJAX(jwtToken)
                clearTextFields();
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
                $("#customer_Table").empty();
                getAllCustomerSendAJAX(jwtToken)
                clearTextFields();
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
                $("#customer_Table").empty();
                getAllCustomerSendAJAX(jwtToken)
                clearTextFields();
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
const getAllCustomerSendAJAX = (jwtToken) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/customer/getAllCustomer",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
            console.log(data)
            data.forEach(customer => {
                var newRow = "<tr><th scope='row'>" + customer.customerCode + "</th><td>" + customer.customerName + "</td><td>" + customer.contactNumber + "</td><td>" + customer.email + "</td><td>" + customer.customerGender + "</td><td>" + customer.addressLine1 + "</td><td>" + customer.addressLine2 + "</td><td>" + customer.birthDay + "</td><td>" + customer.customerJoinDate + "</td><td>" + customer.level + "</td><td>" + customer.totalPoints + "</td><td>" + customer.recentPurchaseDate  + "</td></tr>";
                $("#customer_Table").append(newRow);
            });

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

//row click and get values text fields
$("#customer_Table").on("click","tr", function (){
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#customerIdTxt").val(id.eq(0).text());
    $("#customerNameTxt").val(data.eq(0).text());
    $("#custContactTxt").val(data.eq(1).text());
    $("#custEmailTxt").val(data.eq(2).text());
    $("#customerGenderOpation").val(data.eq(3).text());
    $("#custAddress1").val(data.eq(4).text());
    $("#custAddress2").val(data.eq(5).text());
    $("#custBirthday").val(data.eq(6).text());
    $("#custJoinDate").val(data.eq(7).text());
    $("#custLevel").val(data.eq(8).text());
    $("#totalPoints").val(data.eq(9).text());
    $("#recentPurchaseDate").val(data.eq(10).text());


 
});


function clearTextFields() {
    $("#customerIdTxt").val("");
    $("#customerNameTxt").val("");
    $("#custContactTxt").val("");
    $("#custEmailTxt").val("");
    $("#customerGenderOpation").val("");
    $("#custAddress1").val("");
    $("#custAddress2").val("");
    $("#custBirthday").val("");
    $("#custJoinDate").val("");
    $("#custLevel").val("");
    $("#totalPoints").val("");
    $("#recentPurchaseDate").val("");
}



document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    getAllCustomerSendAJAX(jwtToken)
});


//------------------------------------ Btn Css
