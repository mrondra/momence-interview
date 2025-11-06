import React from 'react';
import { Card, Text } from '@rneui/themed';
import type { CnbRate } from '../../../api/cnb';
import { StyleSheet } from 'react-native';
import { getPerUnitRate } from '../../../utils/getPerUnitRate.ts';

export type ConversionResultProps = {
  selectedRate: CnbRate;
  czkAmount: number;
  converted: number;
};

const MAX_FRACTION_CZK = 2;
const MAX_FRACTION_FOREIGN = 4;

const formatCzk = (value: number) =>
  value.toLocaleString('cs-CZ', { maximumFractionDigits: MAX_FRACTION_CZK });
const formatForeign = (value: number) =>
  value.toLocaleString('cs-CZ', { maximumFractionDigits: MAX_FRACTION_FOREIGN });

export const ConversionResult = ({
  selectedRate,
  czkAmount,
  converted,
}: ConversionResultProps) => {
  const perUnitRate = getPerUnitRate(selectedRate);
  const conversionLabel = `${formatCzk(czkAmount)} Kč = ${formatForeign(converted)} ${selectedRate.code}`;
  const perUnitText = perUnitRate == null
    ? 'Neplatný kurz'
    : `1 ${selectedRate.code} = ${formatForeign(perUnitRate)} Kč`;

  return (
    <Card containerStyle={styles.resultCard}>
      <Text style={styles.resultText}>{conversionLabel}</Text>
      <Text style={styles.hint}>{perUnitText}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  resultCard: { marginTop: 24, width: '100%' },
  resultText: { fontSize: 18, fontWeight: '600' },
  hint: { marginTop: 8, color: '#666' },
});
