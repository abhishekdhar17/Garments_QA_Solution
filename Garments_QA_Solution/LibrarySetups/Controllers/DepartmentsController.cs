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
    public class DepartmentsController : Controller
    {
       
        // GET: Departments
        [Route("a/ls/departments")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("departments")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/LibrarySetups/Views/Departments/Index.cshtml");
        }

        [HttpPost]
        public ActionResult AddDepartment([Bind(Include = "name,activeStatus")] Department department)
        {
            department.InsertedBy = MySession.Current.UserNo;
            department.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowEffected = departmentsGateway.AddDepartment(department, dbContext);
                if(rowEffected>0)
                {
                    return Json(new {error=false, message ="Department Saved Successfully."},JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Error! Department is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult ShowDepartments()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                var departments = departmentsGateway.GetDepartments(dbContext);
                if(departments==null)
                {
                    return Json(new { error = true, message = "Departments data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = departments }, JsonRequestBehavior.AllowGet);
            }
        }
       
        [HttpPost]
        public ActionResult DeleteDepartment(int? departmentId)
        {
            if(departmentId==null || departmentId<=0)
            {
                return Json(new {error=true,message= "Invalid request detected." },JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext=new VehicleSystemDbContext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowAffected = departmentsGateway.DeleteDepartment(Convert.ToInt32(departmentId), dbContext);
                if(rowAffected>0)
                {
                    return Json(new {error=false,message= "Department deleted successfully." },JsonRequestBehavior.AllowGet);
                }
                if(rowAffected==-3)
                {
                    return Json(new { error = true, message = "Invalid request Department! Department is not deleted." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Department deletion failed. Please try again later." }, JsonRequestBehavior.AllowGet);
            }
        } 
        [HttpPost]
        public ActionResult EditDepartment([Bind(Include = "Id,Name,ActiveStatus")] Department department)
        {
            department.UpdatedBy = MySession.Current.UserNo;
            if (department.Id <= 0)
            {
                return Json(new { error = true, message = "Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext=new VehicleSystemDbContext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                int rowAffected = departmentsGateway.UpdateDepartment(department,dbContext);
                if(rowAffected>0)
                {
                    return Json(new { error = false, message = "Department updated successfully." }, JsonRequestBehavior.AllowGet);
                }
                if (rowAffected == 0)
                {
                    return Json(new { error = true, message = "Department is not updated.You did not change anything." }, JsonRequestBehavior.AllowGet);
                }
                else if (rowAffected == -3)
                {
                    return Json(new { error = true, message = "Invalid request detected! Department is not updated." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = true, message = "Department updation failed. Please try again later." }, JsonRequestBehavior.AllowGet);

            }
        }
        [HttpPost]
        public ActionResult ShowDepartmentsForDropdown()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                DepartmentsGateway departmentsGateway = new DepartmentsGateway();
                var data = departmentsGateway.GetDepartmentsForDropdown(dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Departments,Teams data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}