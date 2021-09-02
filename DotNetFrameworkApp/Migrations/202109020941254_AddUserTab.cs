namespace DotNetFrameworkApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserTab : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Grades",
                c => new
                    {
                        GradeId = c.Int(nullable: false, identity: true),
                        GradeName = c.String(),
                        Section = c.String(),
                    })
                .PrimaryKey(t => t.GradeId);
            
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        StudentID = c.Int(nullable: false, identity: true),
                        StudentName = c.String(),
                        DateOfBirth = c.DateTime(),
                        Photo = c.String(),
                        Height = c.Int(nullable: false),
                        Weight = c.Int(nullable: false),
                        Grade_GradeId = c.Int(),
                    })
                .PrimaryKey(t => t.StudentID)
                .ForeignKey("dbo.Grades", t => t.Grade_GradeId)
                .Index(t => t.Grade_GradeId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        UserName = c.String(),
                        password = c.String(),
                        EmailId = c.String(),
                        PhoneNo = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Students", "Grade_GradeId", "dbo.Grades");
            DropIndex("dbo.Students", new[] { "Grade_GradeId" });
            DropTable("dbo.Users");
            DropTable("dbo.Students");
            DropTable("dbo.Grades");
        }
    }
}
