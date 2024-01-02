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
    public class MenuItemsController : Controller
    {
        // GET: MenuItems
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            return View();
        }

        [HttpPost]
        public ActionResult ShowMenuItemsForDropdown()
        {
            //if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            //{
            //    return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            //}
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                MenuItemsGateway menuListsGateway = new MenuItemsGateway();
                var menuLists = menuListsGateway.GetMenuItems(dbContext);
                if (menuLists == null)
                {
                    return Json(new { error = true, message = "MenuLists data no found." }, JsonRequestBehavior.AllowGet);

                }
                return Json(new { error = false, data = menuLists }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}