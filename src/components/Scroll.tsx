import React from 'react';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

const ScrollContext = createContext<{
  scrollPosition: number;
}>({
  scrollPosition: 0,
});

const Scroll = ({ children }: PropsWithChildren) => {
  const [scrollPosition, setScollPosition] = useState<number>(0);
  const [scrollEl, setScrollElement] = React.useState<any>(null);
  const ref = React.useRef<any>();
  React.useEffect(() => {
    setScrollElement(ref.current);
  });
  return (
    <ScrollContext.Provider
      value={{
        scrollPosition,
      }}
    >
      <div className="h-full w-full relative">
        <div
          ref={ref}
          className={`absolute top-0	right-0	 h-full w-full overflow-auto`}
          onScroll={(e: any) => {
            setScollPosition(e.target.scrollTop);
          }}
        >
          {children}
        </div>
      </div>
    </ScrollContext.Provider>
  );
};
const useScroll = () => {
  const ctx = useContext(ScrollContext);
  return ctx;
};

export { Scroll, useScroll };
