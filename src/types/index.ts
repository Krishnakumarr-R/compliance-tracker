export type Client = {
  id: string;
  companyName: string;
  country: string;
  entityType: string;
  createdAt: string;
  _count?: { tasks: number };
};

export type Task = {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  category: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskCategory = "Tax" | "Regulatory" | "Audit" | "Payroll" | "Legal" | "Other";

export const CATEGORIES: TaskCategory[] = ["Tax", "Regulatory", "Audit", "Payroll", "Legal", "Other"];
export const STATUSES: TaskStatus[] = ["Pending", "In Progress", "Completed"];
export const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];