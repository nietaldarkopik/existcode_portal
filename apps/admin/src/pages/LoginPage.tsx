import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Alert, Input } from "@existcode/ui";
import { adminLogin } from "@existcode/api-client";
import { apiClient } from "../app/apiClient";
import { setAuthToken } from "../app/authToken";
import { useAuthStore } from "../app/authStore";

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminLogin(apiClient, { email, password });
      setAuthToken(res.token);
      setUser(res.data);
      setStatus("authenticated");
      navigate("/", { replace: true });
    } catch {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 font-heading text-2xl font-semibold text-neutral-50">Existcode Admin</h1>
        <p className="mb-6 text-sm text-neutral-400">Masuk untuk mengelola konten website.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error ? <Alert variant="danger">{error}</Alert> : null}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Email
            </label>
            <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Password
            </label>
            <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 h-11 rounded-lg bg-accent-500 text-sm font-semibold text-neutral-950 hover:bg-accent-300 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
