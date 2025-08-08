import React from 'react';
import { NLTheme, NLThemeContext, defaultTheme } from './theme';

export interface NLThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<NLTheme>;
}

const mergeTheme = (defaultTheme: NLTheme, customTheme: Partial<NLTheme> = {}): NLTheme => {
  return {
    form: { ...defaultTheme.form, ...customTheme.form },
    field: { ...defaultTheme.field, ...customTheme.field },
    fieldToggle: { ...defaultTheme.fieldToggle, ...customTheme.fieldToggle },
    optionsList: { ...defaultTheme.optionsList, ...customTheme.optionsList },
    optionItem: { ...defaultTheme.optionItem, ...customTheme.optionItem },
    input: { ...defaultTheme.input, ...customTheme.input },
    submitButton: { ...defaultTheme.submitButton, ...customTheme.submitButton },
    submitWrap: { ...defaultTheme.submitWrap, ...customTheme.submitWrap },
    overlay: { ...defaultTheme.overlay, ...customTheme.overlay },
    subline: { ...defaultTheme.subline, ...customTheme.subline },
  };
};

export const NLThemeProvider: React.FC<NLThemeProviderProps> = ({ children, theme = {} }) => {
  const mergedTheme = mergeTheme(defaultTheme, theme);
  
  return (
    <NLThemeContext.Provider value={mergedTheme}>
      {children}
    </NLThemeContext.Provider>
  );
};

export const useNLTheme = () => {
  const context = React.useContext(NLThemeContext);
  if (!context) {
    throw new Error('useNLTheme must be used within an NLThemeProvider');
  }
  return context;
};