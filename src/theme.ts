import React from 'react';

export interface NLTheme {
  form: {
    fontSize?: string;
    lineHeight?: string | number;
    fontFamily?: string;
    fontWeight?: string | number;
    width?: string;
    margin?: string;
  };
  field: {
    display?: string;
    position?: 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';
  };
  fieldToggle: {
    color?: string;
    cursor?: string;
    borderBottom?: string;
    textDecoration?: string;
    padding?: string;
    background?: string;
    fontSize?: string;
    fontFamily?: string;
  };
  optionsList: {
    position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky';
    background?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    fontSize?: string;
    minWidth?: string;
    maxWidth?: string;
    zIndex?: number;
    padding?: string;
    margin?: string;
  };
  optionItem: {
    color?: string;
    padding?: string;
    cursor?: string;
    borderBottom?: string;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    checkedColor?: string;
    checkedBackgroundColor?: string;
  };
  input: {
    width?: string;
    padding?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    placeholderColor?: string;
  };
  submitButton: {
    background?: string;
    color?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string | number;
    letterSpacing?: string;
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    cursor?: string;
    border?: string;
    borderRadius?: string;
    lineHeight?: string | number;
  };
  submitWrap: {
    marginTop?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
  overlay: {
    background?: string;
    zIndex?: number;
    opacity?: number;
  };
  subline: {
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string | number;
    padding?: string;
    color?: string;
    borderTop?: string;
  };
}

export const defaultTheme: NLTheme = {
  form: {
    fontSize: '4em',
    lineHeight: 1.5,
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 300,
    width: '100%',
    margin: '0.3em auto 0 auto',
  },
  field: {
    display: 'inline-block',
    position: 'relative',
  },
  fieldToggle: {
    color: '#b14943',
    cursor: 'pointer',
    borderBottom: '1px dashed #b14943',
    textDecoration: 'none',
    padding: '0',
    background: 'transparent',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },
  optionsList: {
    position: 'absolute',
    background: '#76C3BD',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    fontSize: '80%',
    minWidth: '8em',
    zIndex: 10000,
    padding: '0',
    margin: '0',
  },
  optionItem: {
    color: '#fff',
    padding: '0 1.5em 0 0.5em',
    cursor: 'pointer',
    borderBottom: 'none',
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'rgba(0,0,0,0.05)',
    checkedColor: '#478982',
    checkedBackgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    padding: '0.2em 2em 0.2em 0.5em',
    border: 'none',
    borderRadius: '0',
    fontSize: 'inherit',
    color: '#fff',
    backgroundColor: 'transparent',
    placeholderColor: 'rgba(255,255,255,0.8)',
  },
  submitButton: {
    background: '#76C3BD',
    color: '#fff',
    padding: '0 1em 0 0',
    fontSize: '40%',
    fontWeight: 'bold',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0',
    lineHeight: 3,
  },
  submitWrap: {
    marginTop: '0.4em',
    textAlign: 'left',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    opacity: 1,
  },
  subline: {
    fontSize: '40%',
    fontStyle: 'italic',
    fontWeight: 400,
    padding: '0.4em 1em',
    color: 'rgba(0,0,0,0.2)',
    borderTop: '1px dashed rgba(255,255,255,0.7)',
  },
};

export const NLThemeContext = React.createContext<NLTheme>(defaultTheme);