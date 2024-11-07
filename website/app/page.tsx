import {
  Button,
  Center,
  Container,
  Group,
  NativeSelect,
  NumberInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="sm">
      <Center>
        <Title order={1}>Pace Calculator</Title>
      </Center>
      <Group>
        <NumberInput
          maw={100}
          label="Pace"
          aria-label="minutes in a pace value"
          placeholder="min"
          radius="md"
          allowDecimal={false}
          stepHoldDelay={500}
          stepHoldInterval={100}
          min={0.01}
          max={59.59}
        />
        <Text fw={700} mt="1rem">:</Text>
        <NumberInput
          maw={100}
          label=" "
          aria-label="seconds in a pace value"
          placeholder="sec"
          radius="md"
          allowDecimal={false}
          min={0}
          max={59}
        />
        <NativeSelect
          label=" "
          data={['min/mi', 'km/mi']}
          radius="md"
          />
      </Group>
      <Stack align="flex-start">
      <NumberInput
        maw={100}
        label="Percentage"
        placeholder="95"
        radius="md"
        allowDecimal={false}
        min={1}
        max={99}
        suffix="%"
      />
      <Button radius="md">Calculate</Button>
      </Stack>
    </Container>
  );
}
