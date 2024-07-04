import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { CardSkeleton, PageHeader } from '@/components';

interface IPageTemplate {
  queryKey: string;
  url: string;
  select: any;
  render: any;
}

const PageTemplate = ({ queryKey, url, select, render }: IPageTemplate) => {
  const { get } = useApiProvider();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return await get<any>(url);
    },
    select(data: any) {
      return select(data);
    },
  });
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={data?.naziv}
        image={data?.image}
        size="h-2/3"
        desc={data?.desc}
      />
      <div className="px-7 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {data?.items?.map((item: any, index: number) => {
            return (
              <div key={index}>
                {isFetching || isLoading ? (
                  <CardSkeleton key={index} />
                ) : (
                  render(item)
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { PageTemplate };
