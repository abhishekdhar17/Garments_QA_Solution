
$("#ls_add_designation_btn").on("click", function () {
    $("#add_designation_modal").modal("show");
    $("#ls_add_designation_modal_form").trigger("reset");
    $("#ls_add_designation_modal_form").removeClass('was-validated');
});
load_designation_table();
function load_designation_table() {
    $.ajax({
        type: "POST",
        url: '/Designations/ShowDesignations',
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
                console.log(resp);
                show_designation_list(resp);
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
            $("#ls_designation_loading_spinner").show();
        },
        complete: function () {
            $("#ls_designation_loading_spinner").hide();
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
function show_designation_list(resp) {
    $("#ls_designation_table_tbody").empty();
    $("#ls_designation_table").DataTable().clear().destroy();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Designations data not available.",
            position: 'bottomRight'
        });
    }
    var sl = 0;
    $.each(resp.data, function (index, value) {
        console.log(value);
        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var designationName = $("<td>").append(value.Name);
        designationActiveStatus = $("<td>").append(StatusShow(value.ActiveStatus));

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
        $("<tr>").attr("class", "text-center").append(slnocell, designationName, designationActiveStatus, iconcell).appendTo("#ls_designation_table_tbody");

        (function ($) {
            editIcon.on("click", function (e) {
                e.preventDefault();
                $("#ls_edit_designation_modal").modal("show");
                $("#ls_edit_designation_name").data("designationId", value.Id);
                $("#ls_edit_designation_name").val(value.Name);
                $("#ls_edit_designation_status").val(value.ActiveStatus);
            });
            deleteIcon.on("click", function (e) {
                e.preventDefault();
                $("#ls_delete_designation_modal").modal("show");
                $("#ls_delete_designation_id_hidden").data("designationId", value.Id);
            });

        })(jQuery);
    });
    let jquery_table = $("#ls_designation_table").DataTable();
}
//add Designation
$("#ls_add_designation_modal_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#ls_add_designation_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            name: $("#ls_add_designation_name").val(),
            activeStatus: $("#ls_add_designation_status").val()
        };

        $.ajax({
            url: '/Designations/AddDesignation',
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

                    $("#add_designation_model").modal("hide");
                    iziToast.success({
                        title: 'Saved!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_designation_table();
                    $("#ls_add_designation_modal_form").removeClass('was-validated');
                    $("#add_designation_modal").modal("hide");
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
                $("#ls_designation_loading_spinner").show();
            },
            complete: function () {
                $("#ls_designation_loading_spinner").hide();
            }
        });
    }

});
//Delete designation
$("#ls_delete_designation_modal_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#ls_delete_designation_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            designationId: $("#ls_delete_designation_id_hidden").data("designationId"),
        };
        $.ajax({
            url: '/Designations/DeleteDesignation',
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
                    $("#ls_delete_designation_modal").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_designation_table();

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
                $("#ls_designation_loading_spinner").show();
            },
            complete: function () {
                $("#ls_designation_loading_spinner").hide();
            }
        });
    }
});

//Edit Designation
$("#ls_edit_designation_modal_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#ls_edit_designation_modal_form')[0].checkValidity() === false) {
        event.stopPropagation();
    }
    else {
        json = {
            Id: $("#ls_edit_designation_name").data("designationId"),
            name: $("#ls_edit_designation_name").val(),
            activeStatus: $("#ls_edit_designation_status").val()
        };

        $.ajax({
            url: '/Designations/EditDesignation',
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
                    $("#ls_edit_designation_modal").modal("hide");
                    iziToast.success({
                        title: 'Updated!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_designation_table();

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
                $("#ls_designation_loading_spinner").show();
            },
            complete: function () {
                $("#ls_designation_loading_spinner").hide();
            }
        });
    }
});