import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import type { CnbRate } from '../../../api/cnb';
import { convertCzkToForeign } from '../../../utils/convertCzkToForeign';
import { getNumber } from '../../../utils/getNumber';
import { AmountInput } from '../../../components/AmountInput';
import { CurrencySelect } from './CurrencySelect';
import { ConversionResult } from './ConversionResult';

export type CurrencyConverterFormProps = {
  rates: CnbRate[];
};

export const CurrencyConverterForm = ({ rates }: CurrencyConverterFormProps) => {
  const preferredCode = rates.find(r => r.code === 'EUR')?.code ?? rates[0]?.code;
  const [selected, setSelected] = useState<string | undefined>(preferredCode);
  const [czkInput, setCzkInput] = useState('100');

  const selectedRate = rates.find(r => r.code === selected);
  const czkAmount = getNumber(czkInput, 0);
  const converted = selectedRate ? convertCzkToForeign(selectedRate, czkAmount) : 0;

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Převodník měn</Text>
      <AmountInput value={czkInput} onChange={setCzkInput} />
      <Text style={styles.label}>Měna</Text>
      <CurrencySelect rates={rates} selected={selected} onSelect={setSelected} />
      {selectedRate && czkAmount > 0 && (
        <ConversionResult
          selectedRate={selectedRate}
          czkAmount={czkAmount}
          converted={converted}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 8 },
  label: { marginLeft: 4, fontWeight: '600', marginTop: 8 },
});
