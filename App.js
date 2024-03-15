import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TrainingPacesCalculator } from './screens/trainingPacesCalculator';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TrainingPacesCalculator />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
