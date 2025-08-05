export interface CurrencyData {
  currency: string;
  symbol: string;
  rate: number;
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
    
    const currencyData: CurrencyData = {
      currency: data.currency || 'USD',
      symbol: getCurrencySymbol(data.currency || 'USD'),
      rate: 1 // Will be updated with exchange rate
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

// Get exchange rate
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  if (fromCurrency === toCurrency) return 1;
  
  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`);
    const data = await response.json();
    return data.result || 1;
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    return 1;
  }
}

// Convert price from USD to target currency
export async function convertPrice(usdPrice: number, targetCurrency: string): Promise<PriceData> {
  try {
    const rate = await getExchangeRate('USD', targetCurrency);
    const convertedAmount = usdPrice * rate;
    
    return {
      amount: formatCurrency(convertedAmount, targetCurrency),
      currency: targetCurrency,
      symbol: getCurrencySymbol(targetCurrency)
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (error) {
    // Fallback formatting
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }
}

// Get currency symbol
export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    CNY: '¥',
    KRW: '₩',
    RUB: '₽',
    BRL: 'R$',
    MXN: '$',
    SGD: 'S$',
    HKD: 'HK$',
    NZD: 'NZ$',
    CHF: 'CHF',
    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    PLN: 'zł',
    CZK: 'Kč',
    HUF: 'Ft',
    RON: 'lei',
    BGN: 'лв',
    HRK: 'kn',
    TRY: '₺',
    ZAR: 'R',
    THB: '฿',
    MYR: 'RM',
    IDR: 'Rp',
    PHP: '₱',
    VND: '₫',
    EGP: 'E£',
    NGN: '₦',
    KES: 'KSh',
    GHS: 'GH₵',
    MAD: 'MAD',
    TND: 'TND',
    AED: 'د.إ',
    SAR: 'ر.س',
    QAR: 'ر.ق',
    KWD: 'د.ك',
    BHD: '.د.ب',
    OMR: 'ر.ع.',
    JOD: 'د.ا',
    LBP: 'ل.ل',
    ILS: '₪',
    CLP: '$',
    PEN: 'S/',
    UYU: '$U',
    ARS: '$',
    COP: '$',
    VES: 'Bs.',
    UAH: '₴',
    BYN: 'Br',
    KZT: '₸',
    UZS: 'so',
    AZN: '₼',
    GEL: '₾',
    AMD: '֏',
    KGS: 'с',
    TJS: 'ЅМ',
    TMT: 'T',
    MDL: 'L',
    ALL: 'L',
    MKD: 'ден',
    RSD: 'дин.',
    BAM: 'KM',
    MNT: '₮',
    NPR: 'रू',
    BDT: '৳',
    LKR: 'රු',
    MMK: 'K',
    KHR: '៛',
    LAK: '₭',
    MOP: 'MOP$',
    TWD: 'NT$',
    PKR: '₨',
    AFN: '؋',
    IRR: '﷼',
    IQD: 'ع.د',
    SYP: 'ل.س',
    YER: '﷼',
    JMD: 'J$',
    BBD: 'Bds$',
    TTD: 'TT$',
    XCD: 'EC$',
    BZD: 'BZ$',
    GTQ: 'Q',
    HNL: 'L',
    NIO: 'C$',
    CRC: '₡',
    PAB: 'B/.',
    PYG: '₲',
    BOB: 'Bs.',
    SRD: '$',
    GYD: 'G$',
    FJD: 'FJ$',
    WST: 'T',
    TOP: 'T$',
    VUV: 'VT',
    SBD: 'SI$',
    PGK: 'K',
    KID: '$',
    TVD: '$',
    FKP: 'FK£',
    GIP: '£',
    SHP: '£',
    AOA: 'Kz',
    BWP: 'P',
    LSL: 'L',
    SZL: 'E',
    NAD: 'N$',
    MWK: 'MK',
    ZMW: 'K',
    ZWL: '$',
    CDF: 'FC',
    XAF: 'FCFA',
    XOF: 'CFA',
    XPF: 'CFP',
    KMF: 'CF',
    DJF: 'Fdj',
    ETB: 'Br',
    ERN: 'Nfk',
    GMD: 'D',
    GNF: 'FG',
    LRD: 'L$',
    MRO: 'UM',
    MUR: '₨',
    SCR: '₨',
    SOS: 'S',
    SDG: 'ج.س.',
    SSP: 'SSP',
    TZS: 'TSh',
    UGX: 'USh',
    BIF: 'FBu',
    CVE: '$',
    STN: 'Db',
    
    DZD: 'د.ج',
    LYD: 'ل.د',

    MRU: 'UM',
    MZN: 'MT'
    
  };
  
  return symbols[currency] || currency;
}

// Initialize currency detection
export async function initializeCurrency(): Promise<CurrencyData> {
  const currency = await getUserCurrency();
  const rate = await getExchangeRate('USD', currency);
  
  return {
    currency,
    symbol: getCurrencySymbol(currency),
    rate
  };
} 