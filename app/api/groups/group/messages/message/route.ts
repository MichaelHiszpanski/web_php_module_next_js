import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const body = await req.json();

    const { UserID, GroupID, UserName, MessageContext } = body;

    if (!UserID || !GroupID || !MessageContext) {
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

    //     const memberCheck = await sql`
    //     SELECT * FROM GroupMembers WHERE UserID = ${UserID} AND GroupID = ${GroupID};
    //   `;
    //     if (memberCheck.length > 0) {
    //       return NextResponse.json(
    //         {
    //           error: "Error: User is already part of the group.",
    //         },
    //         { status: 400 }
    //       );
    //     }
    const membershipCheck = await sql`
    SELECT * FROM GroupMembers 
    WHERE GroupID = ${GroupID} AND UserID = ${UserID};
  `;
    if (membershipCheck.length === 0) {
      return NextResponse.json(
        { error: "Error: User is not a member of the specified group." },
        { status: 400 }
      );
    }

    const result = await sql`
    INSERT INTO Messages (GroupID, UserID, UserName, MessageContext)
    VALUES (${GroupID}, ${UserID}, ${UserName}, ${MessageContext})
    RETURNING MessageID;
  `;
    if (result.length === 0) {
      return NextResponse.json(
        { message: "Somethiong went wrong" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Message added successfully!" },
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
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { MessageID } = await req.json();

    if (!MessageID) {
      return NextResponse.json(
        { error: "MessageID is required." },
        { status: 400 }
      );
    }

    const messageCheck = await sql`
        SELECT MessageID FROM Messages WHERE MessageID = ${MessageID};
      `;
    if (messageCheck.length === 0) {
      return NextResponse.json(
        { error: `Error: MessageID ${MessageID} does not exist.` },
        { status: 404 }
      );
    }

    await sql`
        DELETE FROM Messages WHERE MessageID = ${MessageID};
      `;

    return NextResponse.json(
      { message: "Message deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Some problem occured, please try again.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
