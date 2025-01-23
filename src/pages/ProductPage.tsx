import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { client } from '../prismic';
import { ImageParallax, ScrollProvider, useDispatch } from '../context';
import { AppFooter } from '../components';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { product } = useParams<any>();
  const { data, isLoading, isFetching } = useQuery<any>({
    queryKey: ['product', product],
    queryFn: async () => {
      return await client.getByUID('product', product!);
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ClipLoader
          color={'black'}
          loading={isLoading || isFetching}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  return (
    <div className="h-full w-full relative">
      <ScrollProvider>
        <ScrollProvider.Container>
          <div className="h-2/3 w-full relative mb-3">
            <ImageParallax
              imageStyle={{
                objectFit: 'cover',
                height: '100%',
                width: '100%',
              }}
              speed={50}
              imageUrl={data?.data?.image?.url}
            >
              <div
                className="absolute top-0 left-0 h-full w-full bg-black opacity-75"
                style={{
                  zIndex: 1,
                }}
              ></div>
              <div
                style={{
                  zIndex: 2,
                }}
                className="flex items-center h-full px-7 lg:px-8 relative text-white"
              >
                <div className="h-full w-full flex items-center">
                  <div className="flex flex-col space-y-4">
                    <h1 className="font-bold text-4xl sm:text-6xl md:text-8xl leading-tight font-sans">
                      {data?.data.title[0].text}
                    </h1>
                  </div>
                </div>
              </div>
            </ImageParallax>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-7 lg:px-8">
            <ImageParallax
              imageStyle={{
                objectFit: 'cover',
                height: '30rem',
                width: '30rem',
              }}
              speed={0}
              imageUrl={data?.data?.image?.url}
            ></ImageParallax>
            <div className="p-4">
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
                <h2 className="text-sm font-medium text-gray-900">Pakovanje</h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{data?.data.pak[0].text ?? '-'}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Jedinica mere
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{data?.data.jm[0].text ?? '-'}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Kataloski broj
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{data?.data.kataloski_broj[0].text ?? '-'}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Napomena</h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{data?.data.napomena[0].text ?? '-'}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Proizvodjač
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{data?.data.proizvodjac[0].text ?? '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <AppFooter />
        </ScrollProvider.Container>
      </ScrollProvider>
    </div>
  );
};

export { ProductPage };
