import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
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
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const size = await prismaDB.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal server errror");
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const size = await prismaDB.size.delete({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]");
    return new NextResponse("Internal server errror");
  }
}
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const size = await prismaDB.size.findUnique({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]");
    return new NextResponse("Internal server errror");
  }
}
