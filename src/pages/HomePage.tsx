import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import imagePlaceholder from '../assets/image-placeholder.jpg';
import { client } from '../prismic';
import { ImageParallax, ScrollProvider } from '../context';
import { AppFooter } from '../components';
const HomePage = () => {
  const nav = useNavigate();
  const { data, isLoading } = useQuery<any>({
    queryKey: ['pocetna'],
    queryFn: async () => {
      return await client.getSingle('home_page');
    },
  });
  const category = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await client.getAllByType('category');
    },
  });
  if (isLoading || category.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ClipLoader
          color={'black'}
          loading={isLoading || category.isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div className="h-full w-full relative">
      <ScrollProvider>
        <ScrollProvider.Container>
          <>
            fff
            <div className="h-2/3 w-full relative mb-3">
              <ImageParallax
                imageStyle={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                }}
                speed={50}
                imageUrl={data?.data.header_image?.url}
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
                        {data?.data.header_text[0].text}
                      </h1>
                    </div>
                  </div>
                </div>
              </ImageParallax>
            </div>
            <div
              className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5 px-7 lg:px-8`}
            >
              {category?.data?.map((i: any) => {
                return (
                  <div key={i.uid} className="col-span-1">
                    <div
                      key={i.uid}
                      className="relative card"
                      onClick={() => {
                        nav(i.uid);
                      }}
                      style={{
                        backgroundColor: 'rgba(0,0,0,.1)',
                        paddingTop: '50%',
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full w-full">
                        <ImageParallax
                          speed={20}
                          imageUrl={
                            i.data.preview_image?.url
                              ? i.data.preview_image?.url
                              : imagePlaceholder
                          }
                          className="h-full object-cover"
                        />
                        <div
                          className="p-4 absolute top-0 left-0 h-full w-full flex items-center justify-center"
                          style={{
                            background: 'rgba(0,0,0,.65)',
                          }}
                        >
                          <h3
                            className="text-sm text-white font-bold uppercase"
                            style={{
                              fontSize: '1.5rem',
                              letterSpacing: '3px',
                            }}
                          >
                            {i.data.title[0].text}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <AppFooter />
          </>
        </ScrollProvider.Container>
      </ScrollProvider>
    </div>
  );
};
export { HomePage };
