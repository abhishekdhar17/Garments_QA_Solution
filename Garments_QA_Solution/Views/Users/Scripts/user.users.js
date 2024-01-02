/*
///////////////////////////////////////
       USERS
///////////////////////////////////////
*/

// load menu for dropdown
load_menu_for_dropdown();
function load_menu_for_dropdown() {
    $.ajax({
        url: '/MenuItems/ShowMenuItemsForDropdown',
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
                $("#add_user_permissions").empty();
                $("#edit_user_permissions").empty();


                var groupedMenuList = groupBy(resp.data, ['MenuCategoryId'])

                $.each(groupedMenuList, function (index, _agroupedvalue) {
                    var add_option_grouped = $("#add_user_permissions").select2();
                    var _add_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].MenuCategoryTitle).appendTo(add_option_grouped);

                    var edit_option_grouped = $("#edit_user_permissions").select2();
                    var _edit_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].MenuCategoryTitle).appendTo(edit_option_grouped);
                    $.each(_agroupedvalue, function (index, value) {

                        _add_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');
                        _edit_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');
                        //$("#edit_user_permissions").append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');
                    });
                });

            }
        }
    });
}
//Start users filter action
$("#user_filter_form").on("submit", function (e) {
    e.preventDefault();
    load_filtered_users(1);
});
//End users filter action
//Start add users add event listener

$("#add_user_btn").on("click", function () {
    $("#add_user_modal").modal("show");
    $("#users_add_modal_form").trigger("reset");
    $("#users_add_modal_form").removeClass('was-validated');
    $('.select2').trigger('change');
});
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
                let departmentSelect = document.getElementById("add_department");

                show_department_select_items(departmentSelect, resp.data);

                let editDepartmentSelect = document.getElementById("edit_department");

                show_department_select_items(editDepartmentSelect, resp.data);

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
//Start add users event listener
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
                

                let designationSelect = document.getElementById("add_designation");

                show_designation_select_items(designationSelect, resp.data);

                let editDesignationSelect = document.getElementById("edit_designation");

                show_designation_select_items(editDesignationSelect, resp.data);
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
                var teamSelect = document.getElementById("users_add_team_name");

                show_team_select_items(teamSelect, resp.data); 
                var editTeamSelect = document.getElementById("edit_user_team_name");

                show_team_select_items(editTeamSelect, resp.data);
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
            $("#users_add_team_name").attr("disabled", true);
        },
        complete: function () {
            $("#users_add_team_name").attr("disabled", false);
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
// load company for dropdown
load_companies_for_dropdown_by_session_arr();
function load_companies_for_dropdown_by_session_arr() {
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

                $("#users_add_company").empty();
                $("#users_add_location").empty();
                $("#users_add_company").append('<option value="">Select Company</option>');
                $("#users_add_location").append('<option value="">Select Location</option>');

                //filter
                var companySelect = document.getElementById("filter_companyy");
                var locationSelect = document.getElementById("filter_location");

                show_companies_location_select_items(companySelect, locationSelect, resp.data);

                //filter
                var companySelect = document.getElementById("users_add_company");
                var locationSelect = document.getElementById("users_add_location");

                show_companies_location_select_items(companySelect, locationSelect, resp.data);

                var companySelect = document.getElementById("users_edit_company");
                var locationSelect = document.getElementById("users_edit_location");

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
            //$("#users_add_company").attr("disabled", true);
            //$("#users_add_location").attr("disabled", true);
        },
        complete: function () {
            //$("#users_add_company").attr("disabled", false);
            //$("#users_add_location").attr("disabled", false);
        }
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 50);
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

    }
}

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};


//Start load users table

load_filtered_users(1);
function load_filtered_users(page) {

    json = {
        limit: $("#filter_limit").val(),
        companyId: $("#filter_companyy").val(),
        locationId: $("#filter_location").val(),
        userName: $("#filter_username").val(),
        employeeId: $("#filter_employeeId").val(),
        uRoleId: $("#filter_user_role").val(),
        page: page
    };
    console.log(json);
    $.ajax({
        url: "/Users/ShowUsers/",
        type: "POST",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),
        success: function (resp) {

            if (resp.error) {
                iziToast.error({
                    title: 'Warning!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            } else {
                show_users_table_info(resp.tableRecords);
                show_users_list(resp);

            }
        },
        beforeSend: function () {
            $("#users_loading_spinner").show();
        },
        complete: function () {
            $("#users_loading_spinner").hide();
        }
    });
}
//End load users table

//show table details in paginate section
function show_users_table_info(tableRecords) {
    $('#user_table_info').empty();
    $('#user_table_info').append('Total Records: ' + tableRecords + ' | Total Page : ' + Math.ceil(tableRecords / $("#filter_limit").val()));
}

//add company permission

$("#users_company_loc_btn").on("click", function (e) {
    e.preventDefault();

    let companyVal = $("#users_add_company").val();
    let company = $("#users_add_company option:selected").text();
    let locationVal = $("#users_add_location").val();
    let location = $("#users_add_location option:selected").text();

    if (companyVal == "" || locationVal == "") {
        iziToast.warning({
            title: 'Warning!',
            message: "Please add permission by company,location",
            position: 'bottomRight'
        });
        return;
    }

    if (!_is_exist_label_company_data(company, location)) {
        var rowCount = $('#ls_country_permission_table_tbody tr').length;
        var slNocell = $("<td>").append(rowCount + 1);
        var companycell = $("<td>").attr('data-id', companyVal).append(company);
        var locationcell = $("<td>").attr('data-id', locationVal).append(location);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        var deleteIcon = $("<i>").attr({
            "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
            "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
            "title": "Delete"
        }).appendTo(icondiv);
        var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, iconcell).appendTo("#ls_country_permission_table_tbody");
        (function ($) {

            deleteIcon.on("click", function (e) {
                e.preventDefault();
                row.remove();
            });

        })(jQuery);
    }
    else {
        iziToast.warning({
            title: 'Warning!',
            message: "Already added this permission.",
            position: 'bottomRight'
        });
    }

});
function _is_exist_label_company_data(company, location) {

    var table = document.getElementById("ls_country_permission_table");

    /*
    Extract and iterate rows from tbody of table2
    */
    for (const tr of table.querySelectorAll("tbody tr")) {

        /*
        Extract first and second cell from this row
        */
        const td1 = tr.querySelector("td:nth-child(2)");
        const td2 = tr.querySelector("td:nth-child(3)");
        const td3 = tr.querySelector("td:nth-child(4)");

        /*
        If this row has missing cells, skip it
        */
        if (!td1 || !td2 || !td3) {
            continue;
        }
        /*
        Check if cells of existing tr row contain same contents
        as input arguments.
        */
        if ((td1.innerHTML == company) && (td2.innerHTML == location)) {
            return true;
        }
    }
    return false;
}

//edit company permission

$("#users_company_loc_edit_btn").on("click", function (e) {
    e.preventDefault();

    let companyVal = $("#users_edit_company").val();
    let company = $("#users_edit_company option:selected").text();
    let locationVal = $("#users_edit_location").val();
    let location = $("#users_edit_location option:selected").text();

    if (companyVal == "" || locationVal == "") {
        iziToast.warning({
            title: 'Warning!',
            message: "Please add permission by company,location",
            position: 'bottomRight'
        });
        return;
    }

    if (!_is_exist_label_company_edit_data(company, location)) {
        var rowCount = $('#ls_edit_country_permission_table_tbody tr').length;
        var slNocell = $("<td>").append(rowCount + 1);
        var companycell = $("<td>").attr('data-id', companyVal).append(company);
        var locationcell = $("<td>").attr('data-id', locationVal).append(location);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        var deleteIcon = $("<i>").attr({
            "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
            "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
            "title": "Delete"
        }).appendTo(icondiv);
        var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, iconcell).appendTo("#ls_edit_country_permission_table_tbody");
        (function ($) {

            deleteIcon.on("click", function (e) {
                e.preventDefault();
                row.remove();
            });

        })(jQuery);
    }
    else {
        iziToast.warning({
            title: 'Warning!',
            message: "Already added this permission.",
            position: 'bottomRight'
        });
    }

});
function _is_exist_label_company_edit_data(company, location) {

    var table = document.getElementById("ls_edit_country_permission_table");

    /*
    Extract and iterate rows from tbody of table2
    */
    for (const tr of table.querySelectorAll("tbody tr")) {

        /*
        Extract first and second cell from this row
        */
        const td1 = tr.querySelector("td:nth-child(2)");
        const td2 = tr.querySelector("td:nth-child(3)");
        const td3 = tr.querySelector("td:nth-child(4)");

        /*
        If this row has missing cells, skip it
        */
        if (!td1 || !td2 || !td3) {
            continue;
        }
        /*
        Check if cells of existing tr row contain same contents
        as input arguments.
        */
        if ((td1.innerHTML == company) && (td2.innerHTML == location)) {
            return true;
        }
    }
    return false;
}
//Start shows data on users table 

function show_users_list(resp) {

    if (resp.data.length <= 0) {

        iziToast.warning({
            title: 'Warning!',
            message: "Users data not available.",
            position: 'bottomRight'
        });
    }

    $("#users_table_tbody").empty();

    $.each(resp.data, function (index, value) {
        var slnocell = $("<td>").append(index + 1);
        var fullNameCell = $("<td>").append(value.FullName);
        var userNameCell = $("<td>").append($("<div>").attr("class", "badge bg-info").append(value.Username));
        var employeeId = $("<td>").append(value.EmployeeId);
        var emailCell = $("<td>").append(value.Email === null ? "-" : value.Email);
        var contactNoCell = $("<td>").append(value.ContactNo === null ? "-" : value.ContactNo);
        var companyLocCell = $("<td>");

        var grouped_company = groupBy(value.CompanyLocations, ['Name']);

        $.each(grouped_company, function (_index, company) {
            //console.log('grouped_company', company);

            var grouped_location = groupBy(company, ['LocationName']);


            $("<a>").attr({ "class": "btn btn-primary m-2", "data-bs-toggle": "collapse", "href": "#COL" + index, "role": "button", "aria-expanded": "false", "aria-controls": "COL" + index }).append(_index).appendTo(companyLocCell);

            var collapse = $("<div>").attr({ "class": "collapse", "id": "COL" + index }).appendTo(companyLocCell);
            //var collapse_card = $("<div>").attr({ "class": "card card-body", "style": "padding: .5rem;"}).appendTo(collapse);

            $.each(grouped_location, function (_indexloc, _obj) {

                $("<div>").attr({ "class": "badge bg-success m-2", "data-bs-toggle": "collapse", "href": "#COL" + index + _index, "role": "button", "aria-expanded": "false", "aria-controls": "COL" + index + _index }).append(_indexloc).appendTo(collapse);

                var _collapse = $("<div>").attr({ "class": "collapse", "id": "COL" + index + _index }).appendTo(collapse);

            })
        })

        var permissionsCell = $("<td>");
        $("<a>").attr({ "class": "btn btn-secondary m-2", "data-bs-toggle": "collapse", "href": "#COLP" + index, "role": "button", "aria-expanded": "false", "aria-controls": "COLP" + index }).append('Permissions <i class="bi bi-arrows-expand"></i>').appendTo(permissionsCell);

        var _collapse = $("<div>").attr({ "class": "collapse", "id": "COLP" + index }).appendTo(permissionsCell);
        $.each(value.EnrollMenus, function (index, per) {
            _collapse.append($("<div>").attr("class", "badge bg-info m-1").append(per.MenuItemName));

        })


        var userRoleTitleCell = $("<td>").append($("<div>").attr("class", "badge bg-primary").append(value.URoleTitle));
        var userStatusCell = $("<td>")/*.append(value.UserStatus === 0 ? "Inactive" : value.UserStatus === 1 ? "Active" : "Banned");*/

        user_status_text(value.UserStatus);
        function user_status_text(status) {

            if (status === 0) {
                $("<div>").attr("class", "badge bg-warning").append("InActive").appendTo(userStatusCell);
            }
            else if (status === 1) {
                $("<div>").attr("class", "badge bg-success").append("Active").appendTo(userStatusCell);
            }
            else {
                $("<div>").attr("class", "badge bg-danger").append("Banned").appendTo(userStatusCell);
            }
        }


        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        var editIcon = $("<i>").attr({
            "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Edit Buyer"
        }).appendTo(icondiv);

        var unlockIcon = $("<i>").attr({
            "class": "e-btn bi-lock text-white bg-primary rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Edit User"
        }).appendTo(icondiv);

        $("<tr>").attr("class", "text-center").append(slnocell, fullNameCell, userNameCell, employeeId, emailCell, contactNoCell, userRoleTitleCell, companyLocCell, permissionsCell, userStatusCell, iconcell).appendTo("#users_table_tbody");

        (function ($) {
            editIcon.on("click", function (e) {

                //iziToast.warning({
                //    title: 'Warning!',
                //    message: "You are not authorized to edit admin. Please contact with administrator.",
                //    position: 'bottomRight'
                //});
                //return;


                //if ($("#nav_link_username").data("userRoleId") != 1) {
                //    if (value.URoleId == 2) {

                //        iziToast.warning({
                //            title: 'Warning!',
                //            message: "You are not authorized to edit unit admin. Please contact with administrator.",
                //            position: 'bottomRight'
                //        });
                //        return;
                //    }
                //}
                //if ($("#nav_link_username").data("userRoleId") > 2) {
                //    iziToast.warning({
                //        title: 'Warning!',
                //        message: "You are not authorized to edit admin. Please contact with administrator.",
                //        position: 'bottomRight'
                //    });
                //    return;
                //}

                if (value.URoleId == 1) {

                    iziToast.warning({
                        title: 'Warning!',
                        message: "You are not authorized to edit super admin. Please contact with administrator.",
                        position: 'bottomRight'
                    });
                    return;
                }


                //$('.select2').trigger('change');

                e.preventDefault();
                $("#edit_user_modal").modal("show");
                $("#edit_user_modal_form").trigger("reset");
                $("#edit_user_modal_form").removeClass('was-validated');
                $('.select2').trigger('change');
               

                $("#edit_fullname").data("userNo", value.UserNo);
                $("#edit_fullname").val(value.FullName);
                $("#edit_employeeid").val(value.EmployeeId);
                $("#edit_username").val(value.Username);
                $("#edit_password").val("*******");
                $("#edit_email").val(value.Email);
                $("#edit_contact_no").val(value.ContactNo);
                $("#edit_user_role").val(value.URoleId);
                $("#edit_department").val(value.DepartmentId);
                $("#edit_designation").val(value.DesignationId);
                $("#edit_user_status").val(value.UserStatus);
                $("#edit_user_team_name").val(value.TeamId);

                $("#ls_edit_country_permission_table_tbody").empty();

                $.each(value.CompanyLocations, function (index, value) {
                    var rowCount = $('#ls_country_permission_table_tbody tr').length;
                    var slNocell = $("<td>").append(rowCount + 1);
                    var companycell = $("<td>").attr('data-id', value.CompanyId).append(value.Name);
                    var locationcell = $("<td>").attr('data-id', value.LocationId).append(value.LocationName);

                    var iconcell = $("<td>");
                    var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

                    var deleteIcon = $("<i>").attr({
                        "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
                        "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
                        "title": "Delete"
                    }).appendTo(icondiv);
                    var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, iconcell).appendTo("#ls_edit_country_permission_table_tbody");
                    (function ($) {

                        deleteIcon.on("click", function (e) {
                            e.preventDefault();
                            row.remove();
                        });

                    })(jQuery);
                })
                var Values = new Array();

                $.each(value.EnrollMenus, function (index, value) {
                    Values.push(value.MenuItemId);
                });

                console.log(Values);
                $("#edit_user_permissions").val(Values).trigger('change');

            });

            unlockIcon.on("click", function (e) {
                //iziToast.warning({
                //    title: 'Warning!',
                //    message: "You are not authorized to edit admin. Please contact with administrator.",
                //    position: 'bottomRight'
                //});
                //return;
                //if ($("#nav_link_username").data("userRoleId") != 1) {
                //    iziToast.warning({
                //        title: 'Warning!',
                //        message: "You are not authorized to change password. Please contact with administrator.",
                //        position: 'bottomRight'
                //    });
                //    return;
                //}
                $("#change_password_modal_form").trigger("reset");
                $("#change_password_modal_form").removeClass("was-validated");

                $("#editpassword_email").data("userNo", value.UserNo);
                $("#editpassword_email").val(value.Email);
                $("#change_password_modal").modal("show");

            });

        })(jQuery);


    });
}
//End shows data on users table

