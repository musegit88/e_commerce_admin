import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
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
    const colors = await prismaDB.color.update({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_PATCH]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const colors = await prismaDB.color.delete({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_DELETE]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const colors = await prismaDB.color.findUnique({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}
