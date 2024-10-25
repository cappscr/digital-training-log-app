import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Heading } from '@/components/ui/heading';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Index() {

  return (
    <Box className="m-3">
      <Heading size="5xl" className="p-3">Pace Calculator
        <FontAwesome name="calculator" size={36} color="black" />
      </Heading>
      <Text className="text-blue-600">Edit app/index.tsx to edit this screen.</Text>
    </Box>
  );
}
