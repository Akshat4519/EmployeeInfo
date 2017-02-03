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
			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";
			
			string query = "Select * from Employees";

			List<Employee> emp = new List<Employee>();

			try
			{
				using (SqlConnection con = new SqlConnection(connectionString))
				{
					using (SqlCommand cmd = new SqlCommand(query, con))
					{
						con.Open();
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
						con.Close();
					}
				}
			}
			catch (SqlException)
			{
				throw;
			}
			catch (Exception)
			{
				throw;
			}
			return emp;
		}

		public void SaveData(Employee emp)
		{
			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";

			string query = "Update Employees Set Name= @Name, Salary= @Salary where Id= @Id";

			try
			{
				using (SqlConnection con = new SqlConnection(connectionString))
				{
					using (SqlCommand cmd = new SqlCommand(query, con))
					{
						cmd.Parameters.AddWithValue("@Name", emp.Name);
						cmd.Parameters.AddWithValue("@Salary", emp.Salary);
						cmd.Parameters.AddWithValue("@Id", emp.Id);
						con.Open();
						cmd.ExecuteNonQuery();
						con.Close();
					}
				}
			}
			catch (SqlException)
			{
				throw;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public void AddData()
		{

		}
	}
}
