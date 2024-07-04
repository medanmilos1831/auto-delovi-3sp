import { NavLink, useLocation } from 'react-router-dom';
import { SPA_ROUTES } from '@/constants';
import { useScroll } from '../Scroll';
import { useDispatch, useSelector } from '@/observer';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useEffect, useState } from 'react';

const AppHeader = () => {
  const { scrollPosition } = useScroll();
  const loc = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { value } = useSelector(
    (state: any) => {
      return {
        numberOfProducts: state.products.length,
      };
    },
    ['addProduct', 'removeItem', 'clearProducts']
  );

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [loc]);

  return (
    <header
      className={`top-0 right-0 w-full px-5 ${
        scrollPosition === 0
          ? 'bg-transparent text-white'
          : 'bg-white text-primaryBlue'
      }`}
      style={{
        position: 'fixed',
        transition: '.4s',
        zIndex: 3,
        paddingTop: scrollPosition === 0 ? '1.5rem' : '1rem',
        paddingBottom: scrollPosition === 0 ? '1.5rem' : '1rem',
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-0 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.HOME_PAGE}
            >
              Pocetna
            </NavLink>
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.PROGRAMS_PAGE}
            >
              Programi
            </NavLink>
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.ABOUT_PAGE}
            >
              O nama
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className={`h-6 w-6 ${
                  scrollPosition === 0 ? 'text-white ' : 'text-primaryBlue'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <div
            className="relative"
            onClick={() => {
              if (!value.numberOfProducts) return;
              dispatch({
                type: 'openCard',
                payload: true,
              });
            }}
          >
            {value.numberOfProducts > 0 ? (
              <div className="t-0 absolute left-4 bottom-2">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                  {value.numberOfProducts}
                </p>
              </div>
            ) : null}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="file: h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="relative">
                {value.numberOfProducts > 0 ? (
                  <div
                    className="t-0 absolute left-3"
                    onClick={() => {
                      if (!value.numberOfProducts) return;
                      dispatch({
                        type: 'openCard',
                        payload: true,
                      });
                    }}
                  >
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {value.numberOfProducts}
                    </p>
                  </div>
                ) : null}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="file: h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2 flex flex-col">
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.HOME_PAGE}
            >
              Pocetna
            </NavLink>
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.PROGRAMS_PAGE}
            >
              Programi
            </NavLink>
            <NavLink
              className={`underLineHover ${
                scrollPosition === 0
                  ? 'underLineHover-white'
                  : 'underLineHover-blue'
              }`}
              to={SPA_ROUTES.ABOUT_PAGE}
            >
              O nama
            </NavLink>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export { AppHeader };
