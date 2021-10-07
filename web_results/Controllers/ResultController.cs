using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using WebResults.Model;

namespace WebResults.Controllers
{
	public class ResultController : Controller
	{
		private readonly AppDataContext _context;

		public ResultController(AppDataContext context)
		{
			_context = context;
			if (!_context.Results.Any())
			{
				var now = DateTime.UtcNow;
				_context.AddRange(new object[]
				{
					new Result {LastActivity = now.AddDays(-1), Registered = now, UserId = 0},
					new Result {LastActivity = now.AddDays(-3), Registered = now, UserId = 1},
					new Result {LastActivity = now.AddDays(-10), Registered = now, UserId = 2}
				});
				_context.SaveChanges();
			}
		}

		[HttpGet]
		[Route("api/Load")]
		public IEnumerable<Result> Get()
		{
			return _context.Results.ToList();
		}

		[HttpPut]
		[Route("api/Put")]
		public void Put(string payLoad)
		{
			if (string.IsNullOrEmpty(payLoad))
			{
				return;
			}
			
			var results = JsonSerializer.Deserialize<Result[]>(payLoad);
			_context.UpdateRange(results);
			_context.SaveChanges();
		}
	}
}