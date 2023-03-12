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
      <html lang="en">
        <body>
          <SessionProvider>
            <Header session={session} />
            <div className="bg-white flex items-center justify-center dark:bg-gray-700">
              {children}
            </div>
            <Footer />
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
