import { FlatList, StyleSheet, View, ListRenderItemInfo } from 'react-native';
import { Text } from '@rneui/themed';
import { useCnbRates } from '../api/cnb';
import type { CnbRate, CnbDailyResponse } from '../api/cnb';
import { DynamicContentRenderer } from './DynamicContentRenderer';
import { RateRow } from './RateRow';
import { Separator } from './Separator';

const keyExtractor = (item: CnbRate): string => item.code;

const renderItem = ({ item }: ListRenderItemInfo<CnbRate>) => <RateRow rate={item} />;

const renderContent = (loaded: CnbDailyResponse) => {
  const asOfLabel = loaded.asOf ? `Platné k ${loaded.asOf}` : '';
  return (
    <View style={styles.container}>
      {loaded.asOf ? (
        <View style={styles.header}>
          <Text style={styles.asOfText}>{asOfLabel}</Text>
        </View>
      ) : null}

      <FlatList
        data={loaded.rates}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export const CnbRatesList = () => {
  const { data, isLoading, error } = useCnbRates();

  return (
    <DynamicContentRenderer
      isLoading={isLoading}
      error={error}
      data={data}
      loadingText="Načítám kurzy…"
      renderContent={renderContent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  asOfText: {
    color: '#666',
    marginLeft: 6,
  },
  listContent: {
    paddingBottom: 16,
  },
});


