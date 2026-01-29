import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import Header from './Header';
import useHideBottomBar from '@hooks/useHideBottomBar';
//@ts-ignore
import { TemplateProps } from '@project-types/index';
import ScreenLoader from '@components/ScreenLoader';

const Template = (props: TemplateProps) => {
  const {
    children,
    containerStyle,
    style,
    showHeader = true,
    headerProps,
    renderStickyFooter,
    showFooter = true,
    isLoading = false,
    stickyHeader = false,
  } = props;

  if (!showFooter) {
    useHideBottomBar();
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      {stickyHeader && (
        <Header title={headerProps?.title || ''} {...headerProps} />
      )}
      <ScrollView
        ref={props.scrollRef}
        style={[
          styles.container,
          {
            backgroundColor: '#FCF9FF',
          },
          containerStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              alignItems: 'center',
            },
          ]}
        >
          {!stickyHeader && (
            <Header title={headerProps?.title || ''} {...headerProps} />
          )}
          <View
            style={[
              {
                flex: 1,
                width: '100%',
                marginBottom: showFooter ? 72 : 0,
              },
              style,
            ]}
          >
            {children}
          </View>
        </View>
        <ScreenLoader open={isLoading} />
      </ScrollView>
      {renderStickyFooter && renderStickyFooter()}
    </SafeAreaView>
  );
};

export default Template;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
