import { CardSkeleton, PageHeader, ProductCard } from '@/components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useApiProvider } from '@/context';

const CategoryPage = () => {
  const { program, category } = useParams<any>();
  const { get } = useApiProvider();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      return await get<any>(`/category/${program}/${category}`);
    },
    placeholderData: new Array(30).fill(null),
  });
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={data?.naziv}
        image={
          data?.products
            ? `../assets/${data?.products[0].id}.jpg`
            : `../assets/demo.jpg`
        }
        size="h-1/4"
        doFetch
      />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {isLoading || isFetching
          ? Object.keys(data).map((item: any, index: number) => {
              return <CardSkeleton key={index} />;
            })
          : data?.products?.map((i: any, index: any) => {
              return (
                <div
                  key={index}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <ProductCard
                    caption={i.caption}
                    naziv={i.naziv}
                    cena={i.cena}
                    imageUrl={i.id}
                    slug={i.slug}
                    kataloskiBroj={i.kataloski_broj}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export { CategoryPage };
