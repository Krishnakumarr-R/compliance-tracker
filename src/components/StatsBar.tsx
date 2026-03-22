"use client";
import { Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from "lucide-react";

function isOverdue(task: Task) {
  return task.status !== "Completed" && new Date(task.dueDate) < new Date();
}

export function StatsBar({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const overdue = tasks.filter(isOverdue).length;

  const stats = [
    { label: "Total", value: total, icon: ListTodo, color: "text-slate-600", bg: "bg-slate-50" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending", value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Overdue", value: overdue, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}