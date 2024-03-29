import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }
    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const category = await prismaDB.category.create({
      data: {
        storeId: params.storeId,
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Name is required", { status: 401 });
    }
    const category = await prismaDB.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
