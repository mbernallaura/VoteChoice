// Descripción: Este layout es el componente principal de la aplicación, provee el contexto a toda la aplicación para su 
// uso general en los diferentes componentes ligados a la sesión de usuario.

import Navbar from "@/components/Navbar"
import AuthProvider from "@/context/AuthProvider"
import '@/styles/globals.css'
import { getServerSession } from "next-auth"
import { NextAuthOptions } from "./api/auth/[...nextauth]/options"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "VoteChoice",
  description: "Decisions made collectively",
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(NextAuthOptions)

  return (
    <html lang="en">
      <body className="font-dmsans">
        <AuthProvider session={session}>
          <Navbar />
          { children }
        </AuthProvider>
      </body>
    </html>
  )
}
