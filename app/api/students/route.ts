import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const students = await sql`
      SELECT * FROM Students;
    `;
    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve students",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
