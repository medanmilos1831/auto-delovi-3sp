// import { createRef } from 'react';
// import { Scroll } from './Scroll';
// import { AppHeader } from './AppHeader/AppHeader';
// import { AppFooter } from './AppFooter';
// import { CSSTransition, SwitchTransition } from 'react-transition-group';
// import { useLocation, useOutlet } from 'react-router-dom';
// import { ShopCard } from './ShopCard';
// import { useApiProvider } from '@/context';
// import { useQuery } from '@tanstack/react-query';

import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { ShopCard } from './ShopCard';
import { ContactProvider } from '../context';

const RootLayout = () => {
  return (
    <ContactProvider>
      <div className="h-screen w-screen flex flex-col relative">
        {/* <AppHeader /> */}
        <div className="flex grow">
          <Outlet />
          {/* <AppHeader data={data} />
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              timeout={400}
              classNames="page"
              nodeRef={s}
              unmountOnExit
            >
              {(state) => {
                return (
                  <div ref={s} className={`page h-full w-full`}>
                    {currentOutlet}
                  </div>
                );
              }}
            </CSSTransition>
          </SwitchTransition> */}
        </div>
        <ShopCard />
      </div>
    </ContactProvider>
  );
};

export { RootLayout };
