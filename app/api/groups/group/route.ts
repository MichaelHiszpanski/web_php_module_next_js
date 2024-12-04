import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const teacherUserID = url.searchParams.get("TeacherID");

    if (!teacherUserID) {
      return NextResponse.json(
        {
          error: "Missing TeacherID parameter",
        },
        { status: 400 }
      );
    }

    const groups = await sql`
      SELECT * FROM Groups
      WHERE TeacherID = ${teacherUserID};
    `;

    return NextResponse.json(groups);
  } catch (error: any) {
    console.error("Error retrieving groups:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve groups",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { GroupName, TeacherID, Description } = await req.json();

    const existingGroup = await sql`
      SELECT GroupName 
      FROM Groups 
      WHERE GroupName = ${GroupName};
    `;

    if (existingGroup.length > 0) {
      return NextResponse.json(
        {
          error: "Group name already exists",
        },
        { status: 409 }
      );
    }

    const result = await sql`
        INSERT INTO Groups (
          GroupName,
          TeacherID,
          Description
        )
        VALUES (
          ${GroupName},
          ${TeacherID},
          ${Description || null}
        ) RETURNING GroupID;
      `;

    return NextResponse.json(
      {
        message: "success",
        groupid: result[0].groupid,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Group:", error);
    return NextResponse.json(
      {
        error: "Failed to create Group",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const groupID = url.searchParams.get("GroupID");

    if (!groupID) {
      return NextResponse.json(
        {
          error: "Missing GroupID parameter",
        },
        { status: 400 }
      );
    }

    const result = await sql`
        DELETE FROM Groups
        WHERE GroupID = ${groupID}
        RETURNING GroupID;
      `;

    if (!groupID) {
      return NextResponse.json(
        {
          error: "Missing GroupID parameter",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to delete group",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
