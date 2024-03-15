import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Input, Text, Chip, Button } from '@rneui/themed';

export const TrainingPacesCalculator = () => {
  const [minPerMileSelected, setMinPerMileSelected] = useState(true);
  const [minPerKmSelected, setMinPerKmSelected] = useState(false);
  const [minText, setMinText] = useState('');
  const [secText, setSecText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.flexRow, {alignSelf: 'center'}]}>
        <Icon
          type='material-community'
          name='calculator'
          size={50}
        />
        <Text h1>Training Paces Calculator</Text>
      </View>
      <View style={styles.flexRow}>
        <Text h4>
          Pace:
        </Text>
        <View>
          <Input
            style={{flex: 1}}
            label='Min'
            keyboardType='numeric'
            onChangeText={newText => setMinText(newText)}
            value={minText}
          />
        </View>
        <View>
          <Input
            style={{flex: 1}}
            label='Sec'
            keyboardType='numeric'
            onChangeText={newText => {setSecText(newText)}}
            value={secText}
          />
        </View>
        <View>
          <View style={styles.flexRow}>
            <Chip
              title='min/mi'
              type={minPerMileSelected ? 'solid' : 'outline'}
              onPress={() => {
                setMinPerMileSelected(!minPerMileSelected);
                setMinPerKmSelected(!minPerKmSelected);
              }}
            />
            <Chip
              title='min/km'
              type={minPerKmSelected ? 'solid' : 'outline'}
              onPress={() => {
                setMinPerMileSelected(!minPerMileSelected);
                setMinPerKmSelected(!minPerKmSelected);
              }}
            />
          </View>
        </View>
      </View>
      <Button
        title='Calculate'
        onPress={() => {console.log(`${minText}:${secText} ${minPerMileSelected ? 'min/mi' : 'km/mi'}`)}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
});