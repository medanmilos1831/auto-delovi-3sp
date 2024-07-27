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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
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
