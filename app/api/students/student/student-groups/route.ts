import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
const sql = neon(`${process.env.DATABASE_URL}`);
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("UserID");

    if (!userId) {
      return NextResponse.json(
        { error: "user_id is missing" },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT g.GroupID, g.GroupName, g.DateCreated, g.Description
      FROM Groups g
      JOIN GroupMembers gm ON g.GroupID = gm.GroupID
      WHERE gm.UserID = ${userId};
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "No groups found for the provided user_id" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrive Student`s Groups",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
