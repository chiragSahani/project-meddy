import React from 'react';
import { TechnicalLoader } from './LoadingSkeleton';

export const LoaderDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#071421,_#02060a)] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-green-300">
          Technical Loader Variants
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Crypto Loader */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Crypto Loader</h3>
            <TechnicalLoader variant="crypto" text="Loading crypto data..." />
          </div>

          {/* Spinner Loader */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Spinner Loader</h3>
            <TechnicalLoader variant="spinner" text="Processing request..." />
          </div>

          {/* Dots Loader */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Dots Loader</h3>
            <TechnicalLoader variant="dots" text="Fetching data..." />
          </div>

          {/* Bars Loader */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Bars Loader</h3>
            <TechnicalLoader variant="bars" text="Analyzing market..." />
          </div>

          {/* Blockchain Loader */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Blockchain Loader</h3>
            <TechnicalLoader variant="blockchain" text="Mining blocks..." />
          </div>

          {/* Size Variants */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-center">Size Variants</h3>
            <div className="flex items-center justify-center gap-4">
              <TechnicalLoader variant="crypto" size="sm" />
              <TechnicalLoader variant="crypto" size="md" />
              <TechnicalLoader variant="crypto" size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            These loaders use Framer Motion for smooth animations and are designed to match the crypto dashboard theme.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-[#6EE7F9] mb-2">Features</h4>
              <ul className="text-white/70 space-y-1">
                <li>• 5 different variants</li>
                <li>• 3 size options (sm, md, lg)</li>
                <li>• Customizable text</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-[#C084FC] mb-2">Use Cases</h4>
              <ul className="text-white/70 space-y-1">
                <li>• API data loading</li>
                <li>• Page transitions</li>
                <li>• Background processes</li>
                <li>• User interactions</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-[#7AF27A] mb-2">Integration</h4>
              <ul className="text-white/70 space-y-1">
                <li>• Import from LoadingSkeleton</li>
                <li>• Use TechnicalLoader component</li>
                <li>• FullPageLoader for overlays</li>
                <li>• Responsive design ready</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};