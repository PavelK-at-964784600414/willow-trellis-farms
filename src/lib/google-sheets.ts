import { google } from 'googleapis'

export interface ProductData {
  name: string
  imageUrl: string
  price: number
  quantity: number
  category: string
  description?: string
}

let cachedProducts: ProductData[] = []
let lastFetchTime = 0
const CACHE_DURATION = 1 * 60 * 1000 // 1 minute for faster updates

export async function getProductsFromSheet(): Promise<ProductData[]> {
  const now = Date.now()
  
  // Return cached data if it's still fresh
  if (cachedProducts.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedProducts
  }

  try {
    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Produce!A2:F1000', // Updated to use 'Produce' sheet name
    })

    const rows = response.data.values || []
    
    // Debug logging removed for production
    
    const products: ProductData[] = rows.map((row) => ({
      name: row[0] || '',
      imageUrl: row[1] || '',
      price: parseFloat(row[2]) || 0,
      quantity: parseInt(row[3]) || 0,
      category: row[4] || 'Other',
      description: row[5] || '',
    }))
    
    // Filter out invalid products (no name or price <= 0)
    const filteredProducts = products.filter(product => 
      product.name && product.price > 0
    )
    
    cachedProducts = filteredProducts
    lastFetchTime = now
    
    return filteredProducts
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error)
    return cachedProducts // Return cached data if available
  }
}

export function clearProductCache(): void {
  cachedProducts = []
  lastFetchTime = 0
}

// Seeds-specific interfaces and functions
export interface SeedData {
  name: string
  imageUrl: string
  price: number
  quantity: number
  category: string
  description?: string
  plantingInstructions?: string
}

let cachedSeeds: SeedData[] = []
let lastSeedsFetchTime = 0

export async function getSeedsFromSheet(): Promise<SeedData[]> {
  const now = Date.now()
  
  // Return cached data if it's still fresh
  if (cachedSeeds.length > 0 && now - lastSeedsFetchTime < CACHE_DURATION) {
    return cachedSeeds
  }

  try {
    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Seeds!A2:G1000', // Seeds sheet with extra column for planting instructions
    })

    const rows = response.data.values || []
    
    const seeds: SeedData[] = rows.map((row) => ({
      name: row[0] || '',
      imageUrl: row[1] || '',
      price: parseFloat(row[2]) || 0,
      quantity: parseInt(row[3]) || 0,
      category: row[4] || 'Other',
      description: row[5] || '',
      plantingInstructions: row[6] || '',
    }))
    
    // Filter out invalid seeds (no name or price <= 0)
    const filteredSeeds = seeds.filter(seed => 
      seed.name && seed.price > 0
    )
    
    cachedSeeds = filteredSeeds
    lastSeedsFetchTime = now
    
    return filteredSeeds
  } catch (error) {
    console.error('Error fetching seeds from Google Sheets:', error)
    return cachedSeeds // Return cached data if available
  }
}

export function clearSeedsCache(): void {
  cachedSeeds = []
  lastSeedsFetchTime = 0
}
