"use client";

import { Title } from "@tremor/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    void signOut();
  }, []);

  return <Title>Logging out...</Title>;
}
