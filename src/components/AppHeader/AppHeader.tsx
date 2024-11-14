import { NavLink, useLocation } from 'react-router-dom';
import { SPA_ROUTES } from '@/constants';
import { useScroll } from '../Scroll';
import { useDispatch, useSelector } from '@/observer';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useEffect, useState } from 'react';

const AppHeader = ({ data }: any) => {
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
        className="mx-auto flex items-center justify-between p-0 px-7 lg:px-8"
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
        <DialogPanel
          className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
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
                to={SPA_ROUTES.ABOUT_PAGE}
              >
                O nama
              </NavLink>
            </div>
          </div>
          {/* contact info */}
          <div className="mx-auto w-full max-w-screen-xl py-3 lg:py-3 text-black md:hidden block">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-500">
                  3SP
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                <div>
                  <ul className="text-gray-500 font-medium">
                    <li className="mb-2">
                      <a
                        href="https://flowbite.com/"
                        className="hover:underline"
                      >
                        Pon-pet: {data?.radnimDanima}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline"
                      >
                        Subota: {data?.subotom}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tailwindcss.com/"
                        className="hover:underline"
                      >
                        Nedeljom: {data?.nedeljom}
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  {/* <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase text-white">
                Kontakt
              </h2> */}
                  <ul className="text-gray-500 font-medium">
                    <li className="mb-2">
                      <a
                        href={`mailto:${data?.email}`}
                        className="hover:underline "
                      >
                        Email: {data?.email}
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href={`tel:${data?.phone}`}
                        className="hover:underline"
                      >
                        Tel: {data?.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`${data?.coordinate ? data?.coordinate : '#'}`}
                        className="hover:underline"
                      >
                        Adresa: {data?.adresa}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-3 sm:mx-auto border-gray-700 lg:my-3" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center">
                © 2023{' '}
                <a href="https://flowbite.com/" className="hover:underline">
                  3sp
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0 gap-3">
                {data?.facebook ? (
                  <a
                    href={data?.facebook}
                    className="text-gray-500 hover:text-gray-900 "
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Facebook page</span>
                  </a>
                ) : null}
                {data?.instagram ? (
                  <a
                    href={data?.instagram}
                    className="text-gray-500 hover:text-gray-900 "
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Instagram page</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          {/* contact info */}
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export { AppHeader };
