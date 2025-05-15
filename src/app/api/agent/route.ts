import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const { agentName, greetings } = await req.json();
        const session = await auth();

        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }

        if (!agentName || !greetings) {
            return NextResponse.json({ message: "Agent name and greetings are required" }, { status: 400 });
        }

        await prisma.agent.create({
            data: {
              name: agentName,
              greetings: greetings,
              userId,
            },
          });

        return NextResponse.json({ message: "Agent Created Successfully!"},{ status: 201 });
    } catch (error) {
        console.error("Error creating agent:", error);
        return NextResponse.json({ message: "Failed to process" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth();

        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }
        
        const agents = await prisma.agent.findMany({
            where: {
                userId: userId,
            }
        });
        return NextResponse.json({agents, message: "Agent Created Successfully!"},{ status: 201 });
    } catch (error) {
        console.error("Error creating agent:", error);
        return NextResponse.json({ message: "Failed to process" }, { status: 500 });
    }
}