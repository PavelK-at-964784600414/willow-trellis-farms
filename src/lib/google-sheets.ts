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
      range: 'Sheet1!A2:F1000', // Assuming headers in row 1
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
