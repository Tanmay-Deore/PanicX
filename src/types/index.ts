export interface ChaosSettings {
  buttonResistance: number;
  marketDrama: number;
  uiConfusion: number;
  chartAnxiety: number;
  notificationAggression: number;
  sarcasm: number;
  animationChaos: number;
  soundAnnoyance: number;
  tooltipVerbosity: number;
  userRegret: number;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
  volatility: string;
  sentiment: string;
  panicRating: number;
  color: string;
  sparkline: number[];
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  depth: number;
  confidence: number;
  drama: string;
  panic: string;
  type: 'buy' | 'sell';
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  regretScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'panic' | 'ai';
  direction: 'top' | 'bottom' | 'left' | 'right' | 'diagonal';
  timestamp: string;
}

export type WeatherState = 'sunshine' | 'nervous' | 'confused' | 'drizzle' | 'thunderstorm' | 'chaos';

export interface WeatherInfo {
  state: WeatherState;
  title: string;
  subtitle: string;
  icon: string;
  temp: string;
}
