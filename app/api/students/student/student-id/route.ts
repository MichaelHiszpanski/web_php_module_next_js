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
    SELECT StudentID 
    FROM Students
    WHERE UserID = ${userId};
  `;
    const rows = result.rows;

    if (!rows.length) {
      return NextResponse.json(
        { error: "No Student associated with this UserID!" },
        { status: 404 }
      );
    }

    const studentId = rows[0].studentid;

    return NextResponse.json({ StudentID: studentId });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve StudnetID",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
