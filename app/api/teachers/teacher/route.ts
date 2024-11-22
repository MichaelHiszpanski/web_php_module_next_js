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
      Department,
      Title,
    } = await req.json();

    const result = await sql`
      INSERT INTO Teachers (UserID, FirstName, LastName, City, Postcode, StreetName, HouseNumber, Department, Title)
      VALUES (${UserID}, ${FirstName}, ${LastName}, ${City}, ${Postcode}, ${StreetName}, ${HouseNumber}, ${Department}, ${Title})
      RETURNING TeacherID;
    `;

    return NextResponse.json({
      message: "Teacher added successfully!",
      teacherId: result[0].TeacherID,
    });
  } catch (error: any) {
    console.error("Error adding teacher:", error);
    return NextResponse.json(
      {
        error: "Failed to add teacher",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { TeacherID, UserID, FirstName, LastName, Subject, Email } =
      await req.json();

    const result = await sql`
      UPDATE Teachers
      SET UserID = ${UserID}, FirstName = ${FirstName}, LastName = ${LastName},
          Subject = ${Subject}, Email = ${Email}
      WHERE TeacherID = ${TeacherID}
      RETURNING TeacherID;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.error("Error updating teacher:", error);
    return NextResponse.json(
      {
        error: "Failed to update teacher",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { TeacherID } = await req.json();

    const result = await sql`
      DELETE FROM Teachers
      WHERE TeacherID = ${TeacherID}
      RETURNING TeacherID;
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Teacher deleted successfully!" });
  } catch (error: any) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      {
        error: "Failed to delete teacher",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("TeacherID");

    if (!teacherId) {
      return NextResponse.json(
        { error: "TeacherID is required" },
        { status: 400 }
      );
    }

    const teacher = await sql`
        SELECT * FROM Teachers WHERE TeacherID = ${teacherId};
      `;

    if (teacher.length === 0) {
      return NextResponse.json(
        { message: "Teacher not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(teacher[0]);
  } catch (error: any) {
    console.error("Error retrieving teacher:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve teacher",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
