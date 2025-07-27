import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, currentPassword, newPassword } = await req.json();

  if (!email || !currentPassword || !newPassword) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.hashedpassword) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.hashedpassword);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: { hashedpassword: hashedNewPassword },
  });

  return NextResponse.json({ message: "Password updated successfully" });

}
