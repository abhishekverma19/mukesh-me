import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Machine } from "@/data/content";

type MachineFormData = {
  name: string;
  slug: string;
  category: string;
  description: string;
  applications: string;
  image_url: string;
  availability: string;
  featured: boolean;
  sort_order: number;
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminMachineForm({
  machine,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  machine?: Machine | null;
  onSubmit: (data: MachineFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [form, setForm] = useState<MachineFormData>({
    name: "",
    slug: "",
    category: "",
    description: "",
    applications: "",
    image_url: "",
    availability: "Available",
    featured: false,
    sort_order: 0,
  });

  useEffect(() => {
    if (machine) {
      setForm({
        name: machine.name,
        slug: machine.slug,
        category: machine.category,
        description: machine.description,
        applications: machine.applications.join(", "),
        image_url: machine.image_url ?? "",
        availability: machine.availability,
        featured: machine.featured,
        sort_order: machine.sort_order,
      });
    }
  }, [machine]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: machine ? prev.slug : toSlug(name),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20";
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#16161b] p-6 shadow-2xl shadow-black/40 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {machine ? "Edit Machine" : "Add New Machine"}
          </h2>
          <button
            onClick={onCancel}
            className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Machine Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Bobcat S650 Skid-Steer Loader"
              className={inputClass}
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="auto-generated-from-name"
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category *</label>
            <input
              type="text"
              required
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="e.g. Excavator, Loader, Skid-Steer"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Brief description of the machine..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Applications */}
          <div>
            <label className={labelClass}>
              Applications{" "}
              <span className="font-normal normal-case text-white/30">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              value={form.applications}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, applications: e.target.value }))
              }
              placeholder="Earthmoving, Excavation, Material Handling"
              className={inputClass}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="text"
              value={form.image_url}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, image_url: e.target.value }))
              }
              placeholder="https://... or /image-name.jpg"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Availability */}
            <div>
              <label className={labelClass}>Availability</label>
              <select
                value={form.availability}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    availability: e.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="Available">Available</option>
                <option value="On Request">On Request</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className={labelClass}>Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sort_order: parseInt(e.target.value) || 0,
                  }))
                }
                className={inputClass}
              />
            </div>
          </div>

          {/* Featured toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({ ...prev, featured: !prev.featured }))
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                form.featured ? "bg-orange-500" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                  form.featured ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-sm text-white/70">Featured on homepage</span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : machine
                  ? "Update Machine"
                  : "Add Machine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
