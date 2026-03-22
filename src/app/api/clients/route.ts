import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { companyName: "asc" },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, country, entityType } = body;

    if (!companyName || !country || !entityType) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: { companyName, country, entityType },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}