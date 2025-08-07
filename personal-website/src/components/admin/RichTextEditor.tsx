import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const toolbarButtons = [
    { command: 'bold', icon: 'B', label: 'Bold' },
    { command: 'italic', icon: 'I', label: 'Italic' },
    { command: 'underline', icon: 'U', label: 'Underline' },
    { command: 'insertUnorderedList', icon: '•', label: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', label: 'Numbered List' },
    { command: 'createLink', icon: '🔗', label: 'Link' },
  ];

  return (
    <div className={`border border-gray-600 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-700 border-b border-gray-600 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button) => (
          <motion.button
            key={button.command}
            onClick={() => {
              if (button.command === 'createLink') {
                const url = prompt('Enter URL:');
                if (url) execCommand(button.command, url);
              } else {
                execCommand(button.command);
              }
            }}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={button.label}
          >
            {button.icon}
          </motion.button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={`min-h-[200px] p-4 bg-gray-700 text-white focus:outline-none ${
          isFocused ? 'ring-2 ring-accent-red' : ''
        }`}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: '1.6',
        }}
      >
        {!value && (
          <span className="text-gray-400 italic">{placeholder}</span>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;