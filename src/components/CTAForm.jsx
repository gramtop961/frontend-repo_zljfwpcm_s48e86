import { useState } from "react";

export default function CTAForm({ open, onClose }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    preferred_time_window: "",
    services: [],
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [error, setError] = useState(null);

  if (!open) return null;

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const toggleService = (svc) => {
    setForm((f) => {
      const exists = f.services.includes(svc);
      return { ...f, services: exists ? f.services.filter((s) => s !== svc) : [...f.services, svc] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/api/care-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setSubmittedId(data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const serviceOptions = [
    { key: "house_cleaning", label: "House cleaning" },
    { key: "meal_preparation", label: "Meal preparation" },
    { key: "toileting_support", label: "Toileting support" },
    { key: "companionship", label: "Companionship" },
    { key: "medication_reminders", label: "Medication reminders" },
    { key: "shopping_errands", label: "Shopping & errands" },
    { key: "overnight", label: "Overnight support" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 p-6 text-white">
        {!submittedId ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">Request care</h3>
              <button onClick={onClose} className="text-white/70 hover:text-white">Close</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required value={form.full_name} onChange={(e)=>setForm({...form, full_name:e.target.value})} placeholder="Full name" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email (optional)" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              <input required value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              <input required value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} placeholder="Address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              <input value={form.preferred_time_window} onChange={(e)=>setForm({...form, preferred_time_window:e.target.value})} placeholder="Preferred time (e.g., mornings, evenings, overnight)" className="md:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              <div className="md:col-span-2">
                <p className="font-medium mb-2">Select services</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {serviceOptions.map((opt) => (
                    <label key={opt.key} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${form.services.includes(opt.key) ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-white/10'}`}>
                      <input type="checkbox" checked={form.services.includes(opt.key)} onChange={() => toggleService(opt.key)} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <textarea value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} placeholder="Anything else we should know?" rows={4} className="md:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 ring-blue-500" />
              {error && <p className="md:col-span-2 text-red-400">{error}</p>}
              <button disabled={submitting} className="md:col-span-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-lg px-6 py-3 font-medium">
                {submitting ? 'Submitting...' : 'Submit request'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Thanks — we received your request</h3>
            <p className="text-blue-200">Your reference ID is</p>
            <p className="text-2xl font-mono">{submittedId}</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={()=>{setSubmittedId(null); onClose();}} className="px-5 py-2 rounded-lg bg-white/10 border border-white/10">Close</button>
              <a href="/" className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Back to home</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
