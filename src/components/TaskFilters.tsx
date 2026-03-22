"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, STATUSES } from "@/types";
import { Search } from "lucide-react";

interface Props {
  search: string;
  status: string;
  category: string;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onCategory: (v: string) => void;
}

export function TaskFilters({
  search,
  status,
  category,
  onSearch,
  onStatus,
  onCategory,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select value={category} onValueChange={onCategory}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
