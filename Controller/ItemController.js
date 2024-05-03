import {ItemModel} from "../Model/ItemModel.js";

const getSuppliersIds = (jwtToken) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/supplier/getAllSuppliers",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
                console.log(data);
                var selectElement = $('#supplierCodeOption');
                data.forEach(supplier => {
                    selectElement.append(`<option value="${supplier.supplierCode}">${supplier.supplierCode}</option>`);
                });



        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    getSuppliersIds(jwtToken)

});