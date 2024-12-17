import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
const sql = neon(`${process.env.DATABASE_URL}`);
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { UserID, GroupID } = body;

    if (!UserID || !GroupID) {
      return NextResponse.json(
        {
          error: "GroupId nand UserID is missing",
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

    const memberCheck = await sql`
    SELECT * FROM GroupMembers WHERE UserID = ${UserID} AND GroupID = ${GroupID};
  `;
    if (memberCheck.length > 0) {
      return NextResponse.json(
        {
          error: "Error: User is already part of the group.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
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
        error: "Error: somewthing went wrong.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { UserID, GroupID } = body;

    if (!UserID || !GroupID) {
      return NextResponse.json(
        {
          error: "Error: GroupID or UserID is missing!",
        },
        { status: 400 }
      );
    }

    const groupCheck = await sql`
      SELECT GroupID FROM Groups WHERE GroupID = ${GroupID};
    `;
    if (groupCheck.length === 0) {
      return NextResponse.json(
        {
          error: `Error: GroupID doesn't exist in Groups table.`,
        },
        { status: 404 }
      );
    }
    const userCheck = await sql`
    SELECT RoleId FROM Users WHERE UserID = ${UserID};
  `;
    if (userCheck.length === 0) {
      return NextResponse.json(
        {
          error: "Error: UserID does not exist in Users table.",
        },
        { status: 404 }
      );
    }

    const { roleid } = userCheck[0];

    if (roleid === 2) {
      return NextResponse.json(
        {
          error: "Error: Cannot remove a user with the Teacher role.",
        },
        { status: 403 }
      );
    }
    const memberCheck = await sql`
      SELECT * FROM GroupMembers WHERE UserID = ${UserID} AND GroupID = ${GroupID};
    `;
    if (memberCheck.length === 0) {
      return NextResponse.json(
        {
          error: "Error: User dosen`t belong to this Group.",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM GroupMembers WHERE UserID = ${UserID} AND GroupID = ${GroupID};
    `;

    return NextResponse.json(
      {
        message: "User was removed successfully to the Group!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error: Something went wrong.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
