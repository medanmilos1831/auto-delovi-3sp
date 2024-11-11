import { PageHeader } from '@/components';
import { useApiProvider } from '@/context';
import { useDispatch } from '@/observer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { data as myData } from '../data';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const { product, program, category } = useParams<any>();
  // const { get } = useApiProvider();
  // const { data } = useQuery({
  //   queryKey: ['product'],
  //   queryFn: async () => {
  //     return await get<any>(`/product/${program}/${category}/${product}`);
  //   },
  // });
  const dispatch = useDispatch();
  const data =
    myData[program as any].kategorije[category as any].prozivodi[
      product as any
    ];
  const [hasImage, setHasImage] = useState<any>(false);
  useEffect(() => {
    const checkAllImages = async () => {
      const imagePaths = await fetch(`../assets/${data.id}.jpg`);
      if (imagePaths.status === 200) {
        setHasImage(true);
      }
    };
    checkAllImages();
  }, []);
  return (
    <div className="h-full w-full">
      <PageHeader
        size="h-1/2"
        headline={data?.naziv}
        image={`../assets/${data.id}.jpg`}
        doFetch
      />
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {data?.naziv}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    RSD {data?.cena}
                  </p>
                </div>
              </div>

              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    src={
                      hasImage
                        ? `../assets/${data.id}.jpg`
                        : '../../assets/slike/image-placeholder.jpg'
                    }
                    className="rounded-lg lg:col-span-2 lg:row-span-2"
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <form>
                  <button
                    type="button"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      dispatch({
                        type: 'addProduct',
                        payload: data,
                      });
                    }}
                  >
                    Dodaj
                  </button>
                </form>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Opis</h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.opis}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Pakovanje
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.PAK ?? '-'}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Jedinica mere
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.jm ?? '-'}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Kataloski broj
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.kataloski_broj ?? '-'}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Napomena
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.napomena ?? '-'}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Proizvodjač
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>{data?.proizvodjac ?? '-'}</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <div className="prose prose-sm mt-4 text-gray-500">
                    <ul role="list">
                      {data?.items?.map((i: any, index: number) => {
                        return (
                          <li key={index}>
                            {i.label}: {i.value}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductPage };
