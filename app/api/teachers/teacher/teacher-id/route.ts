import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("UserID");

    if (!userId) {
      return NextResponse.json(
        { error: "UserID is required" },
        { status: 400 }
      );
    }

    const result = await sql`
    SELECT TeacherID 
    FROM Teachers
    WHERE UserID = ${userId};
  `;
    const rows = result.rows;

    if (!rows.length) {
      return NextResponse.json(
        { error: "No Teacher associated with this UserID!" },
        { status: 404 }
      );
    }

    const teacherId = rows[0].teacherid;

    return NextResponse.json({ TeacherID: teacherId });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve TeacherID",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
