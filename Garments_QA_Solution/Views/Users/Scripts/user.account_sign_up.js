// load_team_select_items
load_team_select_items();
function load_team_select_items() {
    $.ajax({
        url: '/Teams/ShowTeamsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        async: false,
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                //
                var teamSelect = document.getElementById("add_team_name");

                show_team_select_items(teamSelect, resp.data);

            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#add_team_name").attr("disabled", true);
        },
        complete: function () {
            $("#add_team_name").attr("disabled", false);
        }
    });

}

// show_user_type_select_items
function show_team_select_items(teamSelect, data) {

    $.each(data, function (index, value) {
        teamSelect.options[teamSelect.options.length] = new Option(value.Name, value.Id);
    });
    if (teamSelect.length == 2) {
        teamSelect.selectedIndex = 1;
        teamSelect.dispatchEvent(new Event("change"));
    }
}

// load_department_select_items
load_department_select_items();
function load_department_select_items() {
    $.ajax({
        url: '/Departments/ShowDepartmentsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //
                var departmentSelect = document.getElementById("department");
                show_department_select_items(departmentSelect, resp.data);
            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#department").attr("disabled", true);
        },
        complete: function () {
            $("#department").attr("disabled", false);
        }
    });

}
// show_companies_location_select_items
function show_department_select_items(departmentSelect, data) {

    $.each(data, function (index, value) {
        departmentSelect.options[departmentSelect.options.length] = new Option(value.Name, value.Id);
    });
    if (departmentSelect.length == 2) {
        departmentSelect.selectedIndex = 1;
        departmentSelect.dispatchEvent(new Event("change"));
    }
}

// load company and Location for dropdown
load_companies_for_dropdown();
function load_companies_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompanyLocationsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                console.log("resp", resp)

                //
                var companySelect = document.getElementById("company");
                var locationSelect = document.getElementById("location");

                show_companies_location_select_items(companySelect, locationSelect, resp.data);

            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#company").attr("disabled", true);
            $("#location").attr("disabled", true);
        },
        complete: function () {
            $("#company").attr("disabled", false);
            $("#location").attr("disabled", false);
        }
    });

}


// show_companies_location_select_items
function show_companies_location_select_items(companySelect, locationSelect, data) {

    $.each(data, function (index, value) {
        companySelect.options[companySelect.options.length] = new Option(value.Name, value.Id);
    });
    companySelect.onchange = function () {

        let companyId = companySelect.options[companySelect.selectedIndex].value;
        if (companyId <= 0) {
            locationSelect.length = 1;

            return;
        }
        locationSelect.length = 1;

        //display correct values
        $.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {       /// problem

            locationSelect.options[locationSelect.options.length] = new Option(value.Name, value.Id);

        });

        if (locationSelect.length == 2) {
            locationSelect.selectedIndex = 1;
        }

    }
    if (companySelect.length == 2) {
        companySelect.selectedIndex = 1;
        companySelect.dispatchEvent(new Event("change"));
    }
}

// load_designation_select_items
load_designation_select_items();
function load_designation_select_items() {
    $.ajax({
        url: '/Designations/ShowDesignationsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //
                var designationSelect = document.getElementById("designation");
                show_designation_select_items(designationSelect, resp.data);
            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#designation").attr("disabled", true);
        },
        complete: function () {
            $("#designation").attr("disabled", false);
        }
    });

}
// show_designation_select_items
function show_designation_select_items(designationSelect, data) {

    $.each(data, function (index, value) {
        designationSelect.options[designationSelect.options.length] = new Option(value.Name, value.Id);
    });
    if (designationSelect.length == 2) {
        designationSelect.selectedIndex = 1;
        designationSelect.dispatchEvent(new Event("change"));
    }
}



/*
///////////////////////////////////////
        ADMIN SIGN UP SECTION START
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
            Fullname: $("#fullname").val(),
            EmployeeId: $("#employeeId").val(),
            ContactNo: $("#contactNo").val(),
            DepartmentId: $("#department").val(),
            DesignationId: $("#designation").val(),
            Email: $("#email_address").val(),
            Password: $("#password").val(),
            ConfirmPassword: $("#confirm_password").val(),
            CompanyId: $("#company").val(),
            LocationId: $("#location").val(),
            TeamId: $("#add_team_name").val(),
            browser: platform.name + " " + platform.version,
            operatingSystem: platform.os.toString(),
            ipAddress: find_ip,
            response: token
        };
        console.log(json);
        $.ajax({
            url: "/AccountSignUp/UserSignUp/",
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
        ADMIN SIGN UP SECTION END
///////////////////////////////////////
*/