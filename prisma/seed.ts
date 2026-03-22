import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.task.deleteMany();
  await prisma.client.deleteMany();

  const allClients = await prisma.client.findMany();

  const now = new Date();
  const past = (d: number) => new Date(now.getTime() - d * 86400000);
  const future = (d: number) => new Date(now.getTime() + d * 86400000);

  await prisma.client.createMany({
    data: [
      { companyName: "Acme Corp", country: "India", entityType: "Private Limited" },
      { companyName: "Globex Inc", country: "USA", entityType: "LLC" },
      { companyName: "Initech Ltd", country: "UK", entityType: "LLP" },
    ],
  });

  const clients = await prisma.client.findMany();

  for (const client of clients) {
    await prisma.task.createMany({
      data: [
        { clientId: client.id, title: "GST Filing Q3", description: "Quarterly GST return submission", category: "Tax", dueDate: past(5), status: "Pending", priority: "High" },
        { clientId: client.id, title: "Annual ROC Filing", description: "File annual returns with ROC", category: "Regulatory", dueDate: future(10), status: "Pending", priority: "Medium" },
        { clientId: client.id, title: "TDS Payment", description: "Monthly TDS deposit", category: "Tax", dueDate: past(2), status: "Completed", priority: "High" },
        { clientId: client.id, title: "Audit Report Submission", description: "Submit audited financials", category: "Audit", dueDate: future(20), status: "In Progress", priority: "High" },
        { clientId: client.id, title: "ESI Compliance", description: "Monthly ESI contribution filing", category: "Payroll", dueDate: past(8), status: "Pending", priority: "Low" },
      ],
    });
  }

  console.log("✅ Seed complete");
}

main().catch(console.error).finally(() => prisma.$disconnect());