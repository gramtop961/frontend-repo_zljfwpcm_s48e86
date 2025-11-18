import { useState } from "react";

const SERVICES = [
  { key: "house_cleaning", label: "House cleaning" },
  { key: "meal_preparation", label: "Meal preparation" },
  { key: "toileting_support", label: "Toileting & personal care" },
  { key: "companionship", label: "Companionship" },
  { key: "medication_reminders", label: "Medication reminders" },
  { key: "shopping_errands", label: "Shopping & errands" },
  { key: "overnight", label: "Overnight support" },
];

export default function RequestForm({ open, onClose }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    preferred_dates: [],
    preferred_time_window: "",
    services: [],
    notes: "",
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null, id: null });

  if (!open) return null;

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const toggleService = (key) => {
    setForm((f) => {
      const exists = f.services.includes(key);
      return { ...f, services: exists ? f.services.filter((s) => s !== key) : [...f.services, key] };
    });
  };

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const addPreferredDate = () => {
    setForm((f) => ({ ...f, preferred_dates: [...(f.preferred_dates || []), ""] }));
  };

  const updatePreferredDate = (i, value) => {
    setForm((f) => {
      const arr = [...(f.preferred_dates || [])];
      arr[i] = value;
      return { ...f, preferred_dates: arr };
    });
  };

  const removePreferredDate = (i) => {
    setForm((f) => {
      const arr = [...(f.preferred_dates || [])];
      arr.splice(i, 1);
      return { ...f, preferred_dates: arr };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null, id: null });
    try {
      const payload = {
        ...form,
        // Convert empty strings to undefined for optional fields
        email: form.email || undefined,
        preferred_dates: (form.preferred_dates || []).filter(Boolean),
      };
      const res = await fetch(`${baseUrl}/api/care-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setStatus({ loading: false, success: true, error: null, id: data.id });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message, id: null });
    }
  };

  const resetAndClose = () => {
    setForm({ full_name: "", email: "", phone: "", address: "", preferred_dates: [], preferred_time_window: "", services: [], notes: "" });
    setStatus({ loading: false, success: null, error: null, id: null });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={resetAndClose} />
      <div className="relative w-full max-w-2xl mx-auto bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Request care</h3>
          <button onClick={resetAndClose} className="text-white/70 hover:text-white">✕</button>
        </div>

        {status.success ? (
          <div className="space-y-4">
            <p className="text-green-300">Thank you. We've received your request. Your reference ID is {status.id}.</p>
            <button onClick={resetAndClose} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-blue-100 mb-1">Full name</label>
              <input name="full_name" required value={form.full_name} onChange={updateField} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-blue-100 mb-1">Email (optional)</label>
              <input type="email" name="email" value={form.email} onChange={updateField} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-blue-100 mb-1">Phone</label>
              <input name="phone" required value={form.phone} onChange={updateField} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-blue-100 mb-1">Address</label>
              <input name="address" required value={form.address} onChange={updateField} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm text-blue-100 mb-1">Preferred time</label>
              <select name="preferred_time_window" value={form.preferred_time_window} onChange={updateField} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2">
                <option value="">Select…</option>
                <option value="mornings">Mornings</option>
                <option value="afternoons">Afternoons</option>
                <option value="evenings">Evenings</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-blue-100">Preferred dates (optional)</label>
                <button type="button" onClick={addPreferredDate} className="text-blue-300 hover:text-blue-200 text-sm">+ Add date</button>
              </div>
              <div className="mt-2 space-y-2">
                {(form.preferred_dates || []).map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="date" value={d} onChange={(e) => updatePreferredDate(i, e.target.value)} className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2" />
                    <button type="button" onClick={() => removePreferredDate(i)} className="text-red-300 hover:text-red-200 text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <span className="block text-sm text-blue-100 mb-1">Services needed</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <label key={s.key} className="flex items-center gap-2 bg-slate-800/70 border border-white/10 rounded-lg px-3 py-2">
                    <input type="checkbox" checked={form.services.includes(s.key)} onChange={() => toggleService(s.key)} />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-blue-100 mb-1">Additional notes</label>
              <textarea name="notes" value={form.notes} onChange={updateField} rows={3} className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
              {status.error && <span className="text-red-300 text-sm">{status.error}</span>}
              <button type="button" onClick={resetAndClose} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
              <button disabled={status.loading} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50">
                {status.loading ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
