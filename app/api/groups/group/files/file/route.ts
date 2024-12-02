import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const groupId = parseInt(formData.get("GroupID") as string);
    const userId = formData.get("UserID") as string;
    const file = formData.get("FileContent") as File;

    if (!file) {
      throw new Error("No file uploaded");
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileSize = file.size;
    const filePath = file.name;

    const insertQuery = `
      INSERT INTO Files (GroupID, UserID, FileSize, FilePath, FileContent)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING FileID;
    `;
    const result = await sql(insertQuery, [
      groupId,
      userId,
      fileSize,
      filePath,
      fileBuffer,
    ]);
    const fileId = result[0]?.FileID;
    return NextResponse.json({
      success: true,
      fileId: fileId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
