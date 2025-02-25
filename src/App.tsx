import '@/locales';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { RouterProvider } from 'react-router';
import router from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SpeedInsights />
    </>
  );
}

export default App;
