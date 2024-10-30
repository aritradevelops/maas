import prisma from "@/lib/db";
import { catchGeneric } from "@/lib/server-utils";
import { getScopeQuery } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import Storage from "@/lib/s3";
import { randomUUID } from "crypto";
interface Params {
  id: string;
}
export async function PATCH(req: NextRequest, context: { params: Params }) {
  try {
    const buf = await req.arrayBuffer()
    const contentType = req.headers.get('content-type') || 'application/octet-stream'
    if (!buf.byteLength)
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    if (buf.byteLength > 1 * 1024 * 1024)
      return NextResponse.json({ error: "Too many bytes received." }, { status: 400 })
    const scope = req.headers.get('x-api-scope') as 'all' | 'owner';
    const requester = req.headers.get('x-api-user') as string;
    const { id } = context.params;
    let meow = await prisma.cat.findUnique({
      where: { id, ...getScopeQuery(scope, requester) },
    })
    if (!meow) return NextResponse.json({
      message: "Meow not found!",
      data: null,
    }, {
      status: 404
    })
    const key = `${meow.owner_id}/${randomUUID()}.${mime.getExtension(contentType)}`
    await Storage.upload(key, Buffer.from(buf), contentType)
    meow = await prisma.cat.update({
      where: { id },
      data: { image: Storage.getUrl(key) },
    })
    return NextResponse.json({ message: "Image added successfully!", data: meow });
  } catch (error) {
    return catchGeneric(error)
  }
}