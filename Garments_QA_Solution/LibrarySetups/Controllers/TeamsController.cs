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
    public class TeamsController : Controller
    {
       [Route("a/ls/teams")]
        public ActionResult Index()
        {
            if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            {
                return Redirect("~/admin/sign_in");
            }
            if (!MySession.Current.NavList.Contains("teams")) // means short name in the menulist db table
            {
                return Json(new { error = true, message = "Invalid request detected! You are not authorized to access." }, JsonRequestBehavior.AllowGet);
            }
            return View("~/LibrarySetups/Views/Teams/Index.cshtml");
        }
        [HttpPost]
        public ActionResult ShowTeams()
        {

            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                TeamsGateway teamsGateway = new TeamsGateway();
                var teams = teamsGateway.GetTeams(dbContext);
                if (teams == null)
                {
                    return Json(new { error = true, message = "Team data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data = teams }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult AddTeam([Bind(Include = "Name,DepartmentId,ActiveStatus,TeamLeaderList")] Team team)
        {
            team.InsertedBy = MySession.Current.UserNo;
            team.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }

            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                TeamsGateway teamsGateway = new TeamsGateway();
                using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {                       
                        int teamId = teamsGateway.AddTeam(team, dbContext);
                        if (teamId <= 0)
                        {
                            throw new Exception();
                        }
                        if(team.TeamLeaderList!=null)
                        {
                            foreach (int teamleaderId in team.TeamLeaderList)
                            {
                                EnrollTeamLeader enrollTeamLeader = new EnrollTeamLeader();
                                enrollTeamLeader.UserNo = teamleaderId;
                                enrollTeamLeader.TeamId = teamId;

                                EnrollTeamLeadersGateway enrollTeamLeadersGateway = new EnrollTeamLeadersGateway();

                                int rowaffected = enrollTeamLeadersGateway.SaveEnrollTeamLeader(enrollTeamLeader, dbContext);

                                if (rowaffected <= 0)
                                {
                                    throw new Exception();
                                }
                            }
                        }
                       
                        dbContext.SaveChanges();
                        dbContextTransaction.Commit();
                        return Json(new { error = false, message = "Team saved successfully." }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return Json(new { error = true, message = "Team is not saved. Please try again later." }, JsonRequestBehavior.AllowGet);
                    }
                }
              
            }
        }
        [HttpPost]
        public ActionResult EditTeam([Bind(Include = "Id,Name,DepartmentId,ActiveStatus,TeamLeaderList")] Team team)
        {
            
            team.UpdatedBy = MySession.Current.UserNo;
            if (!ModelState.IsValid)
            {
                return Json(new { error = true, message = "Please give the information properly." }, JsonRequestBehavior.AllowGet);
            }
            if (team.Id <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                TeamsGateway teamsGateway = new TeamsGateway();
               using (var dbContextTransaction = dbContext.Database.BeginTransaction())
               {
                   try
                   {
                        int teamId = teamsGateway.EditTeam(team, dbContext);
                        if (teamId <= 0)
                        {
                            throw new Exception();
                        }
                        if (team.TeamLeaderList != null)
                        {
                            EnrollTeamLeadersGateway enrollTeamLeadersGateway = new EnrollTeamLeadersGateway();
                            int rowaffect2 = enrollTeamLeadersGateway.DeleteExistEnrollTeamLeader(teamId, dbContext);
                            if (rowaffect2 < 0)
                            {
                                throw new Exception();
                            }
                            foreach (int teamleaderId in team.TeamLeaderList)
                            {
                                EnrollTeamLeader enrollTeamLeader = new EnrollTeamLeader();
                                enrollTeamLeader.UserNo = teamleaderId;
                                enrollTeamLeader.TeamId = teamId;


                                int rowaffected = enrollTeamLeadersGateway.SaveEnrollTeamLeader(enrollTeamLeader, dbContext);

                                if (rowaffected <= 0)
                                {
                                    throw new Exception();
                                }
                            }
                        }
                        
                        dbContext.SaveChanges();
                        dbContextTransaction.Commit();
                        return Json(new { error = false, message = "Team updated successfully." }, JsonRequestBehavior.AllowGet);
                   }
                   catch (Exception)
                   {
                        dbContextTransaction.Rollback();
                        return Json(new { error = true, message = "Team is not updated. Please try again later." }, JsonRequestBehavior.AllowGet);
                   }
               }
                
            }
        }
        [HttpPost]
        public ActionResult DeleteTeam(int? teamId)
        {
            if (teamId == null || teamId <= 0)
            {
                return Json(new { error = true, message = "Error! Invalid request detected." }, JsonRequestBehavior.AllowGet);
            }
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                using (var dbContextTransaction = dbContext.Database.BeginTransaction())
                {
                    try
                    {
                        EnrollTeamLeadersGateway enrollTeamLeadersGateway = new EnrollTeamLeadersGateway();
                        int rowaffect2 = enrollTeamLeadersGateway.DeleteExistEnrollTeamLeader(teamId.Value, dbContext);
                        if (rowaffect2 < 0)
                        {
                            throw new Exception();
                        }
                        TeamsGateway teamsGateway = new TeamsGateway();
                        int rowAffected = teamsGateway.DeleteTeam(teamId.Value, dbContext);
                        if (rowAffected <= 0)
                        {
                            throw new Exception();
                        }
                        else if (rowAffected == -3)
                        {
                            dbContextTransaction.Rollback();
                            return Json(new { error = true, message = "Invalid request detected! Team is not deleted." }, JsonRequestBehavior.AllowGet);
                        }
                        dbContext.SaveChanges();
                        dbContextTransaction.Commit();
                        return Json(new { error = false, message = "Team deleted successfully." }, JsonRequestBehavior.AllowGet);

                    }
                    catch(Exception)
                    {
                        dbContextTransaction.Rollback();
                        return Json(new { error = true, message = "Team deletion failed. Please try again later." }, JsonRequestBehavior.AllowGet);

                    }
                }
            }
        }
        [HttpPost]
        public ActionResult ShowLeadersForDropdown(int departmentId)
        {
            //if (MySession.Current.UserNo <= 0 || MySession.Current.UserRoleId <= 0)
            //{
            //    return JavaScript(string.Format("window.location='{0}://{1}/admin/sign_in'", Request.Url.Scheme, Request.Url.Authority));
            //}
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                TeamsGateway teamsGateway = new TeamsGateway();
                var data = teamsGateway.GetTeamLeaderDepAndDegWiseForDropdown(departmentId, dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult ShowTeamsForDropdown()
        {
            using (VehicleSystemDbContext dbContext = new VehicleSystemDbContext())
            {
                TeamsGateway teamsGateway = new TeamsGateway();
                var data = teamsGateway.GetTeamForDropdown(dbContext);
                if (data == null)
                {
                    return Json(new { error = true, message = "Team data not found." }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { error = false, data }, JsonRequestBehavior.AllowGet);
            }
        }
        
    }
    
}