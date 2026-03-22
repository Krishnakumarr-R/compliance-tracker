import { z } from "zod";

export const createTaskSchema = z.object({
  clientId: z.string().uuid("Invalid client ID"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  category: z.enum(["Tax", "Regulatory", "Audit", "Payroll", "Legal", "Other"]),
  dueDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Pending", "In Progress", "Completed"]).default("Pending"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Completed"]),
});