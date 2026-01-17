// app/api/chat/route.js
import { NextResponse } from "next/server";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    const body = await req.json();

    // Server-to-Server call (Bypasses CORS)
    const response = await axios.post(
      "https://snoonu-hackathon-byte-us.onrender.com/chat",
      body,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 },
    );
  }
}
