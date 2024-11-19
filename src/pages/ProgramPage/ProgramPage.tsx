import { useLocation, useParams } from 'react-router-dom';
import { Card, CardSkeleton, PageHeader } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useApiProvider } from '@/context';

const ProgramPage = () => {
  const { program } = useParams<{ program: string }>();
  const { get } = useApiProvider();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program_categories'],
    queryFn: async () => {
      return await get<any>(`/program/${program}`);
    },
    placeholderData: new Array(30).fill(null),
  });
  const l = useLocation();
  return (
    <div className="h-full w-full">
      <PageHeader headline={data?.naziv} image={data?.image} size="h-1/4" />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {isLoading || isFetching
          ? Object.keys(data).map((item: any, index: number) => {
              return <CardSkeleton key={index} />;
            })
          : data?.category?.map((i: any, index: any) => {
              return (
                <div
                  key={index}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <Card
                    text={i.naziv}
                    slug={`${l.pathname}/${i.slug}`}
                    imageUrl={`../assets/${i.firstId}.jpg`}
                    doFetch
                    caption={i.caption}
                  />
                </div>
              );
            })}
      </div>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {data?.category?.map((i: any, index: any) => {
          return (
            <div
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <Card
                text={i.naziv}
                slug={`${l.pathname}/${i.slug}`}
                imageUrl={`../assets/${i.firstId}.jpg`}
                doFetch
                caption={i.caption}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export { ProgramPage };
