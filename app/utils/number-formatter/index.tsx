'use client'

import React from 'react';

interface NumberFormatterProps {
  value: number | undefined;
  className?: string;
  startContent?: string;
  endContent?: string;
}

export const NumberFormatter: React.FC<NumberFormatterProps> = ({ value, className, startContent, endContent }) => {
  const formatNumber = (num: number | undefined): string | undefined => {
    return num?.toLocaleString('es-ES');
  };

  return (
    <>
      <p className={className}>{startContent} {formatNumber(value)} {endContent}</p>
    </>
  );
};

export default NumberFormatter;