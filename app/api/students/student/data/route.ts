import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("StudentID");

    if (!studentId) {
      return NextResponse.json(
        { error: "StudentID is required" },
        { status: 400 }
      );
    }

    const studentData = await sql`
        SELECT Students.*, 
               Groups.GroupName AS GroupName,
               Messages.MessageContext AS MessageContext,
               Files.FilePath AS FilePath
        FROM Students
        LEFT JOIN GroupMembers ON Students.StudentID = GroupMembers.StudentID
        LEFT JOIN Groups ON GroupMembers.GroupID = Groups.GroupID
        LEFT JOIN Messages ON Groups.GroupID = Messages.GroupID
        LEFT JOIN Files ON Groups.GroupID = Files.GroupID
        WHERE Students.StudentID = ${studentId};
      `;

    if (studentData.length === 0) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(studentData);
  } catch (error: any) {
    console.error("Error retrieving student data:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve student data",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
