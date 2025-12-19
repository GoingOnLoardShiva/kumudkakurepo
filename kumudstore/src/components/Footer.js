export default function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 text-sm text-slate-600">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="cursor-pointer hover:text-orange-500">© {new Date().getFullYear()} <a href="https://hirenray.vercel.app/">Ray Web App Development</a></div>
          <div className="flex gap-4">Terms · Privacy · Contact</div>
        </div>
        
      </div>
    </footer>
  );
}
