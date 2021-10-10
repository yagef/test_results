using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using WebResults.Model;

namespace WebResults.Controllers
{
	[Route("api")]
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
		[Route("Load")]
		public IEnumerable<Result> Get()
		{
			return _context
				.Results
				.OrderBy(r => r.Id)
				.ToList();
		}

		[HttpPut]
		[Route("Put")]
		public IActionResult Put([FromBody] Result[] results)
		{
			if (results is null)
			{
				return BadRequest();
			}
			foreach (Result result in results)
			{
				result.Registered = result.Registered.ToLocalTime();
				result.LastActivity = result.LastActivity.ToLocalTime();
			}
			_context.UpdateRange(results);
			_context.SaveChanges();
			return Ok();
		}
	}
}