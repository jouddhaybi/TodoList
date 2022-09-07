using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using WebApplication2.Models;
using Newtonsoft.Json;
using static WebApplication2.Models.DataViewModel;
using System.Globalization;

namespace WebApplication2.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        DataViewModel context = new DataViewModel();
        public string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult GetImportance()
        {
            List<Importance> ImportanceList = new List<Importance>();
            ImportanceList = context.Importances.ToList();
            string jsonResult = JsonConvert.SerializeObject(ImportanceList);
            return Json(jsonResult, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CreateTodo(string Title , string Category , string DueDate , string Estimate , int Importance)
        {
            SqlConnection cnn = new SqlConnection(cnnString);
            SqlCommand param = new SqlCommand("SP_CreateTodo",cnn);
            param.CommandType = System.Data.CommandType.StoredProcedure;
            param.CommandText = "SP_CreateTodo";
            param.Parameters.Add(new SqlParameter("@Title", Title));
            param.Parameters.Add(new SqlParameter("@Category", Category));
            param.Parameters.Add(new SqlParameter("@DueDate", DueDate));
            param.Parameters.Add(new SqlParameter("@Estimate", Estimate));
            param.Parameters.Add(new SqlParameter("@CreationDate", DateTime.Now));
            //param.Parameters.Add(new SqlParameter("@EditDate", ""));
            param.Parameters.Add(new SqlParameter("@Importance", Importance));
            param.Parameters.Add(new SqlParameter("@StatusID", 1));
            try { 
                cnn.Open();
                object o = param.ExecuteNonQuery();
                cnn.Close();
                return Json(true , JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult GetTodo(string Search)
      {
            List<ToDo> TodoList = new List<ToDo>();
            SqlConnection cnn = new SqlConnection(cnnString);
            SqlCommand param = new SqlCommand("SP_Displaytodo",cnn);
            param.CommandType = System.Data.CommandType.StoredProcedure;
            param.CommandText = "SP_Displaytodo";
            param.Parameters.Add(new SqlParameter("SearchInput", Search));
            try { 
                 cnn.Open();
                SqlDataReader data = param.ExecuteReader();
            while (data.Read()) {
                ToDo todo = new ToDo();
                todo.TodoID = Convert.ToInt32(data["todoid"]);
                todo.Title = data["title"].ToString();
                todo.Category = data["category"].ToString();
                todo.DueDate =data["duedate"].ToString();
                todo.Estimate = data["estimate"].ToString();
                todo.ImportanceName = data["importancename"].ToString();
                TodoList.Add(todo);
            }
            return Json(new { data = TodoList }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult EditTodo(int TodoID,string Title, string Category, string DueDate, string Estimate)
        {
            SqlConnection cnn = new SqlConnection(cnnString);
            SqlCommand param = new SqlCommand("SP_EditTodo", cnn);
            param.CommandType = System.Data.CommandType.StoredProcedure;
            param.CommandText = "SP_EditTodo";
            param.Parameters.Add(new SqlParameter("@TodoID", TodoID));
            param.Parameters.Add(new SqlParameter("@Title", Title));
            param.Parameters.Add(new SqlParameter("@Category", Category));
            param.Parameters.Add(new SqlParameter("@DueDate", DueDate));
            param.Parameters.Add(new SqlParameter("@Estimate", Estimate));
            param.Parameters.Add(new SqlParameter("@EditDate", DateTime.Now));
            try
            {
                cnn.Open();
                object o = param.ExecuteNonQuery();
                cnn.Close();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
    }
}