using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace WebResults.Model
{
	[Table(RESULTS_TABLE)]
	public class Result
	{
		internal const string RESULTS_TABLE = "results";

		[JsonPropertyName("userId")]
		[Column("user_id")]
		public int UserId { get; set; }
		
		[JsonPropertyName("registered")]
		[Column("registered")]
		public DateTime Registered { get; set; }
		
		[JsonPropertyName("lastActivity")]
		[Column("last_activity")]
		public DateTime LastActivity { get; set; }

		[JsonPropertyName("id")]
		[Key]
		[Column("id")]
		public int Id { get; set; }

		private void Validate()
		{
			
		}
	}
}