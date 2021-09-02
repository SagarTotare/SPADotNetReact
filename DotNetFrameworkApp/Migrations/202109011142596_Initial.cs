namespace DotNetFrameworkApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Students", "Photo", c => c.String());
            AlterColumn("dbo.Students", "Height", c => c.Int(nullable: false));
            AlterColumn("dbo.Students", "Weight", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Students", "Weight", c => c.Single(nullable: false));
            AlterColumn("dbo.Students", "Height", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Students", "Photo", c => c.Binary());
        }
    }
}
