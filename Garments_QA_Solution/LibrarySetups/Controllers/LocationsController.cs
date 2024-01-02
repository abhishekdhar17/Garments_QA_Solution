using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VehicleRequisitionSystemWebApp.Context;
using VehicleRequisitionSystemWebApp.Gateway;
using VehicleRequisitionSystemWebApp.Models;
using VehicleRequisitionSystemWebApp.Utility;

namespace VehicleRequisitionSystemWebApp.LibrarySetups.Controllers
{
    public class LocationsController : Controller
    {
        // GET: Locations
        [Route("a/ls/locations")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("locations")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/LibrarySetups/Views/Locations/Index.cshtml");
        }

        [HttpPost]
        public ActionResult ShowLocations()
        {

            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                var locations = locationsGateway.GetLocations(dbContext);
                if (locations == null)
                {
                    return Json(new { error = true, message = "Locations data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = locations }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AddLocation([Bind(Include = "Name,CompanyId,ActiveStatus")] Location location)
        {
            location.InsertedBy = MySession.Current.UserNo;
            location.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }

            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.AddLocation(location, dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Location saved successfully." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Error! Location is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult EditLocation([Bind(Include = "Id,Name,CompanyId,ActiveStatus")] Location location)
        {
            
            location.UpdatedBy = MySession.Current.UserNo;

            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (location.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }

            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.EditLocation(location, dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Location updated successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == 0)
                {
                    return Json(new { error = true, message = "Location is not updated.You didn't change anything." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request detected! Location is not updated." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Location updation failed. Please try again later." }, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult DeleteLocation(int? locationId)
        {
            if (locationId == null || locationId <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                LocationsGateway locationsGateway = new LocationsGateway();
                int rowAffected = locationsGateway.DeleteLocation(locationId.Value, dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Location deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request detected! Location is not deleted." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Location deletion failed. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}