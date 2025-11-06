import type { CnbDailyResponse } from '../../api/cnb';
import { useCnbRates } from '../../api/cnb';
import { DynamicContentRenderer } from '../../components/DynamicContentRenderer';
import { CurrencyConverterForm } from './components/CurrencyConverterForm';

// Screen-level component responsible for fetching CNB rates and rendering the converter form.
export const CurrencyConverterScreen = () => {
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
