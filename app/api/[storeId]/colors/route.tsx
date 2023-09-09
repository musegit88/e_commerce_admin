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
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const colors = await prismaDB.color.create({
      data: {
        storeId: params.storeId,
        name,
        value,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_POST]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const colors = await prismaDB.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
