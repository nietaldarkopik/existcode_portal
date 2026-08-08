export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: 'blue' | 'purple' | 'teal' | 'pink' | 'emerald' | 'amber' | 'indigo' | 'crimson';
  gridSpan: string; // Tailored asymmetrical grid placement
  stats: { label: string; value: string; change: string }[];
  features: string[];
  latency: string;
  throughput: string;
}

export interface ProductItem {
  id: string;
  name: string;
  series: string;
  price: number;
  priceChange: number;
  stock: number;
  rating: number;
  image: string;
  specs: { [key: string]: string };
  accentColor: 'blue' | 'purple' | 'teal' | 'pink' | 'emerald' | 'amber' | 'indigo' | 'crimson';
  description: string;
  isHot?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  fullText: string;
  tags: string[];
  trending: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  color: 'blue' | 'purple' | 'teal' | 'pink' | 'emerald' | 'amber' | 'indigo' | 'crimson';
  tags: string[];
  orbitalAngle?: number;
}

export interface ReactorNode {
  id: string;
  name: string;
  type: 'core' | 'memory' | 'engine' | 'edge';
  x: number; // percentage coordinates
  y: number;
  status: 'active' | 'overclocked' | 'optimizing';
  load: number;
  capacity: string;
  accent: string;
  connectedTo: string[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export type ThemeBaseMode = 'dark-slate' | 'light-alpine' | 'sapphire-navy' | 'steel-gray';

export type AccentColor = 'blue' | 'emerald' | 'amber' | 'indigo' | 'crimson' | 'cyan';

export type LayoutMode = 'showcase' | 'sidebar' | 'bento' | 'compact';

export type NeonPreset = 'cyberpunk' | 'quantum-blue' | 'plasma-pink' | 'emerald-teal';

export interface CompanyBranding {
  name: string;
  tagline: string;
  industry: string;
}

