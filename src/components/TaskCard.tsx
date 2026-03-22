"use client";
import { Task, STATUSES } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { AlertTriangle, Calendar, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

function isOverdue(task: Task) {
  return task.status !== "Completed" && new Date(task.dueDate) < new Date();
}

const priorityVariant: Record<string, "high" | "medium" | "low"> = {
  High: "high", Medium: "medium", Low: "low",
};

const statusVariant: Record<string, "pending" | "inprogress" | "completed"> = {
  Pending: "pending", "In Progress": "inprogress", Completed: "completed",
};

interface Props {
  task: Task;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: Props) {
  const overdue = isOverdue(task);

  return (
    <Card className={cn(
      "transition-all",
      overdue && "border-red-300 bg-red-50/50 shadow-red-100"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {overdue && <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />}
              <h3 className={cn("font-semibold text-sm", overdue && "text-red-900")}>{task.title}</h3>
              <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
              <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
              {overdue && <Badge variant="overdue">Overdue</Badge>}
            </div>

            {task.description && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
            )}

            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded bg-secondary px-2 py-0.5">{task.category}</span>
              <span className={cn("flex items-center gap-1", overdue && "text-red-600 font-medium")}>
                <Calendar className="h-3 w-3" />
                {format(new Date(task.dueDate), "dd MMM yyyy")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Select value={task.status} onValueChange={(v) => onStatusChange(task.id, v)}>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}