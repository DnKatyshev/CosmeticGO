// react-dependencies

// Components
import { Header } from '@/components/widgets/Header/Header';
import QueryProvider from './QueryProvider';
import SessionAuthProvider from './SessionProvider';

// Styles
import { inter } from './globalStyles/fonts';
import { raleway } from './globalStyles/fonts';
import { ms_madi } from './globalStyles/fonts';
import './globalStyles/global.css';


export default function RootLayout({
  children,
  modal,
  authorizationModal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  authorizationModal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable} ${ms_madi.variable}`}>
      <body>
        <div className="wrapper">
            <QueryProvider>
              <SessionAuthProvider>
                <Header/>
                {children}
                {modal || <p>Параллельный маршрут не рендерится</p>}
                {authorizationModal || <p>Параллельный маршрут не рендерится</p>}
              </SessionAuthProvider>
            </QueryProvider>
        </div>
      </body>
    </html>
  );
}
