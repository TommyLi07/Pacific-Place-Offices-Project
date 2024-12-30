import { Landing } from '@/pages';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
]);

export default router;
