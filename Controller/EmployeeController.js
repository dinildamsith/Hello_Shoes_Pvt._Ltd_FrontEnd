import {EmployeeModel} from "../Model/EmployeeModel.js";


// Select Image Convert Base 64
document.getElementById('empSelectImage').addEventListener('change', displaySelectedImage);
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

$('#employeeSaveBtn').on('click', ()=>{


    var empCode = $('#employeeCodeTxt').val();
    var empName = $('#employeeNameTxt').val();
    var gender = $('#employeeGenderOption').val();
    var status = $('#empStatusOption').val();
    var designation = $('#designationTxt').val();
    var role = $('#roleOption').val();
    var dob = $('#empBirthday').val();
    var jd = $('#empJoinDate').val();
    var branch = $('#branchOption').val();
    var addr1 = $('#address1Txt').val();
    var addr2 = $('#address2Txt').val();
    var addr3 = $('#address3Txt').val();
    var contact = $('#contactTxt').val();
    var mail = $('#mailTxt').val();
    var gn = $('#guardiaNameTxt').val();
    var emrCont = $('#emgContactTxt').val();



    var form = new FormData();
    form.append("employee_code", empCode);
    form.append("employee_name", empName);
    form.append("employee_pic", image);
    form.append("gender", gender);
    form.append("status", status);
    form.append("designation", designation);
    form.append("role", role);
    form.append("birthday", dob);
    form.append("joinDate", jd);
    form.append("attachedBranch", branch);
    form.append("address1", addr1);
    form.append("address2", addr2);
    form.append("address3", addr3);
    form.append("address4", "dd");
    form.append("address5", "dd");
    form.append("contact", contact);
    form.append("email", mail);
    form.append("guardiaName", gn);
    form.append("emergencyContact", emrCont);

    const sendAJAX = (empDetails,jwtToken) => {
        $.ajax({
            type: "POST",
            url : "http://localhost:8080/shoes/employee/save",
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
    sendAJAX(form, localStorage.getItem("jwtToken"));


})
