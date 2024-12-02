import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const GroupID = searchParams.get("GroupID");

    if (!GroupID) {
      return NextResponse.json(
        { error: "GroupID is required." },
        { status: 400 }
      );
    }

    const groupCheck = await sql`
      SELECT GroupID FROM Groups WHERE GroupID = ${GroupID};
    `;
    if (groupCheck.length === 0) {
      return NextResponse.json(
        { error: `Error: GroupID ${GroupID} does not exist.` },
        { status: 404 }
      );
    }

    const messages = await sql`
      SELECT * FROM Messages WHERE GroupID = ${GroupID} ORDER BY DateCreated DESC;
    `;

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Some problem occured, please try again later",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
