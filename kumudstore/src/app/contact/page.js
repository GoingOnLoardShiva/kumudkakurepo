export default function ContactPage() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-4 text-slate-600">Reach out for a free consultation and quote.</p>

        <div className="mt-8 max-w-md">
          <form className="grid gap-3">
            <input type="text" placeholder="Name" className="w-full rounded-md border px-3 py-2" />
            <input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2" />
            <textarea placeholder="Project details" rows={5} className="w-full rounded-md border px-3 py-2" />
            <button className="rounded-full bg-slate-900 px-5 py-3 text-white">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
