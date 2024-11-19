import { Card, CardSkeleton, PageHeader } from '@/components';
import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
  const { get } = useApiProvider();
  const {
    data: pocetnaData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['pocetna'],
    queryFn: async () => {
      return await get<any>(`/pocetna`);
    },
    placeholderData: new Array(30).fill(null),
  });
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={pocetnaData?.headline}
        image={pocetnaData?.image}
        size="h-1/4"
      />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {isLoading || isFetching
          ? Object.keys(pocetnaData).map((item: any, index: number) => {
              return <CardSkeleton key={index} />;
            })
          : pocetnaData?.programi?.map((i: any) => {
              return (
                <div
                  key={i.slug}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <Card
                    text={i.naziv}
                    slug={`programi/${i.slug}`}
                    imageUrl={i.image}
                    caption={i.caption}
                    doFetch
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};
export { HomePage };
