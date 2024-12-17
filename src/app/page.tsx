import ThemeToggle from "@/components/theme-toggle";
import Table from "@/components/table";
import { AddContractButton } from "@/components/AddContractButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <nav className="navbar justify-between">
        <label className="font-extrabold text-3xl">Contract Management</label>
        <ThemeToggle />
      </nav>
      <Table />
      <AddContractButton />
    </main>
  );
}
