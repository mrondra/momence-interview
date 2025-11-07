import type { CnbDailyResponse } from '../../api/cnb';
import { useCnbRates } from '../../api/cnb';
import { DynamicContentRenderer } from '../../components/DynamicContentRenderer';
import { CurrencyConverterForm } from './components/CurrencyConverterForm';

const renderContent = ({ rates }: CnbDailyResponse) => (
  <CurrencyConverterForm rates={rates} />
);

export const CurrencyConverterScreen = () => {
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
