import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const teachers = await sql`
      SELECT * FROM Teachers;
    `;
    return NextResponse.json(teachers);
  } catch (error: any) {
    console.error("Error retrieving teachers:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve teachers",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
