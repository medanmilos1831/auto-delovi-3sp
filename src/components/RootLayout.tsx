import { createRef } from 'react';
import { Scroll } from './Scroll';
import { AppHeader } from './AppHeader/AppHeader';
import { AppFooter } from './AppFooter';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation, useOutlet } from 'react-router-dom';
import { StoreClientProvider } from '@/observer';
import { ShopCard } from './ShopCard';

const RootLayout = () => {
  const location = useLocation();
  let s = createRef<any>();
  const currentOutlet = useOutlet();
  return (
    <div className="h-screen w-screen flex flex-col relative">
      <div className="flex grow">
        <Scroll>
          <AppHeader />
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
          </SwitchTransition>
        </Scroll>
      </div>
      <AppFooter />
      <ShopCard />
    </div>
  );
};

export { RootLayout };
