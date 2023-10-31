import { getServerAuthSession } from "@/server/auth";
import { Text, Title } from "@tremor/react";
import { getProviders } from "next-auth/react";
import LoginPanel from "../../_components/login-panel";

export default async function Login() {
  const providers = await getProviders();

  if (!providers) {
    return <Text>There was an error fetching the providers.</Text>;
  }

  if (await getServerAuthSession()) {
    return <Text>You are already signed in.</Text>;
  }

  return (
    <>
      <Title>Sign in with</Title>
      <LoginPanel providers={providers} />
    </>
  );
}
