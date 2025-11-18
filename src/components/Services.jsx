export default function Services() {
  const items = [
    { title: "Personal care", desc: "Toileting, bathing, dressing, mobility support, medication prompts" },
    { title: "Housekeeping", desc: "Cleaning, laundry, tidying, light chores" },
    { title: "Meals", desc: "Meal planning, cooking, hydration reminders, feeding assistance" },
    { title: "Companionship", desc: "Conversation, hobbies, walks, appointments" },
    { title: "Visits anytime", desc: "Daytime, evenings, weekends and bank holidays" },
    { title: "Overnight support", desc: "Sleep‑ins, waking nights, live‑in care if required" }
  ];
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What we can help with</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-800/60 border border-white/10 text-white">
            <h3 className="text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-blue-100/80">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
