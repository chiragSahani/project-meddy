import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
      <div className="invisible">Loading...</div>
    </div>
  );
};

export const CoinRowSkeleton: React.FC = () => {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4">
        <LoadingSkeleton className="w-8 h-4" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <LoadingSkeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <LoadingSkeleton className="w-20 h-4" />
            <LoadingSkeleton className="w-12 h-3" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton className="w-16 h-4" />
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <LoadingSkeleton className="w-12 h-4" />
          <LoadingSkeleton className="w-16 h-3" />
        </div>
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton className="w-20 h-4" />
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton className="w-18 h-4" />
      </td>
    </tr>
  );
};

export const HighlightCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-2">
        <LoadingSkeleton className="w-6 h-6 rounded-full" />
        <div className="space-y-1 flex-1">
          <LoadingSkeleton className="w-16 h-4" />
          <LoadingSkeleton className="w-10 h-3" />
        </div>
        <LoadingSkeleton className="w-12 h-4" />
      </div>
    </div>
  );
};