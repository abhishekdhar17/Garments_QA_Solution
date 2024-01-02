@ModelType RegisterViewModel
@Code
    ViewBag.Title = "Register"
End Code

<h2>@ViewBag.Title.</h2>

@Using Html.BeginForm("Register", "Account", FormMethod.Post, New With {.class = "form-horizontal", .role = "form"})

    @Html.AntiForgeryToken()

    @<text>
    <h4>Create a new account.</h4>
    <hr />
    @Html.ValidationSummary()
    <div class="form-group">
        @Html.LabelFor(Function(m) m.UserName, New With {.class = "col-md-2 control-label"})
        <div class="col-md-10">
            @Html.TextBoxFor(Function(m) m.UserName, New With {.class = "form-control"})
        </div>
    </div>
<!--
    <div class="form-group">
    <label for="helpInputTop" class="col-md-2 control-label">Employee ID</label>
    <div class="col-md-10">
        <select class="form-control" id="Employee_ID" name="Employee_ID" required>
            <option value="">Select an Employee ID</option>
        </select>
    </div>
    </div>

    <div class="form-group">
        <label for="helpInputTop" class="col-md-2 control-label">Department</label>
        <div class="col-md-10">
            <select class="form-control" id="Department" name="Department" required>
                <option value="">Select a Department</option>
            </select>
        </div>
    </div>   

    <div class="form-group">
        <label for="helpInputTop" class="col-md-2 control-label">User Role</label>
        <div class="col-md-10">
            <select class="form-control" id="UserRole" name="UserRole" required>
                <option value="">Select an User Role</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label for="helpInputTop" class="col-md-2 control-label">Company</label>
        <div class="col-md-10">
            <select class="form-control" id="Company" name="Company" required>
                <option value="">Select a Company</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label for="helpInputTop" class="col-md-2 control-label">Location</label>
        <div class="col-md-10">
            <select class="form-control" id="Location" name="Location" required>
                <option value="">Select a Location</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label for="helpInputTop" class="col-md-2 control-label">Team</label>
        <div class="col-md-10">
            <select class="form-control" id="Team" name="Team" required>
                <option value="">Select a Team</option>
            </select>
        </div>
    </div>
    -->
    <div class="form-group">
        @Html.LabelFor(Function(m) m.Password, New With {.class = "col-md-2 control-label"})
        <div class="col-md-10">
            @Html.PasswordFor(Function(m) m.Password, New With {.class = "form-control"})
        </div>
    </div>
    <div class="form-group">
        @Html.LabelFor(Function(m) m.ConfirmPassword, New With {.class = "col-md-2 control-label"})
        <div class="col-md-10">
            @Html.PasswordFor(Function(m) m.ConfirmPassword, New With {.class = "form-control"})
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <input type="submit" class="btn btn-default" value="Register" />
        </div>
    </div>
    </text>
End Using

@section Scripts
    @Scripts.Render("~/bundles/jqueryval")
End Section
