import ThemeToggle from "@/components/theme-toggle";
import Table from "@/components/table";
import { AddContractButton } from "@/components/AddContractButton";

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
