import { GiftCustomization, GiftImage, Landing } from '@/pages';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/customization',
    element: <GiftCustomization />
  },
  {
    path: '/giftImage',
    element: <GiftImage />
  }
]);

export default router;
