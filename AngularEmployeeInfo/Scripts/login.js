
function AuthenticateUser() {
    var UserName = $("input[name='uname']").val();
    var Password = $("input[name='psw']").val();

    var user = { 'UserName': UserName, 'Password': Password };

    $.ajax({
        type: "POST",
        url: "http://localhost:50836/Service1.svc/AuthenticateUser",
        data: JSON.stringify(user),
        dataType: "json",
        processData: true,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert("success");
        },
        error: function (msg) {
            alert("failed");
        }
    })
}