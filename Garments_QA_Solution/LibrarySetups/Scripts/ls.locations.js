
// load company for dropdown
load_company_for_dropdown();
function load_company_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompaniesForDropdown',
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
                $("#ls_add_location_company").empty();
                $("#ls_edit_location_company").empty();

                $("#ls_add_location_company").append('<option value="">Select Company</option>');
                $("#ls_edit_location_company").append('<option value="">Select Company</option>');

                $.each(resp.data, function (index, value) {

                    $("#ls_add_location_company").append('<option value="' + value.Id + '">' + value.Name + '</option>');
                    $("#ls_edit_location_company").append('<option value="' + value.Id + '">' + value.Name + '</option>');
                });
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
            $("#ls_filter_location_company").attr("disabled", true);
            $("#ls_add_location_company").attr("disabled", true);
            $("#ls_edit_location_company").attr("disabled", true);
        },
        complete: function () {
            $("#ls_filter_location_company").attr("disabled", false);
            $("#ls_add_location_company").attr("disabled", false);
            $("#ls_edit_location_company").attr("disabled", false);
        }
    });
}

load_location_table();
function load_location_table() {
    $.ajax({
        type: "POST",
        url: '/Locations/ShowLocations',
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
                show_location_list(resp);
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
            $("#ls_location_loading_spinner").show();
        },
        complete: function () {
            $("#ls_location_loading_spinner").hide();
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
function show_location_list(resp) {
    $("#ls_location_table_tbody").empty();
    $("#ls_location_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Locations data not available.",
            position: 'bottomRight'
        });
    }
    var sl = 0;
    $.each(resp.data, function (index, value) {
        console.log(value);
        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var locationName = $("<td>").append(value.LocationName);
        var companyName = $("<td>").append(value.CompanyName);
        locationActiveStatus = $("<td>").append(StatusShow(value.LocationActiveStatus));

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        var editIcon = $("<i>").attr({
            "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Edit Company"
        }).appendTo(icondiv);
        var deleteIcon = $("<i>").attr({
            "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
            "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            "title": "Delete Company"
        }).appendTo(icondiv);
        $("<tr>").attr("class", "text-center").append(slnocell, locationName, companyName, locationActiveStatus, iconcell).appendTo("#ls_location_table_tbody");

        (function ($) {
            editIcon.on("click", function (e) {
                e.preventDefault();
                $("#ls_edit_location_modal").modal("show");
                $("#ls_edit_location_name").data("locationId", value.LocationId);
                $("#ls_edit_location_name").val(value.LocationName);
                $("#ls_edit_location_company").val(value.CompanyName);
                $("#ls_edit_location_company").val(value.CompanyId);
                $("#ls_edit_location_status").val(value.LocationActiveStatus);
            });
            deleteIcon.on("click", function (e) {
                e.preventDefault();
                $("#ls_delete_location_modal").modal("show");
                $("#ls_delete_location_id_hidden").data("locationId", value.LocationId);
            });

        })(jQuery);
    });
    let jquery_table = $("#ls_location_table").DataTable();
}
// add event listner
$("#ls_add_location_btn").on("click", function () {
    $("#add_location_modal").modal("show");
    $("#ls_add_location_modal_form").trigger("reset");
    $("#ls_add_location_modal_form").removeClass('was-validated');
});
//add location
$("#ls_add_location_modal_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#ls_add_location_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            Name: $("#ls_add_location_name").val(),
            CompanyId: $("#ls_add_location_company").val(),
            ActiveStatus: $("#ls_add_location_status").val()
        };

        $.ajax({
            url: '/Locations/AddLocation',
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
                    $("#add_location_modal").modal("hide");
                    iziToast.success({
                        title: 'Saved!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_location_table();

                    $("#ls_add_location_modal_form").removeClass('was-validated');
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
                $("#ls_location_loading_spinner").show();
            },
            complete: function () {
                $("#ls_location_loading_spinner").hide();
            }
        });
    }

});
//update location
$("#ls_edit_location_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ls_edit_location_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            Id: $("#ls_edit_location_name").data("locationId"),
            Name: $("#ls_edit_location_name").val(),
            CompanyId: $("#ls_edit_location_company").val(),
            ActiveStatus: $("#ls_edit_location_status").val()
        };

        $.ajax({
            url: '/Locations/EditLocation',
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
                    $("#ls_edit_location_modal").modal("hide");
                    iziToast.success({
                        title: 'Updated!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_location_table();

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
                $("#ls_location_loading_spinner").show();
            },
            complete: function () {
                $("#ls_location_loading_spinner").hide();
            }
        });
    }

});

//delete location
$("#ls_delete_location_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ls_delete_location_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            locationId: $("#ls_delete_location_id_hidden").data("locationId"),
        };

        $.ajax({
            url: '/Locations/DeleteLocation',
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
                    $("#ls_delete_location_modal").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_location_table();

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
                $("#ls_location_loading_spinner").show();
            },
            complete: function () {
                $("#ls_location_loading_spinner").hide();
            }
        });
    }

});