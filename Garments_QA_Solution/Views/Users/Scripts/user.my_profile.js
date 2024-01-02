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
// show_department_select_items
function show_department_select_items(departmentSelect, data) {

    $.each(data, function (index, value) {
        departmentSelect.options[departmentSelect.options.length] = new Option(value.Name, value.Id);
    });
    if (departmentSelect.length == 2) {
        departmentSelect.selectedIndex = 1;
        departmentSelect.dispatchEvent(new Event("change"));
    }
}
// load_designation_select_items
load_designation_select_items();
function load_designation_select_items() {
    $.ajax({
        url: '/Designations/ShowDesignationsForDropdown',
        type: "POST",
        async: false,
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
        console.log(designationSelect);
        designationSelect.options[designationSelect.options.length] = new Option(value.Name, value.Id);
    });
    if (designationSelect.length == 2) {
        designationSelect.selectedIndex = 1;
        designationSelect.dispatchEvent(new Event("change"));
    }
}


// load companyLocation for dropdown
load_companies_for_dropdown();
function load_companies_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompanyLocationsForDropdown',
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
        $.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {

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



/*
///////////////////////////////////////
        SECTION START
///////////////////////////////////////
*/


// load_myProfile
load_myProfile();
function load_myProfile() {
    $.ajax({
        url: '/MyProfile/GetMyProfile',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        async: false,
        success: function (resp) {
            if (resp.error)
            {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else
            {
                console.log("resp", resp);
                $("#fullname").data("userNo",resp.data.UserNo);
                $("#fullname").val(resp.data.FullName);
                $("#employeeId").val(resp.data.EmployeeId);
                $("#contactNo").val(resp.data.ContactNo);
                $("#department").val(resp.data.DepartmentId);
                $("#designation").val(resp.data.DesignationId);
                $("#email_address").val(resp.data.Email);
                $("#add_team_name").val(resp.data.TeamId);
                //$("#company").val(resp.data.EnrollCompanyLocations[0].CompanyId).change();
                //$("#location").val(resp.data.EnrollCompanyLocations[0].LocationId);
                $("#company").val(resp.data.EnrollCompanyLocations[0].CompanyId).change();
                $("#location").val(resp.data.EnrollCompanyLocations[0].LocationId);
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
            $("#sign_up_btn").attr("disabled", true);

        },
        complete: function () {
            $("#sign_up_btn").attr("disabled", false);
        }
    });
}


$("#user_sign_up_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
        user_sign_up();
    }
});


function user_sign_up() {

    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {

        var json = {
            UserNo: $("#fullname").data("userNo"),
            Fullname: $("#fullname").val(),
            ContactNo: $("#contactNo").val(),
            DepartmentId: $("#department").val(),
            DesignationId: $("#designation").val(),
            TeamId: $("#add_team_name").val(),
            Email: $("#email_address").val(),
            LocationId: $("#location").val(),
            EnrollCompanyLocations: [{
                CompanyId: $("#company").val(),
                LocationId: $("#location").val()
            }]
        };
        console.log(json);
        $.ajax({
            url: "/MyProfile/UpdateUserSignUp/",
            type: "POST",
            data: json,
            dataType: "json",
            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                }
                else {
                    iziToast.success({
                        title: 'Success!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    $("#sign_up_btn").remove();

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
                $("#sign_up_btn").append('Update');

            }
        });

    }
}
/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION END
///////////////////////////////////////
*/