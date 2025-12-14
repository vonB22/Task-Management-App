import React from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DatePicker = React.memo<DatePickerProps>(({ value, onChange, label, placeholder = 'Select date', className = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Sync with external value changes
  React.useEffect(() => {
    setSelectedDate(value ? new Date(value) : undefined);
  }, [value]);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString());
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(undefined);
    onChange(undefined);
  };

  const handleQuickSelect = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    handleSelect(date);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 h-10 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 transition-colors duration-150"
        whileTap={{ scale: 0.99 }}
      >
        <span className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Calendar size={16} className="text-neutral-500 dark:text-neutral-400" />
          <span className={selectedDate ? 'font-medium' : 'text-neutral-500 dark:text-neutral-400'}>
            {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : placeholder}
          </span>
        </span>
        {selectedDate && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
            aria-label="Clear date"
          >
            <X size={14} />
          </button>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 z-[100] mt-2 p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl w-full min-w-[280px] max-w-[320px] origin-top"
          >
            {/* Quick Select Buttons */}
            <div className="mb-4 flex gap-2 flex-wrap">
              <motion.button
                type="button"
                onClick={() => handleQuickSelect(0)}
                className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Today
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleQuickSelect(1)}
                className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tomorrow
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleQuickSelect(7)}
                className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next Week
              </motion.button>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <ChevronLeft size={18} className="text-neutral-600 dark:text-neutral-400" />
              </button>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <ChevronRight size={18} className="text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-medium text-neutral-500 dark:text-neutral-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {dateRange.map((date) => {
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isTodayDate = isToday(date);
                const isCurrentMonth = isSameMonth(date, currentMonth);

                return (
                  <motion.button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => handleSelect(date)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      h-8 w-8 flex items-center justify-center text-sm rounded-md transition-all duration-150
                      ${isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-md'
                        : isTodayDate
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                        : isCurrentMonth
                        ? 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        : 'text-neutral-400 dark:text-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }
                    `}
                  >
                    {format(date, 'd')}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
