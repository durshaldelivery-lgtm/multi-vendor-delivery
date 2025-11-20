import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QuickDeliver - Multi-Vendor Food Delivery Platform',
  description: 'Complete food delivery platform with vendor management, order tracking, and customer reviews',
  keywords: 'food delivery, restaurant, vendor, multi-vendor, ordering, delivery',
  authors: [{ name: 'QuickDeliver Team' }],
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}