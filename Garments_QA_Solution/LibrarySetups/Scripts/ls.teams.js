// load menu for dropdown
load_menu_for_dropdown($("#ls_add_team_department").val())
function load_menu_for_dropdown(value) {
    json = {       
        departmentId: value,
    };
    $.ajax({
        url: '/Teams/ShowLeadersForDropdown',
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
                $("#ls_add_team_leader").empty();
                $("#ls_edit_team_leader").empty();


                var groupedMenuList = groupBy(resp.data, ['DesignationId'])

                $.each(groupedMenuList, function (index, _agroupedvalue) {
                    var add_option_grouped = $("#ls_add_team_leader").select2();
                    var _add_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].DesignationName).appendTo(add_option_grouped);

                    var edit_option_grouped = $("#ls_edit_team_leader").select2();
                    var _edit_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].DesignationName).appendTo(edit_option_grouped);
                    $.each(_agroupedvalue, function (index, value) {

                        _add_option_grouped.append('<option value="' + value.UserNo + '">' + value.FullName + '</option>');
                        _edit_option_grouped.append('<option value="' + value.UserNo + '">' + value.FullName + '</option>');
                        //$("#edit_user_permissions").append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');

                    });
                });

            }
        }
    });
}
$("#ls_add_team_btn").on("click", function () {
    $("#add_team_modal").modal("show");
    $("#ls_add_team_modal_form").trigger("reset");
    $("#ls_add_team_modal_form").removeClass('was-validated');
     /*load_menu_for_dropdown("#ls_add_team_department");*/
    /*$('.select2').trigger('change');*/
});
$("#add_team_modal").on("hidden.bs.modal", function () {
    load_menu_for_dropdown(-1);
});
$("#ls_edit_team_modal").on("hidden.bs.modal", function () {
    load_menu_for_dropdown(-1);
});
$(document).on('change', "#ls_add_team_department", function () {
    load_menu_for_dropdown($("#ls_add_team_department").val());
});
$(document).on('change', "#ls_edit_team_department", function () {
    load_menu_for_dropdown($("#ls_edit_team_department").val());
});


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
                var departmentSelect = document.getElementById("ls_add_team_department");
                show_department_select_items(departmentSelect, resp.data);
                var departmentSelectEdit = document.getElementById("ls_edit_team_department");
                show_department_select_items(departmentSelectEdit, resp.data);
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
            $("#ls_add_team_department").attr("disabled", true);
        },
        complete: function () {
            $("#ls_add_team_department").attr("disabled", false);
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


load_team_table();
function load_team_table() {
    $.ajax({
        type: "POST",
        url: '/Teams/ShowTeams',
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
                show_team_list(resp);
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
            $("#ls_team_loading_spinner").show();
        },
        complete: function () {
            $("#ls_team_loading_spinner").hide();
        }
    });
}
function StatusShow(status) {
    switch (status) {
        case 0:
            return "In-Active";
            break;
        case 1:
            return "Active";
            break;
        default:
            return "-";
    }
}
function show_team_list(resp) {
    $("#ls_team_table_tbody").empty();
    $("#ls_team_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Team data not available.",
            position: 'bottomRight'
        });
    }
    var sl = 0;
    $.each(resp.data, function (index, value) {
        console.log(value);
        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var departmentName = $("<td>").append(value.DepartmentName);
        var teamName = $("<td>").append(value.TeamName);
        var teamLeaderCell = $("<td>");
        $("<a>").attr({ "class": "btn btn-secondary m-2", "data-bs-toggle": "collapse", "href": "#COLP" + index, "role": "button", "aria-expanded": "false", "aria-controls": "COLP" + index }).append('Team Leaders <i class="bi bi-arrows-expand"></i>').appendTo(teamLeaderCell);

        var _collapse = $("<div>").attr({ "class": "collapse", "id": "COLP" + index }).appendTo(teamLeaderCell);
        $.each(value.EnrollTeamLeaders, function (index, per) {
            _collapse.append($("<div>").attr("class", "badge bg-info m-1").append(per.LeaderName));

        })
        departmentActiveStatus = $("<td>").append(StatusShow(value.DepartmentActiveStatus));

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        var editIcon = $("<i>").attr({
            "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Edit Team"
        }).appendTo(icondiv);
        var deleteIcon = $("<i>").attr({
            "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Delete Team"
        }).appendTo(icondiv);
        $("<tr>").attr("class", "text-center").append(slnocell, departmentName, teamName, teamLeaderCell, departmentActiveStatus,  iconcell).appendTo("#ls_team_table_tbody");

        (function ($) {
            editIcon.on("click", function (e) {
                e.preventDefault();               
                
                $("#ls_edit_team_modal").modal("show");
                $("#ls_edit_team_name").data("teamId", value.TeamId);
                $("#ls_edit_team_name").val(value.TeamName);
                $("#ls_edit_team_department").val(value.DepartmentName);
                $("#ls_edit_team_department").val(value.DepartmentId);
                $("#ls_edit_team_status").val(value.TeamActiveStatus);
                load_menu_for_dropdown($("#ls_edit_team_department").val());

                var Values = new Array();

                $.each(value.EnrollTeamLeaders, function (index, value) {
                    Values.push(value.UserNo);
                });

                console.log(Values);
                $("#ls_edit_team_leader").val(Values).trigger('change');
               
                
            });
            deleteIcon.on("click", function (e) {
                e.preventDefault();
                $("#ls_delete_team_modal").modal("show");
                $("#ls_delete_team_id_hidden").data("teamId", value.TeamId);
            });

        })(jQuery);
    });
    let jquery_table = $("#ls_team_table").DataTable();
}
//add team
$("#ls_add_team_modal_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#ls_add_team_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            Name: $("#ls_add_team_name").val(),
            DepartmentId: $("#ls_add_team_department").val(),
            ActiveStatus: $("#ls_add_team_status").val(),
            TeamLeaderList: $("#ls_add_team_leader").val(),
        };

        $.ajax({
            url: '/Teams/AddTeam',
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
                    $("#add_team_modal").modal("hide");
                    iziToast.success({
                        title: 'Saved!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_team_table();

                    $("#ls_add_team_modal_form").removeClass('was-validated');
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
                $("#ls_team_loading_spinner").show();
            },
            complete: function () {
                $("#ls_team_loading_spinner").hide();
            }
        });
    }

});
//update team
$("#ls_edit_team_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ls_edit_team_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            Id: $("#ls_edit_team_name").data("teamId"),
            Name: $("#ls_edit_team_name").val(),
            DepartmentId: $("#ls_edit_team_department").val(),
            ActiveStatus: $("#ls_edit_team_status").val(),
            TeamLeaderList: $("#ls_edit_team_leader").val()
        };

        $.ajax({
            url: '/Teams/EditTeam',
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
                    $("#ls_edit_team_modal").modal("hide");
                    iziToast.success({
                        title: 'Updated!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_team_table();

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
                $("#ls_team_loading_spinner").show();
            },
            complete: function () {
                $("#ls_team_loading_spinner").hide();
            }
        });
    }

});
//delete team
$("#ls_delete_team_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ls_delete_team_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            teamId: $("#ls_delete_team_id_hidden").data("teamId"),
        };
        console.log(json);
        $.ajax({
            url: '/Teams/DeleteTeam',
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
                    $("#ls_delete_team_modal").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_team_table();

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
                $("#ls_team_loading_spinner").show();
            },
            complete: function () {
                $("#ls_team_loading_spinner").hide();
            }
        });
    }

});
