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
            Swal.fire({
                title: "Supplier Save Success",
                icon: "success"
            });
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})


// Search Supplier
$('#supplierSearchBtn').on('click', ()=>{

    var searchSupId = $('#supplierSearchTxt').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/supplier/search/"+searchSupId,
        contentType: "application/json",
        data: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {

            if (!data){
                Swal.fire({
                    title: "Sorry This Id Have No Supplier !",
                    icon: "info"
                });
            }else {
                $('#supplierCodeTxt').val(data.supplierCode);
                $('#supplierNameTxt').val(data.supplierName);
                $('#supCategoryOption').val(data.category);
                $('#address1Txt').val(data.addressLine1);
                $('#address2Txt').val(data.addressLine2);
                $('#address3Txt').val(data.addressLine3);
                $('#contact1Txt').val(data.contact1);
                $('#contact2Txt').val(data.contact2);
                $('#mailTxt').val(data.email);
            }

        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: "Sorry Sir !!",
                text:  " Your account does not have permission to delete the Suppler details!",
                icon: "error"
            });
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



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success m-1",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Do you want to Update this Suppler ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {


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

                    swalWithBootstrapButtons.fire({
                        title: "Supplier Update Success !",
                        icon: "success"
                    });
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        title: "Sorry Sir !!",
                        text:  " Your account does not have permission to delete the Suppler details!",
                        icon: "error"
                    });
                }
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Suppler Update Cancelled !",
                icon: "error"
            });
        }
    });


})

// Delete Employee
$('#supplierDeleteBtn').on('click', ()=>{

    var deleteSupplierCode = $('#supplierCodeTxt').val();



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success m-1",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Do you want to Delete this Suppler?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/shoes/supplier/delete/"+deleteSupplierCode,
                contentType: "application/json",
                data: false,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
                },
                success: function(data) {
                    $('#supplier_Table').empty();
                    getAllSupplier();
                    swalWithBootstrapButtons.fire({
                        title: "Suppler Delete Success !",
                        icon: "success"
                    });
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        title: "Sorry Sir !!",
                        text:  " Your account does not have permission to delete the Suppliers details!",
                        icon: "error"
                    });
                }
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Item Delete Cancelled !",
                icon: "error"
            });
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