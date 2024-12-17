import React from 'react';
import {Pressable, View} from 'react-native';
import Checkbox from './Checkbox';


type CheckboxListProps = {
  options: {
    id: string;
    label: string;
  }[];
  selectedOption?: string[];
  onPressCheckbox: (id: string) => void;
};

function CheckboxList({
  options,
  selectedOption,
  onPressCheckbox,
}: CheckboxListProps) {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <View>
      {options.map(option => (
        <Pressable
          onPress={() => onPressCheckbox(option.id)}
          style={{marginBottom: 10}}>
          <Checkbox
            key={option.id}
            label={option.label}
            isChecked={!!selectedOption?.includes(option.id)}
          />
        </Pressable>
      ))}
    </View>
  );
}
export default CheckboxList;