import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
