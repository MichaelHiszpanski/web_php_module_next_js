import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const teachers = await sql`
      SELECT * FROM Groups;
    `;
    return NextResponse.json(teachers);
  } catch (error: any) {
    console.error("Error retrieving Groups:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve Groups",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
