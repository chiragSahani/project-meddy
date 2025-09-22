export interface ChartDataItem {
  name: string;
  fullName: string;
  change?: number;
  value?: number;
  volume?: number;
  color?: string;
  [key: string]: string | number | undefined;
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
    value: number;
  }>;
  label?: string;
}

export interface BarProps {
  payload?: ChartDataItem;
  fill?: string;
}