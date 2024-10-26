import prisma from "@/lib/db";
import { catchGeneric } from "@/lib/server-utils";
import { getScopeQuery } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const scope = req.headers.get('x-api-scope') as 'all' | 'owner';
    const requester = req.headers.get('x-api-user') as string;
    const { id } = context.params;

    const meow = await prisma.cat.findUnique({
      where: { id, ...getScopeQuery(scope, requester) },
    })
    if (!meow) return NextResponse.json({
      message: "Meow not found!",
      data: null,
    }, {
      status: 404
    })
    return NextResponse.json({
      message: "Meow fetched successfully!",
      data: meow,
    });
  } catch (error) {
    return catchGeneric(error)
  }
}

export async function DELETE(req: NextRequest, context: { params: Params }) {
  try {
    const scope = req.headers.get('x-api-scope') as 'all' | 'owner';
    const requester = req.headers.get('x-api-user') as string;
    const { id } = context.params;

    const meow = await prisma.cat.delete({
      where: { id, ...getScopeQuery(scope, requester) },
    })
    if (!meow) return NextResponse.json({
      message: "Meow not found!",
      data: null,
    }, {
      status: 404
    })
    return NextResponse.json({
      message: "Meow deleted successfully!",
      data: meow,
    });
  } catch (error) {
    return catchGeneric(error)

  }
}

export async function PUT(req: NextRequest, context: { params: Params }) {
  try {
    const scope = req.headers.get('x-api-scope') as 'all' | 'owner';
    const requester = req.headers.get('x-api-user') as string;
    const { id } = context.params;
    const body = await req.json();

    const updatedMeow = await prisma.cat.update({
      where: { id, ...getScopeQuery(scope, requester) },
      data: {
        ...body,
        owner_id: requester,
      },
    })
    if (!updatedMeow) return NextResponse.json({
      message: "Meow not found!",
      data: null,
    }, {
      status: 404
    })
    return NextResponse.json({
      message: "Meow updated successfully!",
      data: updatedMeow
    })
  } catch (error) {
    return catchGeneric(error)
  }
}

