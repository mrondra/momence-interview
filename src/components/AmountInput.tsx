import { Input } from '@rneui/themed';

const NUMERIC_INPUT_REGEX = /[^0-9.,]/g;

export type AmountInputProps = {
  value: string;
  onChange: (v: string) => void;
};

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  const handleChangeText = (text: string) => {
    onChange(text.replace(NUMERIC_INPUT_REGEX, ''));
  };

  return (
    <Input
      label="Částka v CZK"
      keyboardType="decimal-pad"
      value={value}
      onChangeText={handleChangeText}
      placeholder="Zadejte částku"
    />
  );
};
