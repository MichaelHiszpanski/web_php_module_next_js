import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const url = new URL(req.url);
    const groupName = url.searchParams.get("GroupName");

    if (!groupName) {
      return NextResponse.json(
        { error: "GroupName is missing" },
        { status: 400 }
      );
    }

    const query = `
      SELECT GroupID
      FROM Groups
      WHERE GroupName = $1
      LIMIT 1;
    `;

    const result = await sql(query, [groupName]);

    const group = result[0].groupid;
    return NextResponse.json({ GroupID: group });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch group by name", detail: error.message },
      { status: 500 }
    );
  }
}
