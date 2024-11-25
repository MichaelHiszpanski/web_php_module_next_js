import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const dropTeachersTable = `DROP TABLE IF EXISTS Teachers CASCADE;`;
    const dropStudentTable = `DROP TABLE IF EXISTS Students CASCADE;`;
    const dropUsersTable = `DROP TABLE IF EXISTS Users CASCADE;`;
    const dropRolesTable = `DROP TABLE IF EXISTS Roles CASCADE;`;
    const dropGroupsTable = `DROP TABLE IF EXISTS Groups CASCADE;`;
    const dropGroupMembersTable = `DROP TABLE IF EXISTS GroupMembers CASCADE;`;
    const dropMessagesTable = `DROP TABLE IF EXISTS Messages CASCADE;`;
    const dropFilesTable = `DROP TABLE IF EXISTS Files CASCADE;`;
    await sql(dropUsersTable);
    await sql(dropRolesTable);
    await sql(dropStudentTable);
    await sql(dropTeachersTable);
    await sql(dropGroupsTable);
    await sql(dropGroupMembersTable);
    await sql(dropMessagesTable);
    await sql(dropFilesTable);

    const createRolesTable = `
      CREATE TABLE IF NOT EXISTS Roles (
        RoleId INT PRIMARY KEY,
        RoleDescription VARCHAR(255) NOT NULL
      );
    `;
    await sql(createRolesTable);
    const insertRoles = `
    INSERT INTO Roles (RoleId, RoleDescription)
    VALUES
      (1, 'Student'),
      (2, 'Teacher'),
      (3, 'None')
    ON CONFLICT (RoleId) DO NOTHING;
  `;
    await sql(insertRoles);

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS Users (
        UserID VARCHAR(255) PRIMARY KEY,
        UserEmail VARCHAR(250) UNIQUE NOT NULL,
        UserPassword VARCHAR(255) NOT NULL,
        RoleId INT,
        DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
      );
    `;
    await sql(createUsersTable);

    const createStudentsTable = `
      CREATE TABLE IF NOT EXISTS Students (
        StudentID SERIAL PRIMARY KEY,
        UserID VARCHAR(255) NOT NULL,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(100) NOT NULL,
        City VARCHAR(50),
        Postcode VARCHAR(10),
        StreetName VARCHAR(100),
        HouseNumber VARCHAR(10),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      );
    `;
    await sql(createStudentsTable);

    const createTeachersTable = `
    CREATE TABLE IF NOT EXISTS Teachers (
      TeacherID SERIAL PRIMARY KEY,
      UserID VARCHAR(255) NOT NULL,
      FirstName VARCHAR(50) NOT NULL,
      LastName VARCHAR(100) NOT NULL,
      City VARCHAR(50),
      Postcode VARCHAR(10),
      StreetName VARCHAR(100),
      HouseNumber VARCHAR(10),
      Department VARCHAR(50),
      Title VARCHAR(100),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
  `;

    await sql(createTeachersTable);
    const createGroupsTable = `
    CREATE TABLE IF NOT EXISTS Groups (
      GroupID INT PRIMARY KEY,
      GroupName VARCHAR(100) NOT NULL,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      TeacherID INT NOT NULL,
      Description VARCHAR(250),
      FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
    );
    `;
    await sql(createGroupsTable);
    const createGroupMembersTable = `
    CREATE TABLE IF NOT EXISTS GroupMembers (
      GroupMemberID INT PRIMARY KEY,
      GroupID INT NOT NULL,
      UserID VARCHAR(255) NOT NULL,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    `;
    await sql(createGroupMembersTable);
    const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS Messages (
      MessageID INT PRIMARY KEY,
      GroupID INT NOT NULL,
      UserID VARCHAR(255) NOT NULL,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      MessageContext TEXT NOT NULL,
      FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    `;
    await sql(createMessagesTable);
    const createFilesTable = `
    CREATE TABLE IF NOT EXISTS Files (
      FileID INT PRIMARY KEY,
      GroupID INT NOT NULL,
      UserID VARCHAR(255) NOT NULL,
      DateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FileSize INT NOT NULL,  -- File size in bytes
      FilePath VARCHAR(255) NOT NULL,
      FOREIGN KEY (GroupID) REFERENCES Groups(GroupID),
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );
    `;
    await sql(createFilesTable);
    return NextResponse.json({ message: "All Tables created successfully!" });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create tables... !",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
