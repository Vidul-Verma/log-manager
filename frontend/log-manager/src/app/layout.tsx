import { QueryProvider } from "./context/QueryProvider";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryProvider>
          {children}
          </QueryProvider>
          
          </AuthProvider>
      </body>
    </html>
  );
}
