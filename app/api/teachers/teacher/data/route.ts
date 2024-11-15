import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("TeacherID");

    if (!teacherId) {
      return NextResponse.json(
        { error: "TeacherID is required" },
        { status: 400 }
      );
    }

    const teacherData = await sql`
        SELECT Teachers.*, 
               Subjects.SubjectName AS SubjectName,
               Classes.ClassName AS ClassName
        FROM Teachers
        LEFT JOIN TeacherSubjects ON Teachers.TeacherID = TeacherSubjects.TeacherID
        LEFT JOIN Subjects ON TeacherSubjects.SubjectID = Subjects.SubjectID
        LEFT JOIN TeacherClasses ON Teachers.TeacherID = TeacherClasses.TeacherID
        LEFT JOIN Classes ON TeacherClasses.ClassID = Classes.ClassID
        WHERE Teachers.TeacherID = ${teacherId};
      `;

    if (teacherData.length === 0) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(teacherData);
  } catch (error: any) {
    console.error("Error retrieving teacher data:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve teacher data",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
