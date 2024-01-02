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
    public class CompaniesController : Controller
    {
        // GET: Companies
        [Route("a/ls/companies")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("companies")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/LibrarySetups/Views/Companies/Index.cshtml");
        }
        [HttpPost]
        public ActionResult ShowCompanies ()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var companies = companiesGateway.GetCompanies(dbContext);
                if (companies == null)
                {
                    return Json(new { error = true, message = "Companies data not found." }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { error = false, data = companies}, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AddCompany([Bind(Include = "name,activeStatus")] Company company)
        {
            company.InsertedBy = MySession.Current.UserNo;
            company.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                int rowEffected = companiesGateway.AddCompany(company, dbContext);
                if (rowEffected > 0)
                {
                    return Json(new { error = false, message = "Company Saved Successfully." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Error! Company is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult EditCompany([Bind(Include = "Id,Name,ActiveStatus")] Company company)
        {
            
            company.UpdatedBy = MySession.Current.UserNo;
            if (company.Id <= 0)
            {
                return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                int rowAffected = companiesGateway.EditCompany(company, dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Company updated successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == 0)
                {
                    return Json(new { error = true, message = "Company is not updated.You did not change anything." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request detected! Company is not updated." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Company updation failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }
        }
        [HttpPost]
        public ActionResult DeleteCompany(int? Id)
        {
            if (Id == null || Id <= 0)
            {
                return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                int rowAffected = companiesGateway.DeleteCompany(Convert.ToInt32(Id), dbContext);
                if (rowAffected > 0)
                {
                    return Json(new { error = false, message = "Company deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request Company! Company is not deleted." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Company deletion failed. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult ShowCompaniesForDropdown()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompaniesForDropdown(dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Companies,Location data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult ShowCompanyLocationsForDropdown()
        {
            //if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            //{
            //    return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            //}
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                CompaniesGateway companiesGateway = new CompaniesGateway();
                var data = companiesGateway.GetCompanyLocationsForDropdown(new int[] { }, new int[] { }, dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Companies,Location data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}