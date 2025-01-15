import { ReactNode } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

interface WidgetTitleProps {
  title: string;
  children?: ReactNode;
  showMoreOptions?: boolean;
}

export const WidgetTitle = ({ title, children, showMoreOptions = true }: WidgetTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-medium text-gray-700">{title}</h2>
      <div className="flex items-center gap-2">
        {children}
        {showMoreOptions && (
          <button className="p-1 hover:bg-gray-100 rounded">
            <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};
