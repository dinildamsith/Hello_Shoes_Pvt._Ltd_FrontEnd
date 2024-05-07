import {SupplierModel} from "../Model/SupplierModel.js";


// Save Suppliers
$('#supplierSaveBtn').on('click', ()=>{

    var supplierCode = $('#supplierCodeTxt').val();
    var supplierName = $('#supplierNameTxt').val();
    var category = $('#supCategoryOption').val();
    var address1 = $('#address1Txt').val();
    var address2 = $('#address2Txt').val();
    var address3 = $('#address3Txt').val();
    var contact1 = $('#contact1Txt').val();
    var contact2 = $('#contact2Txt').val();
    var mail = $('#mailTxt').val();

    var  supplierDetails = new SupplierModel(supplierCode,supplierName,category,address1,address2,address3,contact1,contact2,mail);
    var supplierDetailsJson = JSON.stringify(supplierDetails);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/shoes/supplier/save",
        contentType: "application/json",
        data: supplierDetailsJson,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#supplier_Table').empty();
            getAllSupplier();
            alert("Success");
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})

// update Employee
$('#supplierUpdateBtn').on('click', ()=>{

    var updateSupplierCode = $('#supplierCodeTxt').val();

    var supplierName = $('#supplierNameTxt').val();
    var category = $('#supCategoryOption').val();
    var address1 = $('#address1Txt').val();
    var address2 = $('#address2Txt').val();
    var address3 = $('#address3Txt').val();
    var contact1 = $('#contact1Txt').val();
    var contact2 = $('#contact2Txt').val();
    var mail = $('#mailTxt').val();

    var  supplierDetails = new SupplierModel(supplierName,category,address1,address2,address3,contact1,contact2,mail);
    var supplierDetailsJson = JSON.stringify(supplierDetails);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/shoes/supplier/update/"+updateSupplierCode,
        contentType: "application/json",
        data: supplierDetailsJson,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#supplier_Table').empty();
            getAllSupplier();
            alert("Success");
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})



// get All Suppliers and supplier table set data
const getAllSupplier = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/supplier/getAllSuppliers",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            data.forEach(suppliers => {
                var newRow = "<tr><th scope='row'>" + suppliers.supplierCode + "</th><td>" + suppliers.supplierName + "</td><td>" + suppliers.category + "</td><td>" + suppliers.addressLine1 + "</td><td>" + suppliers.addressLine2   + "</td><td>" + suppliers.addressLine3 + "</td><td>" + suppliers.contact1  +  "</td><td>" + suppliers.contact2 +  "</td><td>" + suppliers.email +  "</td></tr>";
                $("#supplier_Table").append(newRow);
            });

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getAllSupplier();
});