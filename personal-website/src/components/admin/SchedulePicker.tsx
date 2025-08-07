import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SchedulePickerProps {
  value: string;
  onChange: (dateTime: string) => void;
  className?: string;
}

const SchedulePicker: React.FC<SchedulePickerProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return 'Not scheduled';
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleQuickSchedule = (hours: number) => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    onChange(date.toISOString().slice(0, 16));
  };

  return (
    <div className={className}>
      <label className="block text-gray-300 mb-2">Schedule for</label>
      
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-yellow focus:outline-none text-left"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {formatDateTime(value)}
        </motion.button>

        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg p-4 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              {/* Quick Schedule Options */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Quick Schedule</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 3, 6, 12, 24, 48].map((hours) => (
                    <motion.button
                      key={hours}
                      onClick={() => {
                        handleQuickSchedule(hours);
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +{hours}h
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom DateTime Picker */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Custom Time</p>
                <input
                  type="datetime-local"
                  value={value}
                  onChange={handleDateTimeChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-accent-yellow focus:outline-none"
                />
              </div>

              {/* Clear Schedule */}
              <motion.button
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 bg-accent-red text-white rounded text-sm hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear Schedule
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SchedulePicker;