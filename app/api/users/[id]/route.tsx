import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise < { id: string }> }
) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params:Promise <{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: (await params).id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params:Promise< { id: string }> }
) {
    const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({});
}
