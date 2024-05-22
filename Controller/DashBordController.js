$('#selectDate').on('change', ()=>{

    let selectDate = $('#selectDate').val();

    $.ajax({
        type: "GET",
        url : "http://localhost:8080/shoes/order/getTotalSale/" + selectDate,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: false,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            $('#totalSaleLbl').text(data);

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });

})





//   Jwt Decode
// Function to decode the JWT and get the role
function base64UrlDecode(str) {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    try {
        return decodeURIComponent(escape(decodedData));
    } catch (error) {
        return decodedData;
    }
}

function parseJwt(token) {
    try {
        const [header, payload, signature] = token.split('.');
        if (!payload) {
            throw new Error('Invalid token');
        }
        const decodedPayload = JSON.parse(base64UrlDecode(payload));
        return decodedPayload;
    } catch (error) {
        console.error('Invalid token', error);
    }
}

function getRoleFromToken(token) {
    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.role) {
        const roles = decodedToken.role;
        if (roles.length > 0) {
            const authority = roles[0].authority;
            return authority;
        }
    }
    return null;
}

// Main script logic
$(document).ready(function() {
    const token = localStorage.getItem("jwtToken");
    const roleFromToken = getRoleFromToken(token);

    if (roleFromToken === "ROLE_ADMIN") {
        $('#userDashBord').css('display', 'none');

    } else if (roleFromToken === "ROLE_USER") {
        $('#adminDashBordDate').css('display', 'none');
        $('.adminPanelDetails').css('display', 'none');
        $('#xx').css('height', '0');



    }
});

