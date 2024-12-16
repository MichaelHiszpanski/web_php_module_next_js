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
    console.log("FileBuffer:", fileBuffer, "Type:", typeof fileBuffer);
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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileId = parseInt(url.searchParams.get("FileID") || "", 10);

    if (isNaN(fileId)) {
      throw new Error("Invalid or missing FileID");
    }

    const fileQuery = `
      SELECT FilePath, FileContent, FileSize
      FROM Files
      WHERE FileID = $1;
    `;

    const result = await sql(fileQuery, [fileId]);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }
    const { filepath, filecontent, filesize } = result[0];

    console.log("Retrieved Data:", {
      filepath,
      filesize,
      filecontent,
    });

    const fileBuffer = Buffer.isBuffer(filecontent)
      ? filecontent
      : Buffer.from(filecontent || "", "binary");

    const fileName = filepath || "downloaded_file";

    return new Response(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/octet-stream",
        "Content-Length": `${filesize}`,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/groups/group/files/file:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
