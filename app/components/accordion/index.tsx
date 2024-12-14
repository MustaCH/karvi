'use client'

import { FC, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <button
        onClick={toggle}
        className="w-full text-left py-3 px-4 font-semibold text-sm hover:bg-gray-300/50 transition-all duration-200 focus:outline-none flex items-center justify-between"
      >
        <span className="capitalize">{title}</span>
        <IoIosArrowDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${ isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
          transition: 'max-height 0.2s ease-out',
        }}
        className="overflow-hidden"
      >
        <div className="py-2 px-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
