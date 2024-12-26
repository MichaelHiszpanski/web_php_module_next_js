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
      SELECT
        t.TeacherID,
        t.UserID,
        t.FirstName,
        t.LastName,
        t.City,
        t.Postcode,
        t.StreetName,
        t.HouseNumber,
        u.UserEmail,
        u.DateCreated
      FROM Teachers t
      JOIN Users u ON t.UserID = u.UserID
      WHERE t.TeacherID = ${teacherId};
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
