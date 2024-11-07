'use client';

import {useState} from 'react';
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
import { useForm } from "@mantine/form";

export default function HomePage() {
  interface paceCalculatorState {
    pace: string,
    percentage: number
  }

  const [inputPace, setInputPace] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      'pace-min': 1,
      'pace-sec': 0,
      'pace-units': 'min/mi',
      percentage: 1,
    }
  });

  return (
    <Container size="sm">
      <Center>
        <Title order={1}>Pace Calculator</Title>
      </Center>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          key={form.key('pace-min')}
          {...form.getInputProps('pace-min')}
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
          key={form.key('pace-sec')}
          {...form.getInputProps('pace-sec')}
        />
        <NativeSelect
          label=" "
          data={['min/mi', 'km/mi']}
          radius="md"
          key={form.key('pace-units')}
          {...form.getInputProps('pace-units')}
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
        key={form.key('percentage')}
        {...form.getInputProps('percentage')}
      />
      <Button type="submit" radius="md">Calculate</Button>
      </Stack>
      </form>
    </Container>
  );
}
