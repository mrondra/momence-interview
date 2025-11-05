import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text } from '@rneui/themed';
import type { CnbRate } from '../api/cnb';

export type RateRowProps = { rate: CnbRate };

const RateRowContent = ({ rate }: RateRowProps) => {
  const subtitle = `${rate.amount} ${rate.code}`;
  const rightText = `${rate.rate.toLocaleString('cs-CZ', { maximumFractionDigits: 4 })} Kč`;

  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{rate.currency}</ListItem.Title>
        <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={styles.rateText}>{rightText}</Text>
    </ListItem>
  );
};

export const RateRow = memo(RateRowContent);

const styles = StyleSheet.create({
  rateText: {
    fontWeight: '600',
  },
});
