import prisma from "@/lib/db";
import { catchGeneric } from "@/lib/server-utils";
import { getScopeQuery } from "@/lib/utils";
import { Cat } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";

export async function GET(req: NextRequest) {
  try {
    const query = qs.parse(req.nextUrl.search.slice(1));

    // TODO: validation
    const search = query.q || '';
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const offset = (page - 1) * limit;
    const filter = (query.filter as object) || {};
    const sort = query.sort || 'created_at';
    const order = query.order || 'desc';
    const select = query.select || 'name,id,breed';
    const scope = req.headers.get('x-api-scope') as 'all' | 'owner';
    const requester = req.headers.get('x-api-user') as string;
    const selectQuery = (select as string).split(',').reduce(
      (final, curr) => {
        final[curr as keyof Cat] = true;
        return final;
      },
      {} as Record<keyof Cat, true>
    );

    const meows = await prisma.cat.findMany({
      where: {
        name: { contains: search as string, mode: 'insensitive' },
        ...getScopeQuery(scope, requester),
        ...filter
      },
      select: selectQuery,
      take: limit,
      skip: offset,
      orderBy: {
        [sort as keyof Cat]: order,
      },
    });

    return NextResponse.json({
      message: "Meows fetched successfully!",
      data: meows,
      from: offset + 1,
      to: offset + meows.length,
      total: await prisma.cat.count({
        where: {
          name: { contains: search as string },
          ...getScopeQuery(scope, requester),
          ...filter
        },
      }),
    });
  } catch (error) {
    return catchGeneric(error)
  }
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const requester = req.headers.get('x-api-user') as string;
    const { name, breed, personality } = body;
    const newMeow = await prisma.cat.create({
      data: {
        name,
        breed,
        owner_id: requester,
        image: '',
        personality
      }
    });
    return NextResponse.json(
      { data: newMeow, message: "Meow created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return catchGeneric(error)
  }
}
