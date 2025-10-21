import { advocatesController } from "./controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const result = await advocatesController.getAdvocates(page, limit);

  return Response.json(result);
}
