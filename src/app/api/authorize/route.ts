import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const auth_code = request.nextUrl.searchParams.get("auth_code");
  console.log(auth_code)
  const response = NextResponse.json(
    { success: true},
    { status: 200 },
  );

  return response;
}