# Sample Google Sheets Data Structure

Create a Google Sheet with the following structure for your FreshCart application:

## Sheet Structure

| A (Name) | B (Image URL) | C (Price) | D (Quantity) | E (Category) | F (Description) |
|----------|---------------|-----------|--------------|--------------|-----------------|
| Organic Apples | https://images.unsplash.com/photo-1567306226416-28f0efdc88ce | 4.99 | 50 | Fruits | Fresh organic apples from local farms |
| Fresh Spinach | https://images.unsplash.com/photo-1576045057995-568f588f82fb | 2.99 | 30 | Vegetables | Crisp and fresh spinach leaves |
| Ripe Bananas | https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e | 3.49 | 75 | Fruits | Sweet and ripe bananas perfect for snacking |
| Organic Carrots | https://images.unsplash.com/photo-1445282768818-728615cc910a | 2.79 | 40 | Vegetables | Crunchy organic carrots |
| Fresh Strawberries | https://images.unsplash.com/photo-1464965911861-746a04b4bca6 | 6.99 | 25 | Fruits | Sweet and juicy strawberries |
| Broccoli Crowns | https://images.unsplash.com/photo-1459411621453-7b03977f4bfc | 3.99 | 35 | Vegetables | Fresh broccoli crowns |
| Red Bell Peppers | https://images.unsplash.com/photo-1563565375-f3fdfdbefa83 | 5.49 | 20 | Vegetables | Crisp red bell peppers |
| Blueberries | https://images.unsplash.com/photo-1498557850523-fd3d118b962e | 8.99 | 15 | Fruits | Antioxidant-rich blueberries |

## Setup Instructions

1. Create a new Google Sheet
2. Add the header row in row 1 with the column names above
3. Add your product data starting from row 2
4. Share the sheet with your Google Service Account email
5. Copy the Sheet ID from the URL and add it to your environment variables

## Note
- Use high-quality images from Unsplash or your own product photos
- Ensure all price values are numbers (no currency symbols)
- Quantity should be whole numbers
- Categories help with filtering on the frontend
