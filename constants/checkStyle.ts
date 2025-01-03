import {StyleSheet} from 'react-native';
import { Colores } from './Colores';

const checkStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#EEE',
    borderColor: '#444',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colores.light.success,
    borderColor: Colores.light.outline,
  },
  label: {
    fontSize: 16,
    color: Colores.light.black,
  },
  labelChecked: {
    color: '#06744F',
  },
});

export default checkStyle;