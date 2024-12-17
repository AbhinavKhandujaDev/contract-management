import ThemeToggle from "@/components/theme-toggle";
import Table from "@/components/table";

export default function Home() {
  return (
    <main>
      <nav className="navbar justify-between">
        <label className="font-extrabold text-3xl">Contract Management</label>
        <ThemeToggle />
      </nav>
      <Table />
    </main>
  );
}
