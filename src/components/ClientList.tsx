"use client";
import { Client } from "@/types";
import { cn } from "@/lib/utils";
import { Building2, Globe, Tag } from "lucide-react";

interface Props {
  clients: Client[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ClientList({ clients, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-1">
      {clients.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={cn(
            "w-full rounded-lg px-3 py-3 text-left transition-colors hover:bg-accent",
            selectedId === c.id && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <div className="flex items-start gap-2">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{c.companyName}</p>
              <div className="mt-1 flex items-center gap-2">
                <Globe className="h-3 w-3 opacity-60" />
                <span className="text-xs opacity-70">{c.country}</span>
                <Tag className="h-3 w-3 opacity-60" />
                <span className="text-xs opacity-70">{c.entityType}</span>
              </div>
              {c._count && (
                <p className="mt-1 text-xs opacity-60">{c._count.tasks} tasks</p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}