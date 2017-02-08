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
                    $('#inputInfo').css("color", "red");
                    $('#inputInfo').text("* Invalid UserName/Password *");
                    $('#inputInfo').fadeIn(500);
                }
            },
            error: function (msg) {
                $('#inputInfo').css("color", "red");
                $('#inputInfo').text("* " + msg + " *");
                $('#inputInfo').fadeIn(5000);
            }
        })
    }
    else if (!UserName) {
        $('#inputInfo').css("color", "red");
        $('#inputInfo').text("* Please enter Username *");
        $('#inputInfo').fadeIn(500);
        return;
    }
    else {
        $('#inputInfo').css("color", "red");
        $('#inputInfo').text("* Please enter Password *");
        $('#inputInfo').fadeIn(500);
        return;
    }
    feedLocalStorage();
}

function feedLocalStorage() {
    if (!sessionStorage.length) {
        // Ask other tabs for session storage
        localStorage.validUser = false;
    };

    window.addEventListener('storage', function (event) {

        //console.log('storage event', event);

        if (event.key == 'validUser') {
            // Some tab asked for the sessionStorage -> send it

            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            localStorage.removeItem('sessionStorage');

        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // sessionStorage is empty -> fill it

            var data = JSON.parse(event.newValue),
                        value;

            for (key in data) {
                sessionStorage.setItem(key, data[key]);
            }

            //showSessionStorage();
        }
    });

    window.onbeforeunload = function () {
        //sessionStorage.clear();
    };


    /* This code is only for the UI in the demo, it's not part of the sulotion */

    //var el;

    //function showSessionStorage() {
    //    el.innerHTML = sessionStorage.length ? JSON.stringify(sessionStorage) : 'sessionStorage is empty';
    //}

    //window.addEventListener('load', function () {
    //    el = document.getElementById('stData');
    //    showSessionStorage();

    //    document.getElementById('btnSet').addEventListener('click', function () {
    //        sessionStorage.setItem('token', '123456789');
    //        showSessionStorage();
    //    })

    //    document.getElementById('btnClear').addEventListener('click', function () {
    //        sessionStorage.clear();
    //        showSessionStorage();
    //    })
    //})

}