import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { Card, Text } from '@rneui/themed';
import isEmpty from 'lodash/isEmpty';

type DynamicContentRendererProps<TData> = {
  isLoading: boolean;
  error?: unknown;
  data?: TData;
  renderContent: (data: TData) => ReactNode;
  loadingText?: string;
  containerStyle?: ViewStyle;
};

export function DynamicContentRenderer<TData>({
  isLoading,
  error,
  data,
  renderContent,
  loadingText = 'Načítám…',
}: DynamicContentRendererProps<TData>) {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator style={styles.spinner} size="large" />
        <Text h4 style={styles.loadingText}>{loadingText}</Text>
      </View>
    );
  }

  if (error != null) {
    return (
      <View style={styles.center}>
        <Card containerStyle={styles.card}>
          <Card.Title>Nepodařilo se načíst data</Card.Title>
          <Text style={styles.errorText}>Něco se pokazilo. Zkuste to prosím později.</Text>
        </Card>
      </View>
    );
  }

  if (data == null || isEmpty(data)) {
    return (
      <View style={styles.center}>
        <Text>Žádná data k zobrazení</Text>
      </View>
    );
  }

  return <View style={styles.containerStyle}>{renderContent(data)}</View>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  progress: {
    alignSelf: 'stretch',
    marginTop: 12,
  },
  spinner: {
    marginTop: 12,
  },
  loadingText: {
    marginTop: 12,
  },
  card: {
    margin: 16,
  },
  errorText: {
    marginBottom: 12,
  },
  containerStyle: {
    flex: 1,
  },
});


