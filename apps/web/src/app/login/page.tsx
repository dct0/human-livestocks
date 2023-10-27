import { Card } from "@tremor/react";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import LoginPanel from "../_components/login-panel";

export default async function Login() {
  const providers = await getProviders();

  if (!providers) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <div>
            Sign in is not available at the moment. Please try again later.
          </div>
        </Card>
      </main>
    );
  }

  if (await getServerSession()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <div>You are already signed in.</div>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginPanel providers={providers} />
    </main>
  );
}
