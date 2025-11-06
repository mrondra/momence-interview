import { useCnbRates } from '../api/cnb';
import type { CnbDailyResponse } from '../api/cnb';
import { DynamicContentRenderer } from './DynamicContentRenderer';
import { CurrencyConverterForm } from './CurrencyConverterForm';

export const CurrencyConverter = () => {
  const { data, isLoading, error } = useCnbRates();

  const renderContent = ({ rates }: CnbDailyResponse) => (
    <CurrencyConverterForm rates={rates} />
  );

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
