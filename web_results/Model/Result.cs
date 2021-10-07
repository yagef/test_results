using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace WebResults.Model
{
	[Table(RESULTS_TABLE)]
	public class Result
	{
		internal const string RESULTS_TABLE = "results";

		[Column("user_id")]
		public int UserId { get; set; }
		
		[Column("registered")]
		public DateTime Registered { get; set; }
		
		[Column("last_activity")]
		public DateTime LastActivity { get; set; }

		[Key]
		[Column("id")]
		public int Id { get; set; }
	}
}