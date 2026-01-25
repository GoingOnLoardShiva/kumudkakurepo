"use client";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-black text-white">
        Retry
      </button>
    </div>
  );
}
