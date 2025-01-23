import * as prismic from '@prismicio/client';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { client } from '../../prismic';
import imagePlaceholder from '../../assets/image-placeholder.jpg';
import { AppFooter } from '../../components';
import { ScrollProvider, ImageParallax } from '../../context';

const CategoryPage = () => {
  const { category: categoryParam } = useParams<any>();
  const nav = useNavigate();
  const category = useQuery<any>({
    queryKey: ['cat', categoryParam],
    queryFn: async () => {
      return await client.getByUID('category', categoryParam as string);
    },
  });
  const { data, isLoading, isFetching } = useQuery<any>({
    queryKey: ['products', categoryParam],
    queryFn: async () => {
      return await client.getAllByType('product', {
        filters: [
          prismic.filter.at('my.product.category', category.data?.id as string),
        ],
        graphQuery: `
    {
      product {
        title
        image
        price
        kataloski_broj
        program {
          ...on program {
            title
          }
        }
      }
    }
  `,
      });
    },
    enabled: !!category.data?.id,
  });
  if (category.isLoading || category.isFetching) {
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
  if (isLoading || isFetching)
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
  return (
    <ScrollProvider>
      <ScrollProvider.Container>
        <div className="h-full w-full relative">
          <div className="h-2/3 w-full relative mb-3">
            <ImageParallax
              imageStyle={{
                objectFit: 'cover',
                height: '100%',
                width: '100%',
              }}
              speed={50}
              imageUrl={category?.data?.data?.preview_image?.url}
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
                      {category.data?.data.title[0].text}
                    </h1>
                  </div>
                </div>
              </div>
            </ImageParallax>
          </div>
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5 px-7 lg:px-8`}
          >
            {data?.map((i: any) => {
              return (
                <div
                  className="flex flex-col card"
                  onClick={() => {
                    nav(i.uid);
                  }}
                >
                  <div
                    key={i.uid}
                    className="relative"
                    style={{
                      backgroundColor: 'rgba(0,0,0,.1)',
                      paddingTop: '50%',
                    }}
                  >
                    <div className="absolute top-0 left-0 h-full w-full">
                      <ImageParallax
                        speed={20}
                        imageUrl={
                          i.data.image?.url
                            ? i.data.image?.url
                            : imagePlaceholder
                        }
                        className="h-full object-cover"
                      />
                      <div
                        className="p-4 absolute top-0 left-0 h-full w-full flex items-center justify-center"
                        style={{
                          background: 'rgba(0,0,0,.35)',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {i.data.title[0].text} (
                        {i.data.program.data.title[0].text})
                      </a>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                      <p className="text-sm italic text-gray-500">
                        Kataloški broj: {i.data.kataloski_broj[0].text}
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {i.data.price} RSD
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <AppFooter />
        </div>
      </ScrollProvider.Container>
    </ScrollProvider>
  );
};
export { CategoryPage };
