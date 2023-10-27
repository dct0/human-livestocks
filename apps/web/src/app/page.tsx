import { getServerAuthSession } from "@/server/auth";
import { Text, Title } from "@tremor/react";

// https://github.com/t3-oss/create-t3-app/issues/1599
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Title>Welcome</Title>
      <Text>Hello, {session?.user?.name}</Text>
    </main>
  );
}
