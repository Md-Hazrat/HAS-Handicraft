import { dbConnect } from "@/lib/dbConnet";
import ProductModel from "@/lib/models/ProductModel";

export const GET = async (req: any) => {
  await dbConnect();
  const categories = await ProductModel.find().distinct("category");
  return Response.json(categories);
};
