import { CardSkeleton, PageHeader } from '@/components';
import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface IPageTemplate {
  queryKey: string;
  url: string;
  select: any;
  render: any;
  imgUrl?: any;
  lgGrid?: string;
  hasSearch?: boolean;
  onSearch?: any;
}

const PageTemplate = ({
  queryKey,
  url,
  select,
  render,
  imgUrl,
  lgGrid = 'lg:grid-cols-5',
  hasSearch = false,
  onSearch,
}: IPageTemplate) => {
  const { get } = useApiProvider();
  const [state, setState] = useState<any>([]);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      let r = await get<any>(url);
      setState(select(r));
      return r;
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
        {hasSearch && (
          <div className="sm:col-span-4 mb-3">
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Unesi kataloški broj
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Unesi kataloški broj..."
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  onChange={(e) => {
                    onSearch(e.target.value, state, setState);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${lgGrid}`}>
          {isLoading || isFetching
            ? Object.keys(data).map((item: any, index: number) => {
                return <CardSkeleton key={index} />;
              })
            : (hasSearch ? state?.items : data.items).map(
                (item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                    >
                      {render(item)}
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
};

export { PageTemplate };
