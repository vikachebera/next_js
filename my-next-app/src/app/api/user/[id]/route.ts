import {PrismaClient} from '@prisma/client';
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();


export async function GET(req: Request, {params}: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {id: Number(params.id)},

    })
    return NextResponse.json(user);

}

export async function PATCH(req: Request, {params}: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.user.update({
        where: {id: Number(params.id)},
        data,
    })
    return NextResponse.json(updated);

}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const deleted = await prisma.user.delete({
        where: {id: Number(params.id)},

    })
    return NextResponse.json(deleted);
}