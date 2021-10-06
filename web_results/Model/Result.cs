using System;

namespace WebResults.Model
{
	public class Result
	{
		public int UserId { get; set; }
		public DateTime Registered { get; set; }
		public DateTime LastActivity { get; set; }
	}
}