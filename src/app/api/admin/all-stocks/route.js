import connectToDB from "@/database";
import Stock from "@/models/stock";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const extractAllStocks = await Stock.find({});

    if (extractAllStocks) {
      return NextResponse.json({
        success: true,
        data: extractAllStocks,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Stocks found",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
