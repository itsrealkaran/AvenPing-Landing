export interface CurrencyData {
  currency: string;
  symbol: string;
}

export interface PriceData {
  amount: string;
  currency: string;
  symbol: string;
}

// Cache for currency data
let currencyCache: CurrencyData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Supported currencies - only these will be used, rest default to USD
const SUPPORTED_CURRENCIES = {
  USD: '$',
  INR: '₹',
  CNY: '¥',
  AED: 'د.إ'
};

// Get user's currency from IP geolocation
export async function getUserCurrency(): Promise<string> {
  try {
    // Check cache first
    if (currencyCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return currencyCache.currency;
    }

    // Check localStorage
    const cached = localStorage.getItem('userCurrency');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        currencyCache = parsed.data;
        cacheTimestamp = parsed.timestamp;
        return parsed.data.currency;
      }
    }

    // Fetch from API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // Check if detected currency is supported, otherwise default to USD
    const detectedCurrency = data.currency || 'USD';
    const finalCurrency = SUPPORTED_CURRENCIES[detectedCurrency as keyof typeof SUPPORTED_CURRENCIES] 
      ? detectedCurrency 
      : 'USD';
    
    const currencyData: CurrencyData = {
      currency: finalCurrency,
      symbol: getCurrencySymbol(finalCurrency)
    };

    // Cache the result
    currencyCache = currencyData;
    cacheTimestamp = Date.now();
    localStorage.setItem('userCurrency', JSON.stringify({
      data: currencyData,
      timestamp: cacheTimestamp
    }));

    return currencyData.currency;
  } catch (error) {
    console.error('Error detecting currency:', error);
    return 'USD';
  }
}

// Convert price - now just changes symbol, keeps same number
export async function convertPrice(usdPrice: number, targetCurrency: string): Promise<PriceData> {
  try {
    // Check if target currency is supported
    const finalCurrency = SUPPORTED_CURRENCIES[targetCurrency as keyof typeof SUPPORTED_CURRENCIES] 
      ? targetCurrency 
      : 'USD';
    
    return {
      amount: formatCurrency(usdPrice, finalCurrency),
      currency: finalCurrency,
      symbol: getCurrencySymbol(finalCurrency)
    };
  } catch (error) {
    console.error('Error converting price:', error);
    return {
      amount: formatCurrency(usdPrice, 'USD'),
      currency: 'USD',
      symbol: '$'
    };
  }
}

// Format currency with proper symbol and formatting
export function formatCurrency(amount: number, currency: string): string {
  try {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Math.round(amount)}`;
  } catch (error) {
    // Fallback formatting
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Math.round(amount)}`;
  }
}

// Get currency symbol - simplified to only supported currencies
export function getCurrencySymbol(currency: string): string {
  return SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES] || '$';
}

// Initialize currency detection
export async function initializeCurrency(): Promise<CurrencyData> {
  const currency = await getUserCurrency();
  
  return {
    currency,
    symbol: getCurrencySymbol(currency)
  };
}
