import {OrderModel} from "../Model/OrderModel.js";

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

// Select Item Id after item sizE set
$('#itemCodeOption').change(function() {

    var selectItemId = $('#itemCodeOption').val()
    console.log(selectItemId)
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
                $("#sizeOption").empty();
                $('#sizeOption').append($('<option></option>').attr('value', items).text(items));
            });
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

});

$('#itemCodeOption').change(function (){
    var selectItemId = $('#itemCodeOption').val()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/search/"+ selectItemId,
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#itemDescriptionTxt').empty
            $('#itemDescriptionTxt').val(data.itemDesc)
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
})

// Purchase Date Set
function purchaseDateSet(){
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1 < 10) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
var day = (currentDate.getDate() < 10) ? '0' + currentDate.getDate() : currentDate.getDate();
var formattedDate = year + '-' + month + '-' + day;
$('#purchaseDateTxt').val(formattedDate);
}



// Order Purchase
$('#orderBuyBtn').on('click', ()=>{

    var orderId = $('#ordrCodeTxt').val();
    var date = $('#purchaseDateTxt').val();
    var customerCode = $('#customerCodeOption').val();
    var customerName = $('#customerNameTxt').val();
    var itemCode = $('#itemCodeOption').val();
    var itemName = $('#itemDescriptionTxt').val();
    var size = $('#sizeOption').val();
    var qty = $('#quantityTxt').val();
    var unitPrice = $("#unitPriceTxt").val();
    var empId = $('#orderSaleEmpIdTxt').val();
    var empName = $('#empNameTxt').val();
    var payMethod = $('#paymentMethod').val()


    var orderData = JSON.stringify({
        "orderCode": orderId,
        "purchaseDate": date,
        "customerName": customerName,
        "itemDesc": itemName,
        "size" : parseInt(size),
        "unitPrice": unitPrice,
        "qty": parseInt(qty),
        "paymentMethod": payMethod,
        "cashierName": empName,
        "customerDetails": {
          "customerCode": customerCode
        },
        "buyItem": [
          {
            "itemCode": itemCode
          }
        ],
        "order": [
          {
            "orderCode": orderId
          }
        ],
        "employeeEntity": {
          "employeeCode": empId
        }
      });
      


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/shoes/order/save",
        contentType: "application/json",
        data: orderData,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            generateNewOrderId()
            alert("Success");
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})


// next Order Id Generate
function generateNewOrderId(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/order/newOrderId",
        contentType: "application/json",
        data: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#ordrCodeTxt').val(data)
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
}

//
$('#paymentMethod').change(function (){
    var selectPayMethod = $('#paymentMethod').val();

    if(selectPayMethod === "CREDITCARD"){
           $('#cashTxt').css('display','none')
           $('#cashLbl').css('display','none')
           $('#creditCardTxt').css('display','block')
           $('#cardLbl').css('display','block')
    }else{
        $('#cashTxt').css('display','block')
        $('#cashLbl').css('display','block')
        $('#creditCardTxt').css('display','none')
        $('#cardLbl').css('display','none')
    }

})

document.addEventListener('DOMContentLoaded', function() {
    $('#cashTxt').css('display','none')
    $('#cashLbl').css('display','none')
    $('#creditCardTxt').css('display','none')
    $('#cardLbl').css('display','none')
    getAllCustomerSendAJAX()
    purchaseDateSet();
    getAllItems();
    generateNewOrderId()
});
