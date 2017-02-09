$(document).ready(function () {
    feedLocalStorage();
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
    //feedLocalStorage();
}

function feedLocalStorage() {
    var sessionStorage_transfer = function (event) {
        if (!event) { event = window.event; } // ie suq
        if (!event.newValue) return;          // do nothing if no value to work with
        if (event.key == 'getSessionStorage') {
            // another tab asked for the sessionStorage -> send it
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            // the other tab should now have it, so we're done with it.
            localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // another tab sent data <- get it
            var data = JSON.parse(event.newValue);
            for (var key in data) {
                sessionStorage.setItem(key, data[key]);
            }
        }
    };

    // listen for changes to localStorage
    if (window.addEventListener) {
        window.addEventListener("storage", sessionStorage_transfer, false);
    } else {
        window.attachEvent("onstorage", sessionStorage_transfer);
    };


    // Ask other tabs for session storage (this is ONLY to trigger event)
    if (!sessionStorage.length) {
        localStorage.setItem('getSessionStorage', 'foobar');
        localStorage.removeItem('getSessionStorage', 'foobar');
    };


    //if (!sessionStorage.length) {
    //    // Ask other tabs for session storage
    //    localStorage.validUser = false;
    //};

    //window.addEventListener('storage', function (event) {

    //    //console.log('storage event', event);

    //    if (event.key == 'validUser') {
    //        // Some tab asked for the sessionStorage -> send it

    //        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    //        localStorage.removeItem('sessionStorage');

    //    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
    //        // sessionStorage is empty -> fill it

    //        var data = JSON.parse(event.newValue),
    //                    value;

    //        for (key in data) {
    //            sessionStorage.setItem(key, data[key]);
    //        }
    //    }
    //});
}