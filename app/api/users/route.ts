import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const allUsers = await sql`
      SELECT * FROM Users;
    `;
    return NextResponse.json(allUsers);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve all users from DB",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
