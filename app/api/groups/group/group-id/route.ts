import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
const sql = neon(`${process.env.DATABASE_URL}`);
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const groupName = url.searchParams.get("GroupName");

    if (!groupName) {
      return NextResponse.json(
        { error: "GroupName is missing" },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT GroupID
      FROM Groups
      WHERE GroupName = ${groupName};
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "No Group ID f!" }, { status: 404 });
    }

    const group = result[0];
    return NextResponse.json({ GroupID: group });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch group by name", detail: error.message },
      { status: 500 }
    );
  }
}
