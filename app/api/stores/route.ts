import prismaDB from "@/lib/prismDB"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { name } = body
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prismaDB.store.create({
            data: {
                name, userId
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("[STROES_POST_ERROR]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}