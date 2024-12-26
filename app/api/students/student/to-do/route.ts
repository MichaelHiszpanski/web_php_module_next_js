import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const { StudentID, TaskTitle, TaskDescription, DueDate } = await req.json();

    const checkingStudentExist = await sql`
      SELECT 1 FROM Students WHERE StudentID = ${StudentID};
    `;

    if (checkingStudentExist.length === 0) {
      return NextResponse.json(
        { error: `StudentID does not exist in Students table: ${StudentID}` },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO ToDoList (StudentID, TaskTitle, TaskDescription, DueDate)
      VALUES (${StudentID}, ${TaskTitle}, ${TaskDescription}, ${DueDate})
      RETURNING ToDoID;
    `;

    return NextResponse.json({
      message: "Record added succesfully!",
      toDoId: result[0].ToDoID,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const StudentID = searchParams.get("StudentID");

    if (!StudentID || StudentID === "-99") {
      return NextResponse.json(
        { error: "StudentID is required as a query parameter" },
        { status: 400 }
      );
    }

    const notes = await sql`
        SELECT ToDoID, TaskTitle, TaskDescription, DueDate, IsCompleted
        FROM ToDoList
        WHERE StudentID = ${StudentID};
      `;

    if (notes.length === 0) {
      return NextResponse.json(
        { message: `No notes found for StudentID: ${StudentID}` },
        { status: 404 }
      );
    }

    return NextResponse.json(notes);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { ToDoID } = await req.json();

    const result = await sql`
      DELETE FROM ToDoList
      WHERE ToDoID = ${ToDoID}
      RETURNING ToDoID;
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "Task not found!" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record deleted!" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
