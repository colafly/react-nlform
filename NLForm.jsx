import React, { useState, useRef, useEffect } from 'react';

const NLForm = ({ children, onSubmit, className = 'nl-form' }) => {
  const [openFieldIndex, setOpenFieldIndex] = useState(-1);
  const overlayRef = useRef(null);

  const closeFields = () => {
    setOpenFieldIndex(-1);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      closeFields();
    }
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="nl-form-content">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && (child.type === NLSelect || child.type === NLInput)) {
            return React.cloneElement(child, {
              isOpen: openFieldIndex === index,
              onOpen: () => setOpenFieldIndex(index),
              onClose: closeFields,
              index
            });
          }
          return child;
        })}
      </div>
      <div 
        className="nl-overlay" 
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{ display: openFieldIndex >= 0 ? 'block' : 'none' }}
      />
    </form>
  );
};

const NLSelect = ({ 
  options = [], 
  value, 
  onChange, 
  isOpen = false, 
  onOpen, 
  onClose,
  className = ''
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fieldRef = useRef(null);

  useEffect(() => {
    const initialIndex = options.findIndex(opt => opt.value === value);
    setSelectedIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [value, options]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen) {
      onOpen();
    }
  };

  const handleOptionClick = (option, index, e) => {
    e.preventDefault();
    setSelectedIndex(index);
    onChange(option.value, option.label);
    onClose();
  };

  const selectedOption = options[selectedIndex] || options[0];

  return (
    <div className={`nl-field nl-dd${isOpen ? ' nl-field-open' : ''} ${className}`} ref={fieldRef}>
      <a 
        className="nl-field-toggle" 
        onClick={handleToggle}
        href="#"
      >
        {selectedOption?.label || 'Select option'}
      </a>
      <ul className="nl-options-list">
        {options.map((option, index) => (
          <li 
            key={option.value} 
            className={selectedIndex === index ? 'nl-dd-checked' : ''}
            onClick={(e) => handleOptionClick(option, index, e)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NLInput = ({ 
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
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen) {
      onOpen();
    }
  };

  const handleSubmit = () => {
    onChange(inputValue);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const displayValue = inputValue.trim() !== '' ? inputValue : placeholder;

  return (
    <div className={`nl-field nl-ti-text${isOpen ? ' nl-field-open' : ''} ${className}`}>
      <a 
        className="nl-field-toggle" 
        onClick={handleToggle}
        href="#"
      >
        {displayValue}
      </a>
      <ul className="nl-options-list">
        <li className="nl-ti-input">
          <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="nl-field-go" 
            onClick={handleSubmit}
            type="button"
          >
            Go
          </button>
        </li>
        {subline && (
          <li className="nl-ti-example" dangerouslySetInnerHTML={{ __html: subline }} />
        )}
      </ul>
    </div>
  );
};

export { NLForm, NLSelect, NLInput };
export default NLForm;