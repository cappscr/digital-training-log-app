import type { Metadata } from "next";
import { Suspense } from "react";
import PaceResults from "@/components/pace-results";

export const metadata: Metadata = {
  title: "Digital Training Log App | Pace Calculator Results",
};

export default function PaceResultsPage() {
  return (
    <Suspense>
      <PaceResults />
    </Suspense>
  );
}
