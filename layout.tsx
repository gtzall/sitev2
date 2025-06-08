import type { Metadata } from "next"
import type React from "react"
import ClientLayout from "./ClientLayout"
import './globals.css'

export const metadata: Metadata = {
  title: "Sports AG - Camisas Premium de Futebol | Qualidade AAA+",
  description:
    "Descubra as melhores camisas de futebol com qualidade AAA+. Designs premium de times do mundo todo com entrega rápida e PIX automático. Sports AG - Guarulhos, SP.",
  keywords:
    "camisas de futebol, camisas premium, qualidade AAA+, camisas de time, jerseys autênticos, designs premium, guarulhos, sports ag",
  openGraph: {
    title: "Sports AG - Camisas Premium de Futebol",
    description: "Camisas premium de futebol com qualidade AAA+ de times do mundo todo - Sports AG",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
