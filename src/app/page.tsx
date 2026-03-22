"use client";
import { useEffect, useState, useCallback } from "react";
import { Client, Task } from "@/types";
import { ClientList } from "@/components/ClientList";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { StatsBar } from "@/components/StatsBar";
import { ShieldCheck, Users } from "lucide-react";

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Fetch clients
  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .finally(() => setLoadingClients(false));
  }, []);

  // Fetch tasks
  const fetchTasks = useCallback(() => {
    if (!selectedId) return;
    setLoadingTasks(true);
    const params = new URLSearchParams({ clientId: selectedId });
    if (status !== "all") params.set("status", status);
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);

    fetch(`/api/tasks?${params}`)
      .then((r) => r.json())
      .then(setTasks)
      .finally(() => setLoadingTasks(false));
  }, [selectedId, status, category, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/tasks/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const selectedClient = clients.find((c) => c.id === selectedId);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Compliance Tracker</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 border-r bg-muted/30 flex flex-col">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Clients</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {loadingClients ? (
              <p className="px-3 py-4 text-sm text-muted-foreground">Loading clients...</p>
            ) : (
              <ClientList clients={clients} selectedId={selectedId} onSelect={setSelectedId} />
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {!selectedClient ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a client to view tasks
            </div>
          ) : (
            <div className="p-6 space-y-5">
              {/* Client header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedClient.companyName}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedClient.country} · {selectedClient.entityType}
                  </p>
                </div>
                <AddTaskDialog clientId={selectedId!} onCreated={fetchTasks} />
              </div>

              {/* Stats */}
              <StatsBar tasks={tasks} />

              {/* Filters */}
              <TaskFilters
                search={search} status={status} category={category}
                onSearch={setSearch} onStatus={setStatus} onCategory={setCategory}
              />

              {/* Task list */}
              {loadingTasks ? (
                <p className="text-sm text-muted-foreground py-8 text-center">Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <p className="text-sm">No tasks found.</p>
                  <p className="text-xs mt-1">Try adjusting filters or add a new task.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}