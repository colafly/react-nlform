import React, { useState, useRef, useEffect } from 'react';
import { NLFormProps, NLSelectProps, NLInputProps } from './types';
import { NLThemeContext, defaultTheme } from './theme';

const NLForm: React.FC<NLFormProps> = ({ children, onSubmit, className = 'nl-form' }) => {
  const [openFieldIndex, setOpenFieldIndex] = useState(-1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const theme = React.useContext(NLThemeContext) || defaultTheme;

  const closeFields = () => {
    setOpenFieldIndex(-1);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeFields();
    }
  };

  return (
    <form 
      className={className} 
      onSubmit={onSubmit}
      style={{
        ...theme.form,
        fontSize: theme.form.fontSize,
        lineHeight: theme.form.lineHeight,
        fontFamily: theme.form.fontFamily,
        fontWeight: theme.form.fontWeight,
        width: theme.form.width,
        margin: theme.form.margin,
      }}
    >
      <div className="nl-form-content">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && (child.type === NLSelect || child.type === NLInput)) {
            return React.cloneElement(child, {
              isOpen: openFieldIndex === index,
              onOpen: () => setOpenFieldIndex(index),
              onClose: closeFields,
              index
            } as any);
          }
          return child;
        })}
      </div>
      <div 
        className="nl-overlay" 
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{ 
          display: openFieldIndex >= 0 ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: theme.overlay.background,
          opacity: theme.overlay.opacity,
          zIndex: theme.overlay.zIndex,
        }}
      />
    </form>
  );
};

