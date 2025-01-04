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
      SELECT
        s.StudentID,
        s.UserID,
        s.FirstName,
        s.LastName,
        s.City,
        s.Postcode,
        s.StreetName,
        s.HouseNumber,
        u.UserEmail,
        u.DateCreated
      FROM Students s
      JOIN Users u ON s.UserID = u.UserID
      WHERE s.StudentID = ${studentId};
    `;

    if (studentData.length === 0) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(studentData);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve student data",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
