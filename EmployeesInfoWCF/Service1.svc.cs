using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace EmployeesInfoWCF
{
	// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
	// NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
	public class Service1 : IService1
	{
		public bool AuthenticateUser(User user)
		{
			bool isAuthenticated = false;

			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";

			string query = "Select * from Users where UserName=@UserName and Password=@Password";

			try
			{
				using (SqlConnection con = new SqlConnection(connectionString))
				{
					using (SqlCommand cmd = new SqlCommand(query, con))
					{
						con.Open();
						cmd.Parameters.AddWithValue("@UserName", user.UserName);
						cmd.Parameters.AddWithValue("@Password", user.Password);
						SqlDataReader reader = cmd.ExecuteReader();
						while (reader.Read()) { isAuthenticated = true; }
						con.Close();
					}
				}
			}
			catch (SqlException)
			{
				isAuthenticated = false;
				throw;
			}
			catch (Exception)
			{
				isAuthenticated = false;
				throw;
			}
			return isAuthenticated;
			//return System.Runtime.Serialization.Json(new { isAuthenticated });
		}

		public List<Employee> GetEmpData()
		{
			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";
			
			string query = "Select * from Employees order by Id";

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

		public string AddData(Employee emp)
		{
			string newId = string.Empty;
			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";

			string query = "Insert Into Employees(Name, Salary) Values(@Name, @Salary)     Select top 1 Id from Employees order by 1 desc";

			try
			{
				using (SqlConnection con = new SqlConnection(connectionString))
				{
					using (SqlCommand cmd = new SqlCommand(query, con))
					{
						cmd.Parameters.AddWithValue("@Name", emp.Name);
						cmd.Parameters.AddWithValue("@Salary", emp.Salary);
						con.Open();
						SqlDataReader reader = cmd.ExecuteReader();
						while (reader.Read())
						{
							newId = reader["Id"].ToString();
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
			return newId;
		}

		public void DeleteData(string empId)
		{
			string newId = string.Empty;
			string connectionString = @"Data Source = (LocalDB)\Local; Initial Catalog = EmployeeInfo; Integrated Security = True";

			string query = "Delete from Employees where Id=@Id";

			try
			{
				using (SqlConnection con = new SqlConnection(connectionString))
				{
					using (SqlCommand cmd = new SqlCommand(query, con))
					{
						cmd.Parameters.AddWithValue("@Id", empId);
						con.Open();
						cmd.ExecuteNonQuery();
						con.Close();
					}
				}
			}
			catch (SqlException ex)
			{
				throw;
			}
			catch (Exception)
			{
				throw;
			}
		}

	}
}
