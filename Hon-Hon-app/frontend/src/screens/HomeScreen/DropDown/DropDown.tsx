import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../../styles/color';

const dataCategory = [
  { label: 'Studying', value: '1' },
  { label: 'Cartoon', value: '2' },
  { label: 'Novel', value: '3' },
  { label: 'Others', value: '4' },
];
const dataMusic = [
  { label: 'Bird', value: '1' },
  { label: 'Fire', value: '2' },
  { label: 'Rain', value: '3' },
  { label: 'Sea', value: '4' },
  { label: 'Snowfall', value: '5' },
  { label: 'Water', value: '6' },
];

interface DropdownComponentProps {
  dropDownType:number,
  onValueChange: (value: string | null) => void; // เพิ่ม props นี้
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onValueChange, dropDownType }) => {
  const [value, setValue] = useState<string | null>(dropDownType === 2 ? '3' : null); // Set "Rain" as default for music
  const [chkBoxCategory, setChkBoxCategory] = useState({
    Studying: false,
    Cartoon: false,
    Novel: false,
    Others: false,
  });
  const [chkBoxMusic, setChkBoxMusic] = useState({
    Bird: false,
    Fire: false,
    Rain: dropDownType === 2, // Set Rain to true as default for music
    Sea: false,
    Snowfall: false,
    Water: false,
  });

  const renderItem = (item: { label: string; value: string }) => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value && (
        <Ionicons name="musical-note" size={20} color="black" style={styles.icon} />
      )}
    </View>
  );

  const handleChange = (item: { label: string; value: string }) => {
    setValue(item.value);
    onValueChange(item.label);

    if (dropDownType === 1) {
      setChkBoxCategory(prevState => ({
        ...prevState,
        [item.label]: true,
      }));
    } else {
      setChkBoxMusic(prevState => ({
        ...prevState,
        [item.label]: true,
      }));
    }
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={dropDownType === 1 ? dataCategory : dataMusic}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={dropDownType === 1 ? "Categories" : "Choose Music.."}
      value={value}
      onChange={handleChange}
      renderLeftIcon={() => (
        <Ionicons name="musical-note" size={20} color="black" style={styles.icon} />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
  textItem: {
    color:colors.secondary,
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    color:colors.secondary,
    fontSize: 16,
    fontWeight:'bold'
  },
  selectedTextStyle: {
    color:colors.secondary,
    fontSize: 16,
    fontWeight:'bold'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
