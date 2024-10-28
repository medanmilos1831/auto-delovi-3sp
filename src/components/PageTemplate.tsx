import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { CardSkeleton, PageHeader } from '@/components';

interface IPageTemplate {
  queryKey: string;
  url: string;
  select: any;
  render: any;
  imgUrl?: any;
  lgGrid?: string;
}

const PageTemplate = ({
  queryKey,
  url,
  select,
  render,
  imgUrl,
  lgGrid = 'lg:grid-cols-5',
}: IPageTemplate) => {
  const { get } = useApiProvider();
  const { data, isLoading, isFetching, isPlaceholderData } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return await get<any>(url);
    },
    select(data: any) {
      return select(data);
    },
    placeholderData: new Array(30).fill(null),
  });
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={data?.naziv}
        image={imgUrl ? imgUrl : data?.image}
        size="h-1/4"
        desc={data?.desc}
      />
      <div className="px-7 pb-8">
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${lgGrid}`}>
          {isLoading || isFetching
            ? Object.keys(data).map((item: any, index: number) => {
                return <CardSkeleton key={index} />;
              })
            : data?.items?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    {render(item)}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export { PageTemplate };
