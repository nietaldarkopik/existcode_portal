import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ensureCsrfCookie, getAdminMe } from "@existcode/api-client";
import { apiClient } from "./apiClient";
import { useAuthStore } from "./authStore";

export function RequireAuth() {
  const status = useAuthStore((s) => s.status);
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  // Runs on every mount (including React StrictMode's dev-only double-invoke) —
  // each invocation is self-contained via its own `active` flag, so a stale
  // run from a cleaned-up mount can never clobber the surviving one's state.
  useEffect(() => {
    let active = true;
    setStatus("loading");

    ensureCsrfCookie(apiClient)
      .catch(() => undefined)
      .then(() => getAdminMe(apiClient))
      .then((user) => {
        if (active) {
          setUser(user);
          setStatus("authenticated");
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
          setStatus("unauthenticated");
        }
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-sm text-neutral-400">
        Memuat...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
