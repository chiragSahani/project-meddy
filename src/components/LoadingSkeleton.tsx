import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white/10 rounded ${className}`}>
      <div className="invisible">Loading...</div>
    </div>
  );
};

interface TechnicalLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'bars' | 'blockchain' | 'crypto';
  className?: string;
  text?: string;
}

export const TechnicalLoader: React.FC<TechnicalLoaderProps> = ({
  size = 'md',
  variant = 'crypto',
  className = '',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-2 border-white/20 border-t-[#6EE7F9] rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {text && <p className={`${textSizeClasses[size]} text-white/60 font-medium`}>{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#6EE7F9] rounded-full"
              animate={{ y: [-4, 4, -4] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && <p className={`${textSizeClasses[size]} text-white/60 font-medium`}>{text}</p>}
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div className="flex items-end space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-[#6EE7F9] to-[#C084FC] rounded-sm"
              style={{ height: '16px' }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && <p className={`${textSizeClasses[size]} text-white/60 font-medium`}>{text}</p>}
      </div>
    );
  }

  if (variant === 'blockchain') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
        <div className="flex items-center space-x-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 border border-[#6EE7F9] bg-white/5 rounded-sm"
              animate={{
                scale: [1, 1.2, 1],
                borderColor: ['#6EE7F9', '#C084FC', '#7AF27A', '#6EE7F9']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && <p className={`${textSizeClasses[size]} text-white/60 font-medium`}>{text}</p>}
      </div>
    );
  }

  // Default crypto variant
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-[#6EE7F9]/20 to-[#C084FC]/20 border border-white/20 flex items-center justify-center`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="text-[#6EE7F9] font-bold text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ₿
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#7AF27A] border-r-[#C084FC]"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {text && <p className={`${textSizeClasses[size]} text-white/60 font-medium`}>{text}</p>}
    </div>
  );
};

export const CoinRowSkeleton: React.FC = () => {
  return (
    <tr className="border-b border-white/10">
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
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
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

interface FullPageLoaderProps {
  message?: string;
  variant?: 'crypto' | 'blockchain' | 'bars';
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  message = 'Loading market data...',
  variant = 'crypto'
}) => {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_#071421,_#02060a)] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <TechnicalLoader
          size="lg"
          variant={variant}
          text={message}
          className="mb-6"
        />

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs text-white/40 uppercase tracking-wider font-medium"
        >
          Crypto Dashboard
        </motion.div>
      </motion.div>
    </div>
  );
};