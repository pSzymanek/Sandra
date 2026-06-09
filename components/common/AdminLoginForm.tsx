"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Nieprawidłowe dane logowania.");
      return;
    }

    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-md gap-4 rounded-[2rem] border border-border/70 bg-card/92 p-7 shadow-panel">
      <label className="grid gap-2 text-sm font-medium">
        Login
        <input
          className="h-12 rounded-2xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Hasło
        <input
          className="h-12 rounded-2xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </label>
      {error ? <p className="rounded-2xl bg-accent/10 p-3 text-sm text-foreground">{error}</p> : null}
      <Button type="submit" disabled={loading}>{loading ? "Logowanie..." : "Zaloguj"}</Button>
    </form>
  );
}
