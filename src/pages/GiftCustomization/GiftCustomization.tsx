import FireworkJson from '@/assets/animations/firework.json';
import CloseIcon from '@/assets/icons/CloseBlack.svg?react';
import DownloadBlackIcon from '@/assets/icons/DownloadBlack.svg?react';
import DownloadWhiteIcon from '@/assets/icons/DownloadWhite.svg?react';
import ResetIcon from '@/assets/icons/Reset.svg?react';
import {
  GiftCustomizationGrid,
  GiftCustomizationHeader,
  GiftCustomizationSection,
  ModalContainer,
  NotificationHeader
} from '@/components';
import { GiftCollection, IconCollection, IconSection } from '@/constants';
import { IconInfo, ItemTypes } from '@/types';
import { useOrientation, useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { toPng, toSvg } from 'html-to-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Trans, useTranslation } from 'react-i18next';
import Lottie from 'react-lottie-player';
import { ScrollRestoration, useLocation, useNavigate } from 'react-router';

export const GiftCustomization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('customization');
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { type: OrientationType } = useOrientation();

  const [isShowNotificationHeader, setIsShowNotificationHeader] = useState(true);
  const [isShowNotificationBar, setIsShowNotificationBar] = useState(false);
  const [notificationMessage] = useState(
    'Electronic Bag have been sold out. Please stay tuned for our latest updates.'
  );
  const [selectedBag, setSelectedBag] = useState<IconInfo>(IconCollection[0].iconInfos[0]);
  const [selectedIcons, setSelectedIcons] = useState<IconInfo[]>([]);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [generatedImage, setGeneratedImage] = useState<string>('');

  // left side icon menu's height on web
  const leftSideScrollViewHeight =
    windowHeight! - 64 - (isShowNotificationHeader ? location.state.notificationHeaderHeight : 0);

  const handleCloseNotificationHeader = useCallback(() => {
    setIsShowNotificationHeader(false);
  }, []);

  const handleCloseNotificationBar = useCallback(() => {
    setIsShowNotificationBar(false);
  }, []);

  /** back modal */
  const handleBackButtonClick = useCallback(() => {
    setIsBackModalOpen(true);
  }, []);

  const handleCancelButtonClick = useCallback(() => {
    setIsBackModalOpen(false);
  }, []);

  const handleDiscardButtonClick = useCallback(() => {
    navigate('/');
    setIsBackModalOpen(false);
  }, [navigate]);

  const handleReset = useCallback(() => {
    setSelectedIcons([]);
  }, []);

  /** order summary modal */
  const handleCloseOrderSummary = useCallback(() => {
    setIsOrderModalOpen(false);
  }, []);

  // handle icon selection
  const handleIconSelect = useCallback(
    (iconInfo: IconInfo) => {
      // handle bag selection
      if (iconInfo.type === ItemTypes.GIFT) {
        if (iconInfo.id === selectedBag.id) return;

        setSelectedBag(iconInfo);

        return;
      }

      // handle icon selection
      // only allow 5 icons to be selected
      if (selectedIcons.length === 5) {
        setIsShowNotificationBar(true);
        return;
      }

      const letterCount = selectedIcons.filter(
        icon => icon.type === ItemTypes.COLORFUL_LETTER || icon.type === ItemTypes.MONOCHROME_LETTER
      ).length;
      const quoteCount = selectedIcons.filter(icon => icon.type === ItemTypes.QUOTE).length;
      const emojiCount = selectedIcons.filter(icon => icon.type === ItemTypes.ChARACTER).length;

      // only allow 3 letters to be selected
      if (
        (iconInfo.type === ItemTypes.COLORFUL_LETTER ||
          iconInfo.type === ItemTypes.MONOCHROME_LETTER) &&
        letterCount === 3
      ) {
        setIsShowNotificationBar(true);
        return;
      }

      // only allow 2 quotes or emojis to be selected
      if (
        (iconInfo.type === ItemTypes.ChARACTER || iconInfo.type === ItemTypes.QUOTE) &&
        quoteCount + emojiCount >= 2
      ) {
        setIsShowNotificationBar(true);
        return;
      }

      setSelectedIcons(prevState => [...prevState, iconInfo]);
    },
    [selectedBag.id, selectedIcons]
  );

  // handle save image button click
  const handleSaveImageButtonClick = useCallback(() => {
    const elementId = windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
    const element = document.getElementById(elementId);

    if (element) {
      toSvg(element, {
        filter: node => node.tagName !== 'i'
      })
        .then(dataUrl => {
          setGeneratedImage(dataUrl);
          setIsOrderModalOpen(true);
        })
        .catch(error => {
          console.error('oops, something went wrong!', error);
        });
    }
  }, [windowWidth]);

  /** order summary modal */
  const handleShowImage = useCallback(() => {
    const elementId = windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
    const element = document.getElementById(elementId);

    if (element) {
      toPng(element)
        .then(dataUrl => {
          navigate('/giftImage', { state: { giftImageSrc: dataUrl } });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [navigate, windowWidth]);

  const handleDownloadImage = useCallback(() => {
    const elementId = windowWidth! < 1180 ? 'exportAreaMobile' : 'exportAreaWeb';
    const element = document.getElementById(elementId);

    if (element) {
      toPng(element)
        .then(dataUrl => {
          const link = document.createElement('a');
          link.download = 'gift.png';
          link.href = dataUrl;
          link.click();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [windowWidth]);

  // set setSelectedBag
  useEffect(() => {
    const { bag: bagId } = location.state;
    const bagInfo = GiftCollection[0].iconInfos.find(icon => icon.id === bagId);

    if (bagInfo) {
      setSelectedBag(bagInfo);
    }
  }, [location.state]);

  // recalculate imageRef
  useEffect(() => {
    if (imageRef.current && selectedIcons.length !== 0) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      let offset = 96;

      // icon's size in image area based on mobile screen size
      if (windowWidth! < 640) {
        offset = 48;
      } else if (windowWidth! < 768) {
        offset = 64;
      } else if (windowWidth! < 1180) {
        offset = 80;
      }

      const newWidth = width - offset;
      const newHeight = height - offset;

      setImageSize({ width: newWidth, height: newHeight });
    }
  }, [imageRef, selectedIcons, windowWidth, OrientationType]);

  return (
    <div className='relative flex h-dvh flex-col'>
      <ScrollRestoration />

      <>
        {isShowNotificationHeader && (
          <NotificationHeader
            notificationMessage={notificationMessage}
            onClick={handleCloseNotificationHeader}
          />
        )}

        {windowWidth && windowWidth < 1180 ? (
          // screen is less than 1180px
          <div className='flex h-full w-full flex-col overflow-hidden'>
            <div className='w-full'>
              <GiftCustomizationHeader
                title={t('gift_customization')}
                onBack={handleBackButtonClick}
              />

              <div className='relative flex w-full items-center justify-center bg-alice_blue py-5'>
                <div className='flex flex-row justify-center'>
                  <div id='exportAreaMobile' className='relative'>
                    <img
                      src={selectedBag.imageSrc}
                      alt='Bag front'
                      ref={imageRef}
                      className='h-[240px] md:h-[300px] lg:h-[360px]'
                    />
                    {selectedIcons.map((selectIcon, index) => (
                      <Draggable
                        key={`${selectIcon.id}-${index}`}
                        bounds={{
                          top: 0,
                          left: 0,
                          right: imageSize.width,
                          bottom: imageSize.height
                        }}
                      >
                        <div
                          id={`${selectIcon.id}-${index}`}
                          className={clsx(
                            `absolute h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`,
                            {
                              'w-15 h-15 sm:w-17 sm:h-17 md:w-21 md:h-21':
                                selectIcon.type === ItemTypes.MONOCHROME_LETTER
                            }
                          )}
                        >
                          <img
                            src={selectIcon.imageSrc}
                            alt='draggable icon'
                            className={clsx('h-full w-full object-contain', {
                              'scale-75': selectIcon.type === ItemTypes.COLORFUL_LETTER,
                              'scale-90': selectIcon.type === ItemTypes.ChARACTER
                            })}
                          />
                        </div>
                      </Draggable>
                    ))}
                  </div>
                </div>

                {/* download button */}
                <button
                  className='absolute right-2 top-2 flex items-center rounded-lg bg-yellow_metal px-2.5 py-2'
                  onClick={handleSaveImageButtonClick}
                >
                  <DownloadWhiteIcon className='h-4 w-4' />
                  <p className='ml-1 text-xs text-zinc-100'>{t('save_image')}</p>
                </button>

                {/* reset button */}
                <button
                  className='absolute bottom-4 right-4 flex items-center rounded-2xl border-2 border-gray-300 p-2 shadow-md shadow-slate-300 transition-all duration-150 active:scale-95 active:opacity-75'
                  onClick={handleReset}
                >
                  <ResetIcon className='h-4 w-4' />
                  <p className='ml-1 text-xs'>{t('reset')}</p>
                </button>

                {/* bottom notification bar */}
                {isShowNotificationBar && (
                  <div className='fixed bottom-5 z-10'>
                    <div className='m-6 flex flex-row items-center gap-6 bg-barley_corn p-4 text-sm'>
                      <p>{t('notification_bar_text')}</p>
                      <CloseIcon className='h-5 w-5' onClick={handleCloseNotificationBar} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='w-full flex-1 overflow-y-auto px-6 py-4'>
              {IconSection.map((section, index) => {
                return (
                  <div key={section.title}>
                    <GiftCustomizationSection
                      title={t(section.title)}
                      subtitle={t(section.subtitle)}
                      index={index}
                    >
                      {section.title === 'gifts'
                        ? GiftCollection.map(({ key, iconInfos }, index) => (
                            <GiftCustomizationGrid
                              key={key}
                              index={index}
                              title={t(key)}
                              iconInfos={iconInfos}
                              selectedBag={selectedBag}
                              selectedIcons={selectedIcons}
                              handleClick={handleIconSelect}
                            />
                          ))
                        : IconCollection.map(({ key, iconInfos }, index) => (
                            <GiftCustomizationGrid
                              key={key}
                              index={index}
                              title={t(key)}
                              iconInfos={iconInfos}
                              selectedBag={selectedBag}
                              selectedIcons={selectedIcons}
                              handleClick={handleIconSelect}
                            />
                          ))}
                    </GiftCustomizationSection>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className='flex flex-1 flex-row'>
            {/* left-side icon collection */}
            <div className='fixed flex h-full w-1/3 flex-col'>
              <GiftCustomizationHeader
                title={t('gift_customization')}
                onBack={handleBackButtonClick}
              />

              <div
                className={`overflow-y-auto p-6`}
                style={{
                  height: leftSideScrollViewHeight
                }}
              >
                {IconSection.map((section, index) => {
                  return (
                    <div key={section.title}>
                      <GiftCustomizationSection
                        title={t(section.title)}
                        subtitle={t(section.subtitle)}
                        index={index}
                      >
                        {section.title === 'gifts'
                          ? GiftCollection.map(({ key, iconInfos }, index) => (
                              <GiftCustomizationGrid
                                key={key}
                                index={index}
                                title={t(key)}
                                iconInfos={iconInfos}
                                selectedBag={selectedBag}
                                selectedIcons={selectedIcons}
                                handleClick={handleIconSelect}
                              />
                            ))
                          : IconCollection.map(({ key, iconInfos }, index) => (
                              <GiftCustomizationGrid
                                key={key}
                                index={index}
                                title={t(key)}
                                iconInfos={iconInfos}
                                selectedBag={selectedBag}
                                selectedIcons={selectedIcons}
                                handleClick={handleIconSelect}
                              />
                            ))}
                      </GiftCustomizationSection>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* right-side image area */}
            <div className='relative ml-[33.33%] flex w-2/3 items-center justify-center bg-alice_blue'>
              <div className='flex w-full flex-row justify-center'>
                <div id='exportAreaWeb' className='relative w-2/3'>
                  <img
                    src={selectedBag.imageSrc}
                    alt='Bag front'
                    ref={imageRef}
                    className='h-full w-full'
                  />
                  {/* draggable icons */}
                  {selectedIcons.map((selectIcon, index) => (
                    <Draggable
                      key={`${selectIcon.id}-${index}`}
                      bounds={{
                        top: 0,
                        left: 0,
                        right: imageSize.width,
                        bottom: imageSize.height
                      }}
                    >
                      <div
                        id={`${selectIcon.id}-${index}`}
                        className={clsx(
                          `absolute h-24 w-24 top-${selectIcon.defaultY} left-${selectIcon.defaultX}`,
                          {
                            'w-25 h-25': selectIcon.type === ItemTypes.MONOCHROME_LETTER
                          }
                        )}
                        style={{
                          transform: `translate(${selectIcon.translateX}px, ${selectIcon.translateY}px)`
                        }}
                      >
                        <img
                          src={selectIcon.imageSrc}
                          alt='draggable icon'
                          className={clsx('h-full w-full', {
                            'scale-75': selectIcon.type === ItemTypes.COLORFUL_LETTER
                          })}
                        />
                      </div>
                    </Draggable>
                  ))}
                </div>
              </div>

              {/* download button */}
              <button
                className='absolute right-8 top-8 flex items-center rounded-lg bg-yellow_metal px-4 py-2'
                onClick={handleSaveImageButtonClick}
              >
                <DownloadWhiteIcon />
                <p className='ml-1 text-base text-zinc-100'>{t('save_image')}</p>
              </button>

              {/* reset button */}
              <button
                className='absolute bottom-10 right-8 flex items-center rounded-2xl border-2 border-gray-300 p-2 shadow-md shadow-slate-300 transition-all duration-150 active:scale-95 active:opacity-75'
                onClick={handleReset}
              >
                <ResetIcon />
                <p className='ml-1'>{t('reset')}</p>
              </button>

              {/* bottom notification bar */}
              {isShowNotificationBar && (
                <div className='w-max-33 absolute bottom-5 flex flex-row items-center bg-barley_corn p-4 text-sm'>
                  <p className='flex-1'>{t('notification_bar_text')}</p>
                  <CloseIcon
                    className='ml-4 h-5 w-5 items-end'
                    onClick={handleCloseNotificationBar}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </>

      {/* back confirmation modal */}
      <ModalContainer open={isBackModalOpen} onClose={handleCancelButtonClick}>
        <div className='md:min-w-[480px]'>
          <h2 className='text-center font-PP_Tondo_Signage text-3xl'>{t('discard')}</h2>
          <p className='mt-4 px-4 text-center md:px-0'>{t('discard_change')}</p>
          <div className='mt-8 flex flex-row items-center justify-between'>
            <button
              className='w-[48%] rounded-lg border-2 border-yellow_metal py-3.5 text-yellow_metal'
              onClick={handleCancelButtonClick}
            >
              {t('cancel')}
            </button>
            <button
              className='w-[48%] rounded-lg bg-yellow_metal py-3.5 text-zinc-100'
              onClick={handleDiscardButtonClick}
            >
              {t('discard')}
            </button>
          </div>
        </div>
      </ModalContainer>

      {/* order summary modal */}
      <ModalContainer
        open={isOrderModalOpen && generatedImage !== ''}
        onClose={handleCloseOrderSummary}
      >
        <Lottie loop animationData={FireworkJson} play className='absolute left-0 top-0 w-full' />

        <div className='relative z-10 max-w-[842px]'>
          <h2 className='font-PP_Tondo_Signage text-2xl md:text-center'>{t('download_image')}</h2>
          <button className='absolute right-0 top-0 p-2'>
            <CloseIcon onClick={handleCloseOrderSummary} />
          </button>

          <p className='mt-1 bg-barley_corn px-3 py-2 text-sm'>{t('image_desc')}</p>

          {generatedImage && (
            <div
              className='mt-2 flex w-full items-center justify-center bg-white md:h-[360px]'
              role='button'
              onClick={handleShowImage}
            >
              <img
                src={generatedImage}
                alt='generated image'
                className={clsx('object-contain', {
                  'max-h-full': windowWidth! > 1400
                })}
              />
            </div>
          )}

          <div className='mt-2 flex flex-row items-center gap-4'>
            <div>
              <h3 className='font-Tondo_W01_Signage text-lg'>{t('friendly_reminders')}</h3>
              <ol
                className={clsx('ml-4 list-decimal', {
                  'text-sm': windowWidth! < 1180
                })}
              >
                <li>{t('reminder_one')}</li>
                <li>
                  <Trans t={t} i18nKey='reminder_two' components={{ underline: <u /> }} />
                </li>
                <li>
                  <Trans t={t} i18nKey='reminder_three' components={{ underline: <u /> }} />
                </li>
                <li>{t('reminder_four')}</li>
              </ol>
            </div>

            <button
              className='rounded-2xl border-2 border-gray-300 bg-zinc-50 p-2 shadow-md shadow-slate-300 transition-all duration-150 active:scale-95 active:opacity-75'
              onClick={handleDownloadImage}
              title='Download image'
            >
              <DownloadBlackIcon />
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default GiftCustomization;
