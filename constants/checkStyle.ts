import {StyleSheet} from 'react-native';
import { Colores } from './Colores';

const checkStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  check: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    borderColor: '#656565',
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