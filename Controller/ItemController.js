import {ItemModel} from "../Model/ItemModel.js";

var jwtToken = localStorage.getItem("jwtToken")
document.getElementById('itemImageSelect').addEventListener('change', displaySelectedImage);
document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    getSuppliersIds(jwtToken)

});


// Get Supplier Ids
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

// Select Image File Get
var image = "";
function displaySelectedImage(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = e => console.log('Selected image data URL:', e.target.result);
    reader.readAsDataURL(selectedFile);
    image =selectedFile;
}

// Item Save
$('#itemBuyBtn').on('click', ()=>{
    var  itemId = $('#itemIdTxt').val();
    var  itemDesc = $('#itemDescTxt').val();
    var  category = $('#itemCategory').val();
    var  size = $('#sizeTxt').val();
    var  qty = $('#quantityTxt').val();
    var  salePrice = $('#salePriceTxt').val();
    var  buyPrice = $('#buyPriceTxt').val();
    var supId = $('#supplierCodeOption').val();
    var expectedProfit = $('#expectedProfitTxt').val();


    var form = new FormData();
    form.append("item_code", itemId);
    form.append("item_desc", itemDesc);
    form.append("item_pic",  image);
    form.append("category", category);
    form.append("salePrice", salePrice);
    form.append("expectedProfit", expectedProfit);
    form.append("profitMargin", 0);
    form.append("buyPrice", buyPrice);


    const sendAJAX = (itemDetails,jwtToken) => {
        $.ajax({
            type: "POST",
            url : "http://localhost:8080/shoes/item/save/" + supId + "/" + size + "/" + qty,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
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
    sendAJAX(form, jwtToken);
})



// Item Update
$('#itemUpdateBtn').on('click', ()=>{
    var  itemId = $('#itemIdTxt').val();
    var  itemDesc = $('#itemDescTxt').val();
    var  category = $('#itemCategory').val();
    var  salePrice = $('#salePriceTxt').val();
    var  buyPrice = $('#buyPriceTxt').val();
    var supId = $('#supplierCodeOption').val();
    var expectedProfit = $('#expectedProfitTxt').val();


    var form = new FormData();
    form.append("item_desc", itemDesc);
    form.append("item_pic",  image);
    form.append("category", category);
    form.append("salePrice", salePrice);
    form.append("expectedProfit", expectedProfit);
    form.append("buyPrice", buyPrice);


    const sendAJAX = (itemDetails,jwtToken) => {
        $.ajax({
            type: "POST",
            url : "http://localhost:8080/shoes/item/update/" + itemId + "/" + supId,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
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
    sendAJAX(form, jwtToken);
})


