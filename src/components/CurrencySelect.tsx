import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { CnbRate } from '../api/cnb';

export type CurrencySelectProps = {
  rates: CnbRate[];
  selected?: string;
  onSelect: (code: string) => void;
};

export const CurrencySelect = ({
  rates,
  selected,
  onSelect,
}: CurrencySelectProps) => {
  const handleValueChange = (val: string) => {
    onSelect(val);
  };

  return (
    <View style={styles.wrapper}>
      <Picker selectedValue={selected} onValueChange={handleValueChange}>
        {rates.map(r => {
          const label = `${r.code} (${r.currency})`;
          return <Picker.Item key={r.code} label={label} value={r.code} />;
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
  },
});
