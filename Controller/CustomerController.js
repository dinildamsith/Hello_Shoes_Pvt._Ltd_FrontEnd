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

