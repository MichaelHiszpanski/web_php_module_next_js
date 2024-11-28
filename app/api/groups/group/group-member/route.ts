import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const body = await req.json();

    const { UserID, GroupID } = body;

    if (!UserID || !GroupID) {
      return NextResponse.json(
        {
          error: "GroupId nad UserID is missing",
        },
        { status: 400 }
      );
    }

    const userCheck = await sql`
      SELECT UserID FROM Users WHERE UserID = ${UserID};
    `;
    if (userCheck.length === 0) {
      return NextResponse.json(
        {
          error: `Error: UserID is not existing in Users tabel.`,
        },
        { status: 404 }
      );
    }

    const groupCheck = await sql`
      SELECT GroupID FROM Groups WHERE GroupID = ${GroupID};
    `;
    if (groupCheck.length === 0) {
      return NextResponse.json(
        {
          error: `Error: GroupID dosn't exist in Groups table`,
        },
        { status: 404 }
      );
    }

    await sql`
      INSERT INTO GroupMembers (GroupID, UserID)
      VALUES (${GroupID}, ${UserID});
    `;

    return NextResponse.json(
      {
        message: "Member was added succesfuly",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error: somewthign went wrong.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
