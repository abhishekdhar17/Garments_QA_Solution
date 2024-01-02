
/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION START
///////////////////////////////////////
*/
//console.log(platform);

$.getJSON('https://api.ipify.org?format=json', function (data) {
    console.log(data.ip);
});

var find_ip = "";

$("#user_sign_in_form").on("submit", function (e) {
    e.preventDefault();
   // grecaptcha.execute();
    admin_sign_in(1);
});


function admin_sign_in(token) {

    if ($('#user_sign_in_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        var json = {
            email: $("#email").val(),
            password: $("#password").val(),
            browser: platform.name + " " + platform.version,
            operatingSystem: platform.os.toString(),
            ipAddress: find_ip,
            response: token
        };

        $.ajax({
            url: "/Accounts/AdminSignIn/",
            type: "POST",
            data: json,
            dataType: "json",
            traditional: true,
            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    grecaptcha.reset();

                }
                else {
                    location.href = resp.url;
                }
            },
            error: function (a, b, err) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            },
            beforeSend: function () {
                $("#login_btn").empty();
                $("#login_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem;height:2rem" alt="audio">');
                $("#login_btn").empty();
                $("#login_btn").append('Login');
            },
            complete: function () {
                $("#login_btn").empty();
                $("#login_btn").append('Login');

            }
        });

    }
}

//$("#user_sign_in_form").on("submit", function (e) {
//    e.preventDefault();
//    //toastr.error("Oops! Something went wrong.Something went wrong.", "Err



//});
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
    find_ip = data.ip;
})

/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION END
///////////////////////////////////////
*/

