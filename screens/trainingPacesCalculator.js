import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Text, Chip, Button } from '@rneui/themed';

export const TrainingPacesCalculator = () => {
  const [minPerMileSelected, setMinPerMileSelected] = useState(true);
  const [minPerKmSelected, setMinPerKmSelected] = useState(false);
  const [minText, setMinText] = useState('');
  const [secText, setSecText] = useState('');

  return (
    <View style={styles.container}>
      <View style={[styles.flexRow, {width: '100%'}]}>
        <Icon
          type='material-community'
          name='calculator'
          size={50}
        />
        <Text h1>Training Paces Calculator</Text>
      </View>
      <View style={{ paddingStart: 30, alignSelf: 'flex-start' }}>
        <Text h4>
          Pace
        </Text>
      </View>
      <View style={styles.flexRow}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    //width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //alignSelf: 'stretch',
  }
});