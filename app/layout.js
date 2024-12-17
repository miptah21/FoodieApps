import './globals.css';
import MainHeader from '@/components/main-header/main-header';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpeedInsights 
          url="https://foodie-apps.vercel.app" />
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
