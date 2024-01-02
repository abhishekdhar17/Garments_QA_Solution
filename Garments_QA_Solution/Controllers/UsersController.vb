Imports System.Web.Mvc

Public Class UsersController
    Inherits Controller

    ' GET: /Users
    Function Index() As ActionResult
        Return View()
    End Function

    Function UserDashboard() As ActionResult

        Return View()
    End Function


End Class