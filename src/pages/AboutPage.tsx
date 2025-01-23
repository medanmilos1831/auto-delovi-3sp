import { useQuery } from '@tanstack/react-query';
import { client } from '../prismic';

import { ClipLoader } from 'react-spinners';
import { ScrollProvider } from '../context';
import { AppFooter } from '../components';

const AboutPage = () => {
  const { data, isLoading, isFetching } = useQuery<any>({
    queryKey: ['aboutpage'],
    queryFn: async () => {
      return await client.getSingle('about_page');
    },
  });
  if (isLoading || isFetching) {
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
  }
  return (
    <div className="bg-gray-900 h-full w-full relative">
      <ScrollProvider>
        <ScrollProvider.Container>
          <main className="relative isolate">
            {/* Background */}
            <div
              className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                style={{
                  clipPath:
                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                }}
              />
            </div>

            {/* Header section */}
            <div className="px-6 pt-14 lg:px-8">
              <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  {data?.data.title[0].text}
                </h2>
              </div>
            </div>

            {/* Content section */}
            <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className=" text-base leading-7 text-gray-300">
                  <div>
                    <p>{data?.data.opis[0].text}</p>
                  </div>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
                  {data?.data.stats?.map((stat: any, statIdx: any) => (
                    <div
                      key={statIdx}
                      className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6"
                    >
                      <dt className="text-base leading-7 text-gray-300">
                        {stat.label[0].text}
                      </dt>
                      <dd className="text-3xl font-semibold tracking-tight text-white">
                        {stat.value[0].text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Image section */}
            <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
              <img
                src={data?.data.image.url}
                alt=""
                className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
              />
            </div>
          </main>
          <AppFooter />
        </ScrollProvider.Container>
      </ScrollProvider>
    </div>
  );
};
export { AboutPage };