export const NLSelect: React.FC<NLSelectProps> = ({ 
  options = [], 
  value, 
  onChange, 
  isOpen = false, 
  onOpen, 
  onClose,
  className = ''
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);
  const theme = React.useContext(NLThemeContext) || defaultTheme;

  useEffect(() => {
    const initialIndex = options.findIndex(opt => opt.value === value);
    setSelectedIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [value, options]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen && onOpen) {
      onOpen();
    }
  };

  const handleOptionClick = (option: { value: string; label: string }, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIndex(index);
    onChange(option.value, option.label);
    if (onClose) onClose();
  };

  const selectedOption = options[selectedIndex] || options[0];

  return (
    <div 
      className={`nl-field nl-dd${isOpen ? ' nl-field-open' : ''} ${className}`} 
      ref={fieldRef}
      style={{
        display: theme.field.display,
        position: theme.field.position,
      }}
    >
      <a 
        className="nl-field-toggle" 
        onClick={handleToggle}
        href="#"
        style={{
          color: theme.fieldToggle.color,
          cursor: theme.fieldToggle.cursor,
          borderBottom: theme.fieldToggle.borderBottom,
          textDecoration: theme.fieldToggle.textDecoration,
          padding: theme.fieldToggle.padding,
          background: theme.fieldToggle.background,
          fontSize: theme.fieldToggle.fontSize,
          fontFamily: theme.fieldToggle.fontFamily,
        }}
      >
        {selectedOption?.label || 'Select option'}
      </a>
      <ul 
        className="nl-options-list"
        style={{
          listStyle: 'none',
          margin: theme.optionsList.margin,
          padding: theme.optionsList.padding,
          position: theme.optionsList.position,
          visibility: isOpen ? 'visible' : 'hidden',
          background: theme.optionsList.background,
          left: '-0.5em',
          top: '50%',
          fontSize: theme.optionsList.fontSize,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(-50%) scale(1)' : 'translateY(-40%) scale(0.9)',
          transition: isOpen ? 'visibility 0s 0s, opacity 0.3s, transform 0.3s' : 'visibility 0s 0.3s, opacity 0.3s, transform 0.3s',
          border: theme.optionsList.border,
          borderRadius: theme.optionsList.borderRadius,
          boxShadow: theme.optionsList.boxShadow,
          minWidth: theme.optionsList.minWidth,
          maxWidth: theme.optionsList.maxWidth,
          zIndex: theme.optionsList.zIndex,
        }}
      >
        {options.map((option, index) => (
          <li 
            key={option.value} 
            className={selectedIndex === index ? 'nl-dd-checked' : ''}
            onClick={(e) => handleOptionClick(option, index, e)}
            style={{
              color: selectedIndex === index ? theme.optionItem.checkedColor : theme.optionItem.color,
              backgroundColor: selectedIndex === index ? theme.optionItem.checkedBackgroundColor : theme.optionItem.backgroundColor,
              padding: theme.optionItem.padding,
              cursor: theme.optionItem.cursor,
              borderBottom: theme.optionItem.borderBottom,
              whiteSpace: 'nowrap',
              position: 'relative',
            }}
          >
            {option.label}
            {selectedIndex === index && (
              <span style={{
                content: '✓',
                position: 'absolute',
                right: '1em',
                fontSize: '75%',
                lineHeight: 2,
              }}>✓</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const NLInput: React.FC<NLInputProps> = ({ 
  type = 'text',
  value = '',
  placeholder = '',
  subline = '',
  onChange,
  isOpen = false,
  onOpen,
  onClose,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = React.useContext(NLThemeContext) || defaultTheme;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen && onOpen) {
      onOpen();
    }
  };

  const handleSubmit = () => {
    onChange(inputValue);
    if (onClose) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const displayValue = inputValue.trim() !== '' ? inputValue : placeholder;

  return (
    <div 
      className={`nl-field nl-ti-text${isOpen ? ' nl-field-open' : ''} ${className}`}
      style={{
        display: theme.field.display,
        position: theme.field.position,
      }}
    >
      <a 
        className="nl-field-toggle" 
        onClick={handleToggle}
        href="#"
        style={{
          color: theme.fieldToggle.color,
          cursor: theme.fieldToggle.cursor,
          borderBottom: theme.fieldToggle.borderBottom,
          textDecoration: theme.fieldToggle.textDecoration,
          padding: theme.fieldToggle.padding,
          background: theme.fieldToggle.background,
          fontSize: theme.fieldToggle.fontSize,
          fontFamily: theme.fieldToggle.fontFamily,
        }}
      >
        {displayValue}
      </a>
      <ul 
        className="nl-options-list"
        style={{
          listStyle: 'none',
          margin: theme.optionsList.margin,
          padding: theme.optionsList.padding,
          position: theme.optionsList.position,
          visibility: isOpen ? 'visible' : 'hidden',
          background: theme.optionsList.background,
          left: '-0.5em',
          top: '50%',
          fontSize: theme.optionsList.fontSize,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(-50%) scale(1)' : 'translateY(-40%) scale(0.9)',
          transition: isOpen ? 'visibility 0s 0s, opacity 0.3s, transform 0.3s' : 'visibility 0s 0.3s, opacity 0.3s, transform 0.3s',
          border: theme.optionsList.border,
          borderRadius: theme.optionsList.borderRadius,
          boxShadow: theme.optionsList.boxShadow,
          minWidth: theme.optionsList.minWidth,
          maxWidth: theme.optionsList.maxWidth,
          zIndex: theme.optionsList.zIndex,
        }}
      >
        <li 
          className="nl-ti-input"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
          }}
        >
          <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              width: theme.input.width,
              padding: theme.input.padding,
              border: theme.input.border,
              borderRadius: theme.input.borderRadius,
              fontSize: theme.input.fontSize,
              color: theme.input.color,
              backgroundColor: theme.input.backgroundColor,
              borderBottom: 'none',
            }}
          />
          <button 
            className="nl-field-go" 
            onClick={handleSubmit}
            type="button"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.1)',
              width: '1.8em',
              textAlign: 'center' as const,
              color: 'transparent',
              border: 'none',
            }}
          >
            <span style={{
              fontSize: '75%',
              color: '#fff',
              width: '100%',
              lineHeight: 2.5,
              display: 'block',
            }}>→</span>
          </button>
        </li>
        {subline && (
          <li 
            className="nl-ti-example" 
            dangerouslySetInnerHTML={{ __html: subline }}
            style={{
              fontSize: theme.subline.fontSize,
              fontStyle: theme.subline.fontStyle,
              fontWeight: theme.subline.fontWeight,
              padding: theme.subline.padding,
              color: theme.subline.color,
              borderTop: theme.subline.borderTop,
            }}
          />
        )}
      </ul>
    </div>
  );
};

export default NLForm;