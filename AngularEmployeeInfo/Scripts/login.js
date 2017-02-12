$(document).ready(function () {
    if (sessionStorage.validUser == "true") {
        window.location("Index.html");
        return;
    }
    $("input").keypress(function (e) {
        if (e.keyCode == 13) {
            AuthenticateUser();
        }
    });
});

function AuthenticateUser() {
    $('#inputInfo').hide();

    var UserName = $("input[name='uname']").val();
    var Password = $("input[name='psw']").val();

    if (UserName && Password) {
        var user = { 'UserName': UserName, 'Password': Password };

        $.ajax({
            type: "POST",
            url: "http://localhost:50836/Service1.svc/AuthenticateUser",
            data: JSON.stringify(user),
            dataType: "json",
            processData: true,
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data) {
                    sessionStorage.validUser = true;
                    window.location("Index.html");
                }
                else {
                    $("#inputInfo").css("color", "red");
                    $("#inputInfo").text("* Invalid UserName/Password *");
                    $("#inputInfo").fadeIn(500);
                    $("[name='uname']").val("");
                    $("[name='psw']").val("");
                    $("[name='uname']").focus();
                }
            },
            error: function (msg) {
                $('#inputInfo').css("color", "red");
                $('#inputInfo').text("* " + msg + " *");
                $('#inputInfo').fadeIn(5000);
                $("[name='uname']").val("");
                $("[name='psw']").val("");
                $("[name='uname']").focus();
            }
        })
    }
    else if (!UserName) {
        $('#inputInfo').css("color", "red");
        $('#inputInfo').text("* Please enter Username *");
        $('#inputInfo').fadeIn(500);
        $("[name='uname']").focus();
        return;
    }
    else {
        $('#inputInfo').css("color", "red");
        $('#inputInfo').text("* Please enter Password *");
        $('#inputInfo').fadeIn(500);
        $("[name='psw']").focus();
        return;
    }
}