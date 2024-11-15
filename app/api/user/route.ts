import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const { UserEmail, UserPassword, RoleId } = await req.json();

    const result = await sql`
      INSERT INTO Users (UserEmail, UserPassword, RoleId)
      VALUES (${UserEmail}, ${UserPassword}, ${RoleId})
      RETURNING UserID;
    `;

    return NextResponse.json({
      message: "User added successfully!",
      userId: result[0].UserID,
    });
  } catch (error: any) {
    console.error("Error adding user to DB:", error);
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

    return NextResponse.json({ message: "User updated successfully!" });
  } catch (error: any) {
    console.error("Error updating user to DB:", error);
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

    return NextResponse.json({ message: "User deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting user to DB:", error);
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
    console.error("Error retrieving user from DB:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve user from DB.",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
