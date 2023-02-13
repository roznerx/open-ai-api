import "../styles/globals.css";
import SessionProvider from "./provider";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <html lang="en" className="">
        <body>
          <SessionProvider>
            <Header session={session} />
            {children}
            <Footer />
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
