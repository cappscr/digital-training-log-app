"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button, Container, Table, TableData, Title } from "@mantine/core";
import { Pace } from "@/lib/pace";

export default function PaceResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paceMin = searchParams.get("min");
  const paceSec = searchParams.get("sec");
  const paceUnits = searchParams.get("units");
  const percentage = parseInt(searchParams.get("percent")!);

  if (!paceMin || !paceSec || !paceUnits || !percentage) {
    router.push("/pace-calculator");
  }

  const pace = new Pace(paceMin!, paceSec!, paceUnits!);
  console.log(pace);

  const tableData: TableData = {
    caption: `Calculated paces based on ${pace.display()}`,
    head: ["Percentage", "Pace"],
    body: [[percentage, pace.calcPercentage(percentage).display()]],
  };

  return (
    <Container size="sm">
      <Title order={1} mt="lg" ta="center">
        Pace Calculator
      </Title>
      <Table
        data={tableData}
        mt="lg"
        striped
        highlightOnHover={true}
        withColumnBorders={true}
        withTableBorder={true}
      />
      <Button radius="md" onClick={() => router.push("/pace-calculator")}>
        Reset
      </Button>
    </Container>
  );
}
