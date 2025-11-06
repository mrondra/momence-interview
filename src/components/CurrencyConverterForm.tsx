import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import type { CnbRate } from '../api/cnb';
import { convertCzkToForeign } from '../utils/convertCzkToForeign';
import { getNumber } from '../utils/getNumber';
import { AmountInput } from './AmountInput';
import { CurrencySelect } from './CurrencySelect';
import { ConversionResult } from './ConversionResult';

export type CurrencyConverterFormProps = {
  rates: CnbRate[];
};

export const CurrencyConverterForm = ({ rates }: CurrencyConverterFormProps) => {
  const preferredCode = (rates.find(r => r.code === 'EUR') || rates[0])?.code;
  const [selected, setSelected] = useState<string | undefined>(preferredCode);
  const [czkInput, setCzkInput] = useState('100');
  const [submitted, setSubmitted] = useState(false);

  const selectedRate = rates.find(r => r.code === selected);
  const czkAmount = getNumber(czkInput, 0);
  const converted = selectedRate ? convertCzkToForeign(selectedRate, czkAmount) : 0;

  const handleAmountChange = (v: string) => {
    setCzkInput(v);
    setSubmitted(false);
  };
  const handleCurrencySelect = (code: string) => {
    setSelected(code);
    setSubmitted(false);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Převodník měn</Text>
      <AmountInput value={czkInput} onChange={handleAmountChange} />
      <Text style={styles.label}>Měna</Text>
      <CurrencySelect rates={rates} selected={selected} onSelect={handleCurrencySelect} />
      <Button title="Převést" onPress={handleSubmit} containerStyle={styles.button} />
      {submitted && selectedRate ? (
        <ConversionResult selectedRate={selectedRate} czkAmount={czkAmount} converted={converted} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 8 },
  label: { marginLeft: 4, fontWeight: '600', marginTop: 8 },
  button: { marginTop: 16 },
});
