export const metadata = {
  title: 'TSSC Success Query',
  description: 'Real results from real Serial Sales Community members.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
