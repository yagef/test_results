using Microsoft.EntityFrameworkCore;

namespace WebResults.Model
{
	public class AppDataContext : DbContext
	{
		public DbSet<Result> Results { get; set; }
		
		public AppDataContext(DbContextOptions<AppDataContext> options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Result>().ToTable(Result.RESULTS_TABLE);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql("Host=localhost;Database=test_results;Username=postgres;Password=root");
		}
	}
}