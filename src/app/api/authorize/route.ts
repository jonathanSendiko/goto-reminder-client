import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const auth_code = request.nextUrl.searchParams.get("auth_code");
  const personality = request.nextUrl.searchParams.get("personality");

  if (!auth_code || !personality) {
    return new NextResponse("Please provide an auth code and personality.", {
      status: 400,
    });
  }
  try {
    const response = await fetch(
      `https://1851-36-66-71-34.ngrok-free.app/api/v1/authorize?auth_code=${auth_code}&personality=${personality}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    if (!response.ok) {
      return new NextResponse("Failed to verify subscription.", {
        status: 400,
      });
    }
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return new NextResponse("Failed to verify subscription with error: " + error, {
      status: 500,
    });
  }
}