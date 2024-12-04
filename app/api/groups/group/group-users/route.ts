import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const GroupID = url.searchParams.get("GroupID");

    if (!GroupID) {
      return NextResponse.json(
        {
          error: "Missing GroupID parameter",
        },
        { status: 400 }
      );
    }

    const students = await sql`
      SELECT
        gm.GroupMemberID,
        gm.GroupID,
        u.UserID,
        u.UserEmail,
        r.RoleDescription,
        CASE
          WHEN r.RoleDescription = 'Student' THEN s.FirstName
          WHEN r.RoleDescription = 'Teacher' THEN t.FirstName
          ELSE NULL
        END AS FirstName,
        CASE
          WHEN r.RoleDescription = 'Student' THEN s.LastName
          WHEN r.RoleDescription = 'Teacher' THEN t.LastName
          ELSE NULL
        END AS LastName
      FROM GroupMembers gm
      JOIN Users u ON gm.UserID = u.UserID
      JOIN Roles r ON u.RoleId = r.RoleId
      LEFT JOIN Students s ON u.UserID = s.UserID
      LEFT JOIN Teachers t ON u.UserID = t.UserID
      WHERE gm.GroupID = ${GroupID};
    `;

    return NextResponse.json(students, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to get Studnets from Group table",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
