import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
const sql = neon(`${process.env.DATABASE_URL}`);
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const groupId = url.searchParams.get("GroupID");

    if (!groupId) {
      return NextResponse.json(
        { error: "groupId is missing" },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT FileID, UserID, FilePath, FileSize, DateCreated
      FROM Files
      WHERE GroupID = ${groupId};
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "No files found for the provided GroupID" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve files",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
