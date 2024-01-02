@Code
    ViewData("Title") = "User Dashboard"
End Code


@Code
    Layout = "~/Views/Shared/_MasterLayout.cshtml"
End Code

    <link href="~/Content/assets/vendors/select2/dist/css/select2.min.css" rel="stylesheet" />
    <style>
        .was-validated select.select2:invalid + .select2.select2-container.select2-container--default span.select2-selection, select.select2.is-invalid + .select2.select2-container.select2-container--default span.select2-selection {
            border-color: #fa5c7c;
            padding-right: 2.25rem;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fa5c7c' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23fa5c7c' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }

        .was-validated select.select2:invalid + .select2.select2-container.select2-container--default .select2-selection__arrow, select.select2.is-invalid + .select2.select2-container.select2-container--default .select2-selection__arrow {
            right: 25px !important;
        }

        .was-validated select.select2:valid + .select2.select2-container.select2-container--default span.select2-selection, select.select2.is-valid + .select2.select2-container.select2-container--default span.select2-selection {
            border-color: #0acf97;
            padding-right: 2.25rem;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%230acf97' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }

        .was-validated select.select2:valid + .select2.select2-container.select2-container--default .select2-selection__arrow, select.select2.is-valid + .select2.select2-container.select2-container--default .select2-selection__arrow {
            right: 25px !important;
        }

        .modal-body {
            height: 55vh;
            overflow-y: auto;
        }
    </style>
    
    <div class="page-heading">
        <section class="section">
            <div class="section-body">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <div class="card  shadow">
                            <div class="card-header" style="background-color:#e0e0e0">
                                <div class="row">
                                    <div class="col-12 col-md-6 order-md-1 order-last">
                                        <h3>User Dashboard</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <!--  Dashboard Body start  -->










                                <!--  Dashboard Body Finish  -->

                                <div class="row">
                                    <!--table info-->

                                    <div class="col-md-4">
                                        <span class="badge bg-primary mt-3" id="user_table_info"></span>
                                    </div>
                                    <!--table spinner-->

                                    <div class="col-md-4">
                                        <div class="text-center" id="users_loading_spinner">
                                            <img src="~/Content/assets/vendors/svg-loaders/rings.svg" class="" style="width: 3rem" alt="audio"><span style="font-weight: 700">Loading...</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

