import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismaDB from "@/lib/prismDB";
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
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

    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const category = await prismaDB.category.update({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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
    const category = await prismaDB.category.delete({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 401 });
    }
    const category = await prismaDB.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATERGORY_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
