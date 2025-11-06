import { Input } from '@rneui/themed';

export type AmountInputProps = {
  value: string;
  onChange: (v: string) => void;
};

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  const handleChangeText = (text: string) => {
    onChange(text.replace(/[^0-9.,]/g, ''));
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
