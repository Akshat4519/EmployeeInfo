using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace EmployeesInfoWCF
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public List<Employee> GetEmpData()
        {
            string query = "Select * from Employees";

            string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";

            List<Employee> emp = new List<Employee>();

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    con.Open();


                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Employee tempEmp = new Employee
                                {
                                    Id = reader["Id"].ToString(),
                                    Name = reader["Name"].ToString(),
                                    Salary = reader["Salary"].ToString()
                                };
                                emp.Add(tempEmp);
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
            return emp;
        }

		public void AddEmployee()
		{

		}
    }
}
