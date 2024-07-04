import { useApiProvider } from '@/context';
import { useDispatch, useSelector } from '@/observer';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ShopCard = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { get, post } = useApiProvider();
  const { value } = useSelector(
    (state: any) => {
      return {
        open: state.openCard,
        products: state.products,
      };
    },
    ['openCard', 'setQyt', 'removeItem', 'clearProducts']
  );

  const { mutate } = useMutation({
    mutationFn: (formData: any) => {
      return post<any>('/naruci', {
        products: value.products,
        ...formData,
      });
    },
    onSuccess: () => {
      dispatch({
        type: 'openCard',
        payload: false,
      });

      dispatch({
        type: 'clearProducts',
        payload: [],
      });
    },
  });
  return (
    <>
      <Dialog
        className="relative z-10"
        open={(() => {
          if (!value.products.length) return false;
          return value.open;
        })()}
        onClose={() => {
          dispatch({
            type: 'openCard',
            payload: false,
          });
        }}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900"></DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() =>
                            dispatch({
                              type: 'openCard',
                              payload: false,
                            })
                          }
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Your content */}
                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 pb-24 pt-4 sm:px-6 lg:max-w-7xl lg:px-0">
                        <form
                          id="form"
                          className="mt-0 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                          onSubmit={() => {
                            console.log('ddddddd');
                          }}
                        >
                          <section
                            aria-labelledby="cart-heading"
                            className="lg:col-span-7"
                          >
                            <h2 id="cart-heading" className="sr-only">
                              Items in your shopping cart
                            </h2>

                            <ul
                              role="list"
                              className="divide-y divide-gray-200 border-b border-t border-gray-200"
                            >
                              {value.products?.map((i: any, index: number) => {
                                return (
                                  <li className="flex py-3 sm:py-6" key={index}>
                                    <div className="flex-shrink-0">
                                      <img
                                        src={i?.product.image}
                                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col sm:ml-6 justify-between">
                                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                        <div>
                                          <div className="flex justify-between">
                                            <h3 className="text-sm">
                                              <a
                                                href="#"
                                                className="font-medium text-gray-700 hover:text-gray-800"
                                              >
                                                {i.product.naziv}
                                              </a>
                                            </h3>
                                          </div>
                                          <p className="mt-1 text-sm font-medium text-gray-900">
                                            RSD {i.product.cena}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-4 sm:mt-4 sm:pr-9">
                                        <Listbox
                                          value={'1'}
                                          onChange={(v) => {
                                            dispatch({
                                              type: 'setQyt',
                                              payload: {
                                                index,
                                                value: v,
                                              },
                                            });
                                          }}
                                        >
                                          {({ open }) => (
                                            <>
                                              <Label className="block text-sm font-medium leading-6 text-gray-900">
                                                Kolicina
                                              </Label>
                                              <div className="relative mt-2">
                                                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                  <span className="block truncate">
                                                    {i?.qty}
                                                  </span>
                                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                      className="h-5 w-5 text-gray-400"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                </ListboxButton>

                                                <ListboxOptions
                                                  transition
                                                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                                >
                                                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                                    (item) => (
                                                      <ListboxOption
                                                        key={item}
                                                        className={({
                                                          focus,
                                                        }) =>
                                                          classNames(
                                                            focus
                                                              ? 'bg-indigo-600 text-white'
                                                              : '',
                                                            !focus
                                                              ? 'text-gray-900'
                                                              : '',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                          )
                                                        }
                                                        value={item}
                                                      >
                                                        {({
                                                          selected,
                                                          focus,
                                                        }) => (
                                                          <>
                                                            <span
                                                              className={classNames(
                                                                selected
                                                                  ? 'font-semibold'
                                                                  : 'font-normal',
                                                                'block truncate'
                                                              )}
                                                            >
                                                              {item}
                                                            </span>

                                                            {selected ? (
                                                              <span
                                                                className={classNames(
                                                                  focus
                                                                    ? 'text-white'
                                                                    : 'text-indigo-600',
                                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                              >
                                                                <CheckIcon
                                                                  className="h-5 w-5"
                                                                  aria-hidden="true"
                                                                />
                                                              </span>
                                                            ) : null}
                                                          </>
                                                        )}
                                                      </ListboxOption>
                                                    )
                                                  )}
                                                </ListboxOptions>
                                              </div>
                                            </>
                                          )}
                                        </Listbox>
                                      </div>
                                      <div className="relative">
                                        <button
                                          type="button"
                                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                        >
                                          <span
                                            onClick={() => {
                                              dispatch({
                                                type: 'removeItem',
                                                payload: index,
                                              });
                                            }}
                                          >
                                            Obriši
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Ukupno</p>
                                <p>
                                  {value.products.reduce(
                                    (total: any, item: any) => {
                                      return (
                                        total +
                                        item.qty * parseFloat(item.product.cena)
                                      );
                                    },
                                    0
                                  )}{' '}
                                  RSD
                                </p>
                              </div>
                              <div className="mt-3">
                                <div>
                                  <h2 className="text-lg font-medium text-gray-900">
                                    Kontakt informacije
                                  </h2>

                                  <div className="mt-4">
                                    <label
                                      htmlFor="email-address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Email adresa
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="email"
                                        id="email-address"
                                        name="email-address"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <label
                                      htmlFor="phone"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Broj telefona
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="comment"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Komentar
                                    </label>
                                    <div className="mt-2">
                                      <textarea
                                        rows={4}
                                        name="comment"
                                        id="comment"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {show && (
                                <div className="rounded-md bg-yellow-50 p-4">
                                  <div className="flex">
                                    <div className="flex-shrink-0">
                                      <ExclamationTriangleIcon
                                        className="h-5 w-5 text-yellow-400"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <h3 className="text-sm font-medium text-yellow-800">
                                        Pažnja
                                      </h3>
                                      <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                          U koliko zelite da narucite proizvode
                                          morate ostaviti neki kontakt, kako bi
                                          Vas obavestili kad mozete da je
                                          preuzmete!
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="mt-6">
                                <button
                                  type="button"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                  onClick={() => {
                                    if (!value.products.length) return;
                                    const f = new FormData(
                                      document.getElementById('form') as any
                                    );
                                    // const phone = f.getAll('phone')[0];
                                    // const email = f.getAll('email')[0];
                                    if (
                                      !f.get('phone') &&
                                      !f.get('email-address')
                                    ) {
                                      setShow(true);
                                      return;
                                    }
                                    if (show) {
                                      setShow(false);
                                    }
                                    mutate({
                                      phone: f.get('phone') ?? null,
                                      email: f.get('email-address') ?? null,
                                      comment: f.get('comment') ?? null,
                                    });
                                  }}
                                >
                                  Naruči
                                </button>
                              </div>
                            </div>
                          </section>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export { ShopCard };
