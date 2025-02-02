import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const {
      UserID,
      FirstName,
      LastName,
      City,
      Postcode,
      StreetName,
      HouseNumber,
    } = await req.json();

    const userExists = await sql`
      SELECT 1 FROM Users WHERE userid = ${UserID};
    `;

    if (userExists.length === 0) {
      return NextResponse.json(
        { error: `UserID does not exist in Users table ${UserID}` },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO Students (UserID, FirstName, LastName, City, Postcode, StreetName, HouseNumber)
      VALUES (${UserID}, ${FirstName}, ${LastName}, ${City}, ${Postcode}, ${StreetName}, ${HouseNumber})
      RETURNING StudentID;
    `;

    return NextResponse.json({
      message: "Student added successfully!",
      studentId: result[0].StudentID,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to add student",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const {
      StudentID,
      FirstName,
      LastName,
      City,
      Postcode,
      StreetName,
      HouseNumber,
    } = await req.json();

    const result = await sql`
      UPDATE Students
      SET FirstName = ${FirstName}, LastName = ${LastName},
          City = ${City}, Postcode = ${Postcode}, StreetName = ${StreetName},
          HouseNumber = ${HouseNumber}
      WHERE StudentID = ${StudentID}
      RETURNING StudentID;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Student updated successfully!" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to update student",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { StudentID } = await req.json();

    const result = await sql`
      DELETE FROM Students
      WHERE StudentID = ${StudentID}
      RETURNING StudentID;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Student not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Student deleted successfully!" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to delete student",
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

    const student = await sql`
      SELECT * FROM Students WHERE UserID = ${userId};
    `;

    if (student.length === 0) {
      return NextResponse.json(
        { message: "Student not found by UserID! " },
        { status: 404 }
      );
    }

    return NextResponse.json(student[0]);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to get student",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
