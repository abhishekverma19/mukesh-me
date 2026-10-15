import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Cog,
  Star,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminMachineForm } from "@/components/admin/AdminMachineForm";
import { supabase } from "@/integrations/supabase/client";
import type { Machine } from "@/data/content";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Toast = {
  message: string;
  type: "success" | "error";
};

function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [machines, setMachines] = useState<Machine[]>([]);
  const [loadingMachines, setLoadingMachines] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/admin/login" });
    }
  }, [authLoading, user, navigate]);

  // Show toast
  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Fetch machines
  const fetchMachines = useCallback(async () => {
    setLoadingMachines(true);
    const { data, error } = await supabase
      .from("machines")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast("Failed to load machines", "error");
      console.error(error);
    } else {
      setMachines((data ?? []) as unknown as Machine[]);
    }
    setLoadingMachines(false);
  }, [showToast]);

  useEffect(() => {
    if (user) fetchMachines();
  }, [user, fetchMachines]);

  // Add machine
  const handleAdd = async (formData: any) => {
    setIsSubmitting(true);
    const applications = formData.applications
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    const { error } = await supabase.from("machines").insert({
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      description: formData.description,
      applications,
      image_url: formData.image_url || null,
      availability: formData.availability,
      featured: formData.featured,
      sort_order: formData.sort_order,
    });

    setIsSubmitting(false);
    if (error) {
      showToast("Failed to add machine: " + error.message, "error");
    } else {
      showToast("Machine added successfully!", "success");
      setShowForm(false);
      fetchMachines();
    }
  };

  // Edit machine
  const handleEdit = async (formData: any) => {
    if (!editingMachine) return;
    setIsSubmitting(true);
    const applications = formData.applications
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("machines")
      .update({
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        description: formData.description,
        applications,
        image_url: formData.image_url || null,
        availability: formData.availability,
        featured: formData.featured,
        sort_order: formData.sort_order,
      })
      .eq("id", editingMachine.id);

    setIsSubmitting(false);
    if (error) {
      showToast("Failed to update machine: " + error.message, "error");
    } else {
      showToast("Machine updated successfully!", "success");
      setEditingMachine(null);
      fetchMachines();
    }
  };

  // Delete machine
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("machines").delete().eq("id", id);
    if (error) {
      showToast("Failed to delete machine: " + error.message, "error");
    } else {
      showToast("Machine deleted successfully!", "success");
      setDeletingId(null);
      fetchMachines();
    }
  };

  // Filter machines
  const filtered = machines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0c0f]">
        <Loader2 className="size-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <AdminLayout>
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all ${
            toast.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="size-4" />
          ) : (
            <AlertTriangle className="size-4" />
          )}
          {toast.message}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="mx-4 max-w-sm rounded-2xl border border-white/[0.08] bg-[#16161b] p-6 shadow-2xl">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="size-6 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Delete Machine?
            </h3>
            <p className="mt-2 text-sm text-white/50">
              This action cannot be undone. The machine will be permanently
              removed from the database.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/70"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {(showForm || editingMachine) && (
        <AdminMachineForm
          machine={editingMachine}
          onSubmit={editingMachine ? handleEdit : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditingMachine(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Page header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Machinery Management
        </h2>
        <p className="mt-1 text-sm text-white/40">
          Add, edit, or remove machines from your catalogue.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Machines",
            value: machines.length,
            color: "from-blue-500/20 to-blue-600/20",
            textColor: "text-blue-400",
          },
          {
            label: "Featured",
            value: machines.filter((m) => m.featured).length,
            color: "from-orange-500/20 to-orange-600/20",
            textColor: "text-orange-400",
          },
          {
            label: "Available",
            value: machines.filter((m) =>
              m.availability.toLowerCase().includes("available")
            ).length,
            color: "from-green-500/20 to-green-600/20",
            textColor: "text-green-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              {stat.label}
            </p>
            <p className={`mt-2 text-3xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="Search machines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 sm:w-72"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30"
        >
          <Plus className="size-4" />
          Add Machine
        </button>
      </div>

      {/* Table */}
      {loadingMachines ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-orange-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] py-16 text-center">
          <Cog className="mx-auto size-10 text-white/10" />
          <p className="mt-4 text-sm text-white/30">
            {searchQuery
              ? "No machines match your search."
              : 'No machines yet. Click "Add Machine" to get started.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    Machine
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    Featured
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((machine) => (
                  <tr
                    key={machine.id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {machine.image_url ? (
                          <img
                            src={machine.image_url}
                            alt={machine.name}
                            className="size-10 rounded-lg border border-white/[0.06] object-cover"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04]">
                            <Cog className="size-5 text-white/20" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">
                            {machine.name}
                          </p>
                          <p className="text-xs text-white/30">
                            /{machine.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-white/60">
                        {machine.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          machine.availability
                            .toLowerCase()
                            .includes("available")
                            ? "text-green-400"
                            : machine.availability
                                  .toLowerCase()
                                  .includes("request")
                              ? "text-amber-400"
                              : "text-red-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            machine.availability
                              .toLowerCase()
                              .includes("available")
                              ? "bg-green-400"
                              : machine.availability
                                    .toLowerCase()
                                    .includes("request")
                                ? "bg-amber-400"
                                : "bg-red-400"
                          }`}
                        />
                        {machine.availability}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {machine.featured && (
                        <Star className="size-4 fill-orange-400 text-orange-400" />
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingMachine(machine)}
                          className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-blue-400"
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(machine.id)}
                          className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
