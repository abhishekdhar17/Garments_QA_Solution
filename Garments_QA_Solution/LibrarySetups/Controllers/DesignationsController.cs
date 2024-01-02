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
    public class DesignationsController : Controller
    {
        // GET: Designations
        [Route("a/ls/designations")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("designations")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/LibrarySetups/Views/Designations/Index.cshtml");
        }
        [HttpPost]
        public ActionResult ShowDesignations()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                var designations = designationsGateway.GetDesignations(dbContext);
                if (designations == null)
                {
                    return Json(new { error = true, message = "Designations data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = designations }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AddDesignation([Bind(Include = "name,activeStatus")] Designation designation)
        {
            designation.InsertedBy = MySession.Current.UserNo;
            designation.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowEffected = designationsGateway.AddDesignation(designation, dbContext);
                if (rowEffected > 0)
                {
                    return Json(new { error = false, message = "Designation Saved Successfully." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Error! Department is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult DeleteDesignation(int? designationId)
        {
            if (designationId == null || designationId <= 0)
            {
                return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowAffected = designationsGateway.DeleteDesignation(Convert.ToInt32(designationId), dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Designation deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request Designation! Designation is not deleted." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Designation deletion failed. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult EditDesignation([Bind(Include = "Id,Name,ActiveStatus")] Designation designation)
        {
            
            designation.UpdatedBy = MySession.Current.UserNo;
            if (designation.Id <= 0)
            {
                return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                int rowAffected = designationsGateway.EditDesignation(designation, dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Designation updated successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == 0)
                {
                    return Json(new { error = true, message = "Designation is not updated.You did not change anything." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request detected! Designation is not updated." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Designation updation failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }
        }
        [HttpPost]
        public ActionResult ShowDesignationsForDropdown()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DesignationsGateway designationsGateway = new DesignationsGateway();
                var data = designationsGateway.GetDesignationsForDropdown(dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Designations data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}