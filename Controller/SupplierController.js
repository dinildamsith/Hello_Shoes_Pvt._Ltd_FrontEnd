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