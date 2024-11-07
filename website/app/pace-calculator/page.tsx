import type { Metadata } from "next";
import PaceCalculator from "@/components/pace-calculator";

export const metadata: Metadata = {
  title: 'Digital Training Log App | Pace Calculator'
}

export default function PaceCalculatorPage() {
  return <PaceCalculator />;
}
