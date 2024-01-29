import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Stock from "@/models/stock";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewStockSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  size: Joi.string().required(),
  stockCount: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    console.log(isAuthUser, "syed");

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const { name, price, imageUrl, size, stockCount } = extractData;

      const { error } = AddNewStockSchema.validate({
        name,
        price,
        imageUrl,
        size,
        stockCount,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedStock = await Stock.create(extractData);

      if (newlyCreatedStock) {
        return NextResponse.json({
          success: true,
          message: "Item added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the item! please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized !",
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