//Start load user role dropdown
load_user_role();
function load_user_role() {
    $.ajax({
        url: "/UserRoles/ShowUserRole/",
        type: "POST",
        async: false,
        contentType: "application/json; charset-utf-8",
        success: function (resp) {

            if (resp.error) {
                iziToast.error({
                    title: 'Warning!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                $("#filter_user_role").empty();
                $("#add_user_role").empty();
                $("#edit_user_role").empty();


                $("#filter_user_role").append('<option value="-1">All User Role</option>');
                $("#add_user_role").append('<option value="">Select User Role</option>');


                $.each(resp.data, function (index, value) {

                    $("#filter_user_role").append('<option value="' + value.URoleId + '">' + value.URoleTitle + '</option>');
                    $("#add_user_role").append('<option value="' + value.URoleId + '">' + value.URoleTitle + '</option>');
                    $("#edit_user_role").append('<option value="' + value.URoleId + '">' + value.URoleTitle + '</option>');
                });
            }

        }
    });
}
//End load user role dropdown


//Start save new user action

$("#users_add_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#users_add_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {

        var password = $("#add_password").val();
        if (password.length < 5) {
            iziToast.error({
                title: 'Error!',
                message: "Password length should be minimum five character long.",
                position: 'bottomRight'
            });
            return;
        }
        var username = $("#add_username").val();
        if (username.length < 3) {
            iziToast.error({
                title: 'Error!',
                message: "Username length should be minimum three character long.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#ls_country_permission_table_tbody tr").length < 1) {
            iziToast.error({
                title: 'Error!',
                message: "Plase add at least one company,unit permission.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#add_unit").val() == -1 && $("#add_user_role").val() == undefined) {
            iziToast.error({
                title: 'Error!',
                message: "User role should be Unit Admin if you assign to all unit.",
                position: 'bottomRight'
            });
            return;
        }

        var enrollCompanyLocations = _get_company_permission_data('ls_country_permission_table_tbody');



        json = {
            FullName: $("#add_fullname").val(),
            Username: username,
            EmployeeId: $("#add_employeeid").val(),
            Email: $("#add_email").val(),
            ContactNo: $("#add_contact_no").val(),
            URoleId: $("#add_user_role").val(),
            DepartmentId: $("#add_department").val(),
            DesignationId: $("#add_designation").val(),
            UserStatus: $("#add_user_status").val(),
            MenuList: $("#add_user_permissions").val(),
            TeamId: $("#users_add_team_name").val(),
            PassPhrase: password,
            EnrollCompanyLocations: enrollCompanyLocations
        };

        $.ajax({
            url: "/Users/AddUser/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
            success: function (resp) {

                if (resp.error) {
                    iziToast.error({
                        title: 'Warning!',
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

                    load_filtered_users(1);
                    $("#add_user_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }

});
function _get_company_permission_data(id) {

    var _comArr = [];
    //gets table
    var oTable = document.getElementById(id);
    //gets rows of table
    var rowLength = oTable.rows.length;
    //loops through rows    
    for (i = 0; i < rowLength; i++) {
        //gets cells of current row
        var oCells = oTable.rows.item(i).cells;
        //gets amount of cells of current row
        if (oCells.item(1).innerText != "" && oCells.item(2).innerText != "") {
            var _jsonArry = {
                CompanyId: oCells.item(1).getAttribute('data-id'),
                //CompanyName: oCells.item(1).innerText,
                LocationId: oCells.item(2).getAttribute('data-id')
                //OrderQuantityId: oTable.rows[i].getAttribute('data-id'),
                //DistributeCuttingQuantity: oCells.item(8).innerText
            }
            _comArr.push(_jsonArry);
        }
    }

    return _comArr;
}
//End save new user action

// Edit User
//Start update user action

$("#edit_user_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#edit_user_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        if ($("#ls_edit_country_permission_table_tbody tr").length < 1) {
            iziToast.error({
                title: 'Error!',
                message: "Please add at least one company,unit permission.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#add_unit").val() == -1 && $("#add_user_role").val() == undefined) {
            iziToast.error({
                title: 'Error!',
                message: "User role should be Unit Admin if you assign to all unit.",
                position: 'bottomRight'
            });
            return;
        }

        var enrollCompanyLocations = _get_company_permission_data('ls_edit_country_permission_table_tbody');



        json = {
            UserNo: $("#edit_fullname").data('userNo'),
            FullName: $("#edit_fullname").val(),
            EmployeeId: $("#edit_employeeid").val(),
            Email: $("#edit_email").val(),
            ContactNo: $("#edit_contact_no").val(),
            URoleId: $("#edit_user_role").val(),
            DepartmentId: $("#edit_department").val(),
            DesignationId: $("#edit_designation").val(),
            UserStatus: $("#edit_user_status").val(),
            MenuList: $("#edit_user_permissions").val(),
            TeamId: $("#edit_user_team_name").val(),
            EnrollCompanyLocations: enrollCompanyLocations
        };


        $.ajax({
            url: "/Users/EditUser/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
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
                    load_filtered_users(parseInt($("#users_pageno").text()));
                    $("#edit_user_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }
});
//End update user action

//Start change password user action

$("#change_password_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#change_password_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            userNo: $("#editpassword_email").data("userNo"),
            key: $("#editpassword_key").val(),
            email: $("#editpassword_email").val(),
            password: $("#editpassword_newpassword").val(),
        };

        $.ajax({
            url: "/Users/ChangePassword/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
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
                    load_filtered_users(parseInt($("#users_pageno").text()));
                    $("#change_password_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }
});
//End change password user action
 //regex
$('#add_username').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    iziToast.warning({
        title: 'Warning!',
        message: "Please enter username using only letters and dots",
        position: 'bottomRight'
    });
    return false;
});

//pagination

//Start users pagination action
$("#prev_users_list").on("click", function () {
    var currentPage = parseInt($("#users_pageno").text());
    if (currentPage === 1) {

        iziToast.warning({
            title: 'Warning!',
            message: "You are in page one",
            position: 'bottomRight'
        });
    }
    else {
        load_filtered_users(currentPage - 1);
        $("#users_pageno").text(currentPage - 1);
    }
});

$("#next_users_list").on("click", function () {
    var currentPage = parseInt($("#users_pageno").text());
    load_filtered_users(currentPage + 1);
    $("#users_pageno").text(currentPage + 1);
});

$("#users_pageno").on("click", function () {
    $("#users_pageno_input").removeClass("display-none");
    $("#users_pageno").addClass("display-none");
    $("#users_pageno_input").focus();
});

$("#users_pageno_input").blur(function () {
    $("#users_pageno").removeClass("display-none");
    $("#users_pageno_input").addClass("display-none");
});

$("#users_pageno_input").keydown(function (e) {

    if (e.keyCode === 13) {
        if ($("#users_pageno_input").val() > 0) {
            load_filtered_users($("#users_pageno_input").val());
            $("#users_pageno").text($("#users_pageno_input").val());
            $("#users_pageno_input").val("");
            $("#users_pageno").removeClass("display-none");
            $("#users_pageno_input").addClass("display-none");
        }
        else {
            $("#users_pageno_input").val("");

            iziToast.warning({
                title: 'Warning!',
                message: "Page number should be greater than zero",
                position: 'bottomRight'
            });
        }
    }
    else if (e.keyCode === 27) {
        $("#users_pageno").removeClass("display-none");
        $("#users_pageno_input").addClass("display-none");
    }

});

//End users pagination action