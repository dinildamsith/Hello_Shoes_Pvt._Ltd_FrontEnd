// Customer Ids Set
const getAllCustomerSendAJAX = () => {
    console.log("sss")
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

document.addEventListener('DOMContentLoaded', function() {
    getAllCustomerSendAJAX()
});
