import React from "react";
import { Text } from "../components/ui/text";
import { Box } from "../components/ui/box";
import { Heading } from '../components/ui/heading';
import { Icon } from '../components/ui/icon';
import { Calculator } from 'lucide-react-native';

export default function Index() {
  return (
    <Box
      className="flex-1"
    >
      <Heading size="3xl">Pace Calculator
        <Icon className="text-typography-500" as={Calculator} />
      </Heading>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </Box>
  );
}
