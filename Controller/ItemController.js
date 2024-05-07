import {ItemModel} from "../Model/ItemModel.js";
import {SupplierModel} from "../Model/SupplierModel.js";
import {StockModel} from "../Model/StockModel.js";


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
                $("#item_Table").empty();
                getAllItemSetTabelSendAJAX(jwtToken)
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
            type: "PUT",
            url : "http://localhost:8080/shoes/item/update/" + itemId + "/" + supId,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
            },
            success: function(data) {
                $("#item_Table").empty();
                getAllItemSetTabelSendAJAX(jwtToken)
                alert("Success");
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    };
    sendAJAX(form, jwtToken);
})


// Item Delete
$('#itemDeleteBtn').on('click', ()=>{
    var  itemId = $('#itemIdTxt').val();

            const sendAJAX = (jwtToken) => {
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8080/shoes/item/delete/"+ itemId,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
                    },
                    success: function(data) {
                        $("#item_Table").empty();
                        getAllItemSetTabelSendAJAX(jwtToken)
                        alert("Success");
                    },
                    error: function(xhr, status, error) {
                        alert("Failed");
                    }
                });
            };
            sendAJAX(jwtToken);

})

// Item Search
$('#itemSearchBtn').on('click', ()=>{
    var  itemId = $('#itemSearchTxt').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/search/"+itemId,
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
            console.log(data.itemCode)
            console.log(data.stockEntityList)
            $('#itemIdTxt').val(data.itemCode);
            $('#itemDescTxt').val(data.itemDesc);
            $('#itemCategory').val(data.category);
            $('#sizeTxt').val(data.stockEntityList[0].itemSize);
            $('#quantityTxt').val(data.stockEntityList[0].qty);
            $('#salePriceTxt').val(data.unitPriceSale);
            $('#buyPriceTxt').val(data.buyPrice);
            $('#supplierCodeOption').val(data.supplierEntityList[0].supplierCode);
            $('#expectedProfitTxt').val(data.expectedProfit);
            $('#statusTxt').val(data.status);
            $('#profitMarginTxt').val(data.profitMargin);
            // // $('#selectImage').val(data.itemPic);
            // // console.log(data.itemPic)
            // // Assuming you have a Base64 encoded image string
            // const base64String = "data:image/png;base64," + data.itemPic;
            // const img = document.getElementById('selectImage'); // Get the existing <img> element by ID
            // img.src = base64String; // Set the src attribute of the <img> element to the Base64 string


        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})



//item Table Set Data
const getAllItemSetTabelSendAJAX = (jwtToken) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/allItems",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
            data.forEach(items => {
                var newRow = "<tr><th scope='row'>" + items.itemCode + "</th><td>" + items.itemDesc + "</td><td>" + items.category + "</td><td>" + items.unitPriceSale + "</td><td>" + items.buyPrice + "</td><td>" + items.supplierEntityList[0].supplierCode +  "</td></tr>";
                $("#item_Table").append(newRow);
            });

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

var itemTypeElement = document.getElementById("itemTypeOpation");
var occasionElement = document.getElementById("occasionOpation");
var veritiesElement = document.getElementById("veritiesOpation");


itemTypeElement.addEventListener("change", handleChange);
occasionElement.addEventListener("change", handleChange);
veritiesElement.addEventListener("change", handleChange);

function handleChange() {



    $.ajax({
        type: "GET",
        url: "http://localhost:8080/shoes/item/lastId",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function (data) {
            let incrementedId = parseInt(data, 10) + 1;
            var id = incrementedId.toString().padStart(data.length, '0');
            var createItemId = idFirstLetters+id
            $('#itemIdTxt').val(createItemId);
        },
        error: function (xhr, status, error) {
            alert("Failed");
        }
    });


    var itemType = itemTypeElement.value;
    var occasionType = occasionElement.value;
    var veritiesType = veritiesElement.value;

    var idFirstLetters =occasionType+veritiesType+itemType

}





document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    getAllItemSetTabelSendAJAX(jwtToken)
});