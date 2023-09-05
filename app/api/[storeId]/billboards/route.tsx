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
    const { lable, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!lable) {
      return new NextResponse("Lable is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const billboard = await prismaDB.billboard.create({
      data: {
        lable,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 401 });
    }
    const billboard = await prismaDB.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
