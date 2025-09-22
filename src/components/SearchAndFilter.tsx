import React from 'react';
import { Search, TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';
import type { SortBy } from '../types';

interface SearchAndFilterProps {
  searchTerm: string;
  sortBy: SortBy;
  onSearchChange: (term: string) => void;
  onSortChange: (sort: SortBy) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortChange,
}) => {
  const sortOptions: { value: SortBy; label: string; icon: React.ReactNode }[] = [
    { value: 'market_cap_desc', label: 'Market Cap ↓', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'market_cap_asc', label: 'Market Cap ↑', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'price_desc', label: 'Price ↓', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'price_asc', label: 'Price ↑', icon: <DollarSign className="w-4 h-4" /> },
    { value: 'percent_change_desc', label: '24h Change ↓', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'percent_change_asc', label: '24h Change ↑', icon: <TrendingDown className="w-4 h-4" /> },
    { value: 'volume_desc', label: 'Volume ↓', icon: <BarChart3 className="w-4 h-4" /> },
    { value: 'volume_asc', label: 'Volume ↑', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
     
        <div className="flex-1 relative">
          <label htmlFor="search-input" className="sr-only">
            Search cryptocurrencies by name or symbol
          </label>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            id="search-input"
            type="text"
            placeholder="Search coins by name or symbol..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            aria-label="Search cryptocurrencies by name or symbol"
          />
        </div>

      
        <div className="sm:w-auto">
          <label htmlFor="sort-select" className="sr-only">
            Sort cryptocurrencies by
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer transition-all"
            aria-label="Sort cryptocurrencies by"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};