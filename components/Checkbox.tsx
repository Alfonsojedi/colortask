import {Image, Text, View} from 'react-native';
import React from 'react';
import checkStyle from '@/constants/checkStyle';
const CheckIcon = require('@/assets/images/checkmark.png');

type CheckboxProps = {
  isChecked: boolean;
  label: string;
};

function Checkbox({isChecked, label}: CheckboxProps) {
  return (
    <View style={checkStyle.wrapper}>
      <View style={[checkStyle.check, isChecked && checkStyle.checked]}>
        {isChecked ? <Image source={CheckIcon}/> : null}
      </View>
      <Text
        style={[
          checkStyle.label,
          isChecked && checkStyle.labelChecked,
        ]}>
        {label}
      </Text>
    </View>
  );
}

export default Checkbox;