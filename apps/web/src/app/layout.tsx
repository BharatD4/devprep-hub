import type { Metadata } from 'next';
import './globals.css';
import { TRPCProvider } from '../providers/trpc-provider';
import { Navbar } from '../components/navbar';

export const metadata: Metadata = {
  title: 'DevPrep Hub — Cross-Platform Developer Interview Platform',
  description: 'Production-ready software engineering interview preparation with DSA, System Design, AI Mock Interviews, Spaced Repetition, and ATS grading.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-gray-100 antialiased flex flex-col">
        <TRPCProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-800 bg-[#070a12] py-6 text-center text-xs text-gray-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 DevPrep Hub. Production-ready Monorepo Platform.</p>
              <div className="flex items-center gap-4 text-gray-400">
                <span>Turborepo</span>
                <span>Next.js 15</span>
                <span>Expo React Native</span>
                <span>tRPC v10</span>
                <span>Prisma ORM</span>
              </div>
            </div>
          </footer>
        </TRPCProvider>
      </body>
    </html>
  );
}

