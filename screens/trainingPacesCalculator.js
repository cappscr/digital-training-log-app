import { StyleSheet, View, TextInput } from 'react-native';
import { Icon, Input, Text, Chip } from '@rneui/themed';

export const TrainingPacesCalculator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Icon
          type='material-community'
          name='calculator'
          size={50}
        />
        <Text h1>Training Paces Calculator</Text>
      </View>
      <Text h4 style={{ marginBottom: 10, paddingStart: 5 }}>
        Pace
      </Text>
      <View style={styles.flexRow}>
        <View>
          <Input style={{flex: 1}} label='Min' />
        </View>
        <View>
          <Input style={{flex: 1}} label='Sec' />
        </View>
        <View>
          <View style={styles.flexRow}>
            <Chip
              title='min/mi'
              type='outline'
            />
            <Chip
              title='km/mi'
              type='outline'
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    //width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  }
});