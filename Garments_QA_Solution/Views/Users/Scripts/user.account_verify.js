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

$("#user_sign_up_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
       // grecaptcha.execute();
        user_sign_up(1);
    }
});


function user_sign_up(token) {

    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {

        var json = {
            verificationCode: $("#verificationCode").val(),
            response: token
        };
        console.log(json);
        $.ajax({
            url: "/AccountVerify/Verify/",
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
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem;height:2rem" alt="audio">');

            },
            complete: function () {
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('Sign Up');

            }
        });

    }
}
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
    find_ip = data.ip;
})
/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION END
///////////////////////////////////////
*/