import { Text, Title } from "@tremor/react";

export default function AuthError() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Title>Error</Title>
      <Text>You are not logged in</Text>
    </div>
  );
}
