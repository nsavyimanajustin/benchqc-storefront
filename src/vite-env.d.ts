/// <reference types="vite/client" />

declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type LucideIcon = React.FC<LucideProps>;
  export const ShieldCheck: LucideIcon;
  export const Phone: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MapPin: LucideIcon;
  export const Clock: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Search: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Sparkles: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Cpu: LucideIcon;
  export const BatteryCharging: LucideIcon;
  export const Truck: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Award: LucideIcon;
  export const BadgeCheck: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Layers: LucideIcon;
  export const Monitor: LucideIcon;
  export const Tag: LucideIcon;
  export const ArrowUpDown: LucideIcon;
  export const Filter: LucideIcon;
  export const X: LucideIcon;
  export const Laptop: LucideIcon;
  export const HardDrive: LucideIcon;
  export const CalendarCheck: LucideIcon;
  export const Flame: LucideIcon;
  export const Printer: LucideIcon;
  export const Lock: LucideIcon;
  export const FileText: LucideIcon;
  export const Maximize2: LucideIcon;
  export const Copy: LucideIcon;
  export const PackagePlus: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Trash2: LucideIcon;
  export const FileJson: LucideIcon;
  export const Upload: LucideIcon;
  export const Share2: LucideIcon;
  export const Image: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Download: LucideIcon;
  export const Zap: LucideIcon;
  export const Palette: LucideIcon;
  export const Store: LucideIcon;
  export const Package: LucideIcon;
  const icons: Record<string, LucideIcon>;
  export default icons;
}
