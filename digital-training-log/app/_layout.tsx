import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from '@/components/useColorScheme';
import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present
  initialRouteName: "(tabs)",
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="system">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Pace Calculator',
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
