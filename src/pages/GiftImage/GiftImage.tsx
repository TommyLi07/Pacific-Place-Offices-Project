import { useLocation } from 'react-router';

export const GiftImage = () => {
  const location = useLocation();

  const { giftImageSrc } = location.state;

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <img src={giftImageSrc} alt='gift image' className='h-2/3 object-contain' />
    </div>
  );
};

export default GiftImage;
