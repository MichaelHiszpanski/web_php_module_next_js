import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const { UserID, UserEmail, UserPassword, RoleId } = await req.json();

    const result = await sql`
      INSERT INTO Users (UserID, UserEmail, UserPassword, RoleId)
      VALUES (${UserID}, ${UserEmail}, ${UserPassword}, ${RoleId})
      RETURNING UserID;
    `;

    return NextResponse.json({
      message: "success",
      userId: result[0].UserID,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to add user to DB.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { UserID, UserEmail, UserPassword, RoleId } = await req.json();

    const user = await sql`
      UPDATE Users
      SET UserEmail = ${UserEmail}, UserPassword = ${UserPassword}, RoleId = ${RoleId}
      WHERE UserID = ${UserID}
      RETURNING UserID;
    `;

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to update user to DB.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { UserID } = await req.json();

    const result = await sql`
      DELETE FROM Users
      WHERE UserID = ${UserID}
      RETURNING UserID;
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to delete user to DB.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("UserID");

    if (!userId) {
      return NextResponse.json(
        { error: "UserID is required" },
        { status: 400 }
      );
    }

    const user = await sql`
        SELECT * FROM Users WHERE UserID = ${userId};
      `;

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json(user[0]);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to retrieve user from DB.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
export async function PATCH(req: Request) {
  try {
    const { UserID, RoleId } = await req.json();

    if (!UserID || !RoleId) {
      return NextResponse.json(
        { error: "Please provide User - Role." },
        { status: 400 }
      );
    }

    const response = await sql`
      UPDATE Users
      SET RoleId = ${RoleId}
      WHERE UserID = ${UserID}
      RETURNING UserID, RoleId;
    `;

    if (response.length === 0) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Role updated successfully!",
      user: response[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error updating User - Role",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
