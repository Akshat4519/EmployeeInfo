using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace EmployeesInfoWCF
{
	// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
	[ServiceContract]
	public interface IService1
	{
		[OperationContract]
		[WebInvoke(Method="POST",
			ResponseFormat = WebMessageFormat.Json,
			RequestFormat = WebMessageFormat.Json,
			UriTemplate = "/AuthenticateUser/")]
		bool AuthenticateUser(User user);

		[OperationContract]
		[WebGet(RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json,
			UriTemplate = "/GetData/")]
		List<Employee> GetEmpData();

		[OperationContract]
		[WebInvoke(Method = "POST",
			ResponseFormat = WebMessageFormat.Json,
			RequestFormat = WebMessageFormat.Json,
			UriTemplate = "/SaveData/")]
		void SaveData(Employee emp);

		[OperationContract]
		[WebInvoke(UriTemplate = "/AddData/")]
		string AddData(Employee emp);

		[OperationContract]
		[WebInvoke(UriTemplate = "/DeleteData/")]
		void DeleteData(string empId);
	}


	// Use a data contract as illustrated in the sample below to add composite types to service operations.
	[DataContract]
	public class Employee
	{
		[DataMember]
		public string Id
		{
			get;
			set;
		}

		[DataMember]
		public string Name
		{
			get;
			set;
		}


		[DataMember]
		public string Salary
		{
			get;
			set;
		}
	}

	[DataContract]
	public class User
	{
		[DataMember]
		public string UserName
		{
			get;
			set;
		}

		[DataMember]
		public string Password
		{
			get;
			set;
		}
	}
}
