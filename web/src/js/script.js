function togglePwVisibility() {
    let field = document.getElementById("password");
    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

function checkUsername(username, callback) {
    let allowed_username = /^[a-zA-Z0-9]{2,30}$/;
    if (!username.match(allowed_username)) {
        $("#username-invalid-character").removeClass("d-none");
    } else {
        $("#username-invalid-character").addClass("d-none");
    }
    let url = `../src/php/username_exists.php?user=${username}`;
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            if (eval(`data.${username}`) == 1) {
                $("#username-exists").removeClass("d-none");
            } else {
                $("#username-exists").addClass("d-none");
            }
        },
    });
}

function addNewUser() {
    let allowed_username = /^[a-zA-Z0-9]{2,30}$/;
    if (!$("#username").val().match(allowed_username)) {
        $("#username-invalid-character").removeClass("d-none");
    } else {
        $("#username-invalid-character").addClass("d-none");
        let data = $("#register-form").serialize();
        //TODO hash password
        $.ajax({
            type: "POST",
            url: "../src/php/register_user.php",
            data: data,
            success: function (data, textStatus, xhr) {
                switch (xhr.status) {
                    case 201:
                        window.open("../index.php", "_self");
                }
            },
            error: function (data, textStatus, xhr) {
                console.error(xhr);
            },
        });
    }
}

function LoginUser() {
    let url = "../src/php/login_check.php";
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        type: "GET",
        url: url,
        data: { username: username, password: password },
        success: function (_data, _textStatus, xhr) {
            switch (xhr.status) {
                case 200:
                    window.open("../index.php", "_self");
                    break;
            }
        },
        error: function (xhr) {
            switch (xhr.status) {
                case 401:
                    $("#incorrect-login").removeClass("d-none");
                    break;
            }
        },
    });
}

$(document).ready(function () {
    $("#username").keyup(function () {
        let username = $(this).val();
        if (username != "") {
            checkUsername(username);
        }
    });

    $(".login-input").keyup(function (e) {
        if (e.key == "Enter" || e.keyCode == 13) {
            $("#login-button").trigger("click");
        }
    });
});
function OpenSite(site) {
    window.open(site, "_self");
}
