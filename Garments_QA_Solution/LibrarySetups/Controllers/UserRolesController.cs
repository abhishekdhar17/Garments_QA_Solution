using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VehicleRequisitionSystemWebApp.Context;
using VehicleRequisitionSystemWebApp.Gateway;
using VehicleRequisitionSystemWebApp.Utility;

namespace VehicleRequisitionSystemWebApp.LibrarySetups.Controllers
{
    public class UserRolesController : Controller
    {
        // GET: UserRoles
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/sign_in");
            }
            return View();
        }
        /*Start User Role Related Item*/

        [HttpPost]
        public ActionResult ShowUserRole()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return JavaScript(string.Format("window.location='{0}://{1}/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            }
            using (VehicleSystemDbContext db = new VehicleSystemDbContext())
            {
                UserRolesGateway userRolesGateway = new UserRolesGateway();
                var userRoleList = userRolesGateway.GetAllUserRoleList(MySession.Current.UserRoleId, db);
                if (userRoleList == null)
                {
                    return Json(new { error = true, message = "User Role's not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = userRoleList }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}