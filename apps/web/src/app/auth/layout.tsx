import { Card } from "@tremor/react";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mt-24 flex items-center justify-center">
      <Card className="flex w-[24rem] flex-col items-center justify-center gap-3">
        {children}
      </Card>
    </div>
  );
}
