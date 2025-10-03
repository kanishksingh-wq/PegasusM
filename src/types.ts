export type Money = {
  amount: number
  currencyCode: string
}

export type ProductImage = {
  id: string
  url: string
  altText?: string | null
  width?: number | null
  height?: number | null
}

export type Product = {
  id: string
  handle?: string
  title: string
  description?: string | null
  images: ProductImage[]
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
}
