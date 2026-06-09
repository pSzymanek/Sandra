import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/common/AdminLoginForm";

export const metadata: Metadata = {
  title: "Logowanie do panelu",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center bg-background px-5 py-12">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary/85">Panel administratora</p>
        <h1 className="mb-8 font-display text-5xl">Logowanie</h1>
        <AdminLoginForm />
      </div>
    </main>
  );
}
