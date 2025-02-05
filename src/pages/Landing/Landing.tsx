import GiftCollection from "@/assets/icons/GiftCollection.svg?react";
import LogoImg from "@/assets/images/Logo.png";
import { BagSelectionItem, NotificationHeader } from "@/components";
import { BagInfo, Languages } from "@/constants";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollRestoration, useNavigate } from "react-router";

export function Landing() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation("landing");
  const navigate = useNavigate();

  const notificationHeaderRef = useRef<HTMLDivElement>(null);
  const [isShowNotification, setIsShowNotification] = useState(true);
  const [notificationMessage] = useState(
    "Electronic Bag have been sold out. Please stay tuned for our latest updates.",
  );

  const handleChangeLanguage = (lang: string) => {
    if (lang === language) return;

    changeLanguage(lang);
  };

  const handleCloseNotificationHeader = () => {
    setIsShowNotification(false);
  };

  const handleScrollToCustomize = () => {
    document.getElementById("first-bag")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleClickBagSelectionButton = (title: string) => {
    if (!notificationHeaderRef.current) return;

    navigate("/customization", {
      state: {
        bag: title,
        notificationHeaderHeight:
          notificationHeaderRef.current.getBoundingClientRect().height,
      },
    });
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <ScrollRestoration />

      {isShowNotification && (
        <NotificationHeader
          ref={notificationHeaderRef}
          notificationMessage={notificationMessage}
          onClick={handleCloseNotificationHeader}
        />
      )}

      <header className='flex items-center px-6 py-4 md:px-12'>
        <img className='h-4' src={LogoImg} alt='logo' />
        <div className='flex flex-1 items-center justify-end gap-8'>
          {Languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleChangeLanguage(code)}
              className={clsx({
                'text-yellow_metal': language === code
              })}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className='mb-10'>
        <div className='flex max-h-[740px] w-full flex-col bg-alabaster lg:flex-row'>
          <div className='xl:px-18 flex flex-col justify-center px-6 lg:w-1/3 lg:px-12'>
            <div>
              <h2 className='mt-6 text-center font-PP_Tondo_Signage text-4xl lg:mt-0 lg:text-left lg:text-5xl'>
                {t('the_order_up')}
              </h2>
              <p className='mt-4 text-center leading-5 lg:text-left'>{t('order_desc_one')}</p>
              <p className='mt-4 text-center leading-5 lg:text-left'>{t('order_desc_two')}</p>
              <div className='mt-8 flex items-center justify-center lg:justify-start'>
                <button
                  className='rounded-lg bg-yellow_metal px-7 py-3.5 text-zinc-100 transition-all duration-150 active:scale-95 active:opacity-75'
                  onClick={handleScrollToCustomize}
                >
                  {t('button_text')}
                </button>
              </div>
            </div>
          </div>

          {/* animation */}
          <div className='mt-4 flex w-full justify-center lg:mt-0 lg:w-2/3'>
            <GiftCollection className='h-full w-full sm:w-[80%] md:w-[60%] lg:w-full' />
          </div>
        </div>

        {/* introduction section */}
        <section className='px-6 pt-12 lg:px-12 lg:pt-16'>
          <h2 className='font-PP_Tondo_Signage text-3xl lg:text-4xl'>{t('introduction')}</h2>
          <div className='mt-4'>
            <p className='w-full lg:w-2/3'>{t('introduction_desc_one')}</p>
            <p className='mt-4 w-full lg:w-2/3'>{t('introduction_desc_two')}</p>
          </div>

          <h2 className='mt-6 font-PP_Tondo_Signage text-3xl lg:text-4xl'>
            {t('redemption_steps')}
          </h2>
          <ol className='mt-4 list-decimal pl-4'>
            <li>{t('redemption_step_one')}</li>
            <li>{t('redemption_step_two')}</li>
            <li>{t('redemption_step_three')}</li>
          </ol>

          <div className='mt-6 lg:flex lg:flex-row'>
            {BagInfo.map((bag, index) => {
              return (
                <BagSelectionItem
                  key={bag.title}
                  {...bag}
                  index={index}
                  onClick={handleClickBagSelectionButton}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
