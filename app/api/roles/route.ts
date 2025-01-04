import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function GET(req: Request) {
  try {
    const roles = await sql`
          SELECT RoleId, RoleDescription FROM Roles;
        `;

    return NextResponse.json(roles);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to get roles",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
