import PageLayout from "@/components/layout/main/PageLayout";
import { BetPanel } from "@/components/sections/BetPanel";
import { BetsTable } from "@/components/sections/BetsTable";
import { HistoryPanel } from "@/components/sections/HisoryPanel";
import { Rulette } from "@/components/sections/Rulette";

export default async function Home() {
  return (
    <PageLayout className="relative transition-all gap-8 py-8">
      <HistoryPanel />
      <Rulette />
      <BetPanel />
      <BetsTable />
    </PageLayout>
  );
}
