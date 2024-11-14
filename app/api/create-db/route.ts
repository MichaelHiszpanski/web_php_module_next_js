import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const dropUsersTableQuery = `DROP TABLE IF EXISTS Users;`;
    const dropRolesTableQuery = `DROP TABLE IF EXISTS Roles;`;
    const dropStudentTableQuery = `DROP TABLE IF EXISTS Students;`;

    await sql(dropUsersTableQuery);
    await sql(dropRolesTableQuery);
    await sql(dropStudentTableQuery);

    const createRolesTableQuery = `
      CREATE TABLE IF NOT EXISTS Roles (
        RoleId INT PRIMARY KEY,
        RoleDescription VARCHAR(255) NOT NULL
      );
    `;
    await sql(createRolesTableQuery);

    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        UserID INT PRIMARY KEY,
        UserEmail VARCHAR(250) UNIQUE NOT NULL,
        UserPassword VARCHAR(50) NOT NULL,
        RoleId INT,
        DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
      );
    `;
    await sql(createUsersTableQuery);

    const createStudentsTableQuery = `
      CREATE TABLE IF NOT EXISTS Students (
        StudentID INT PRIMARY KEY,
        UserID INT,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(100) NOT NULL,
        City VARCHAR(50),
        Postcode VARCHAR(10),
        StreetName VARCHAR(100),
        HouseNumber VARCHAR(10),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      );
    `;
    await sql(createStudentsTableQuery);

    return NextResponse.json({ message: "Tables created successfully!" });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create the tables",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
