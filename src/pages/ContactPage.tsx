import { Card, PageHeader } from '@/components';
import { API_ROUTES, SPA_ROUTES } from '@/constants';
import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { NavLink, Outlet } from 'react-router-dom';

const ContactPage = () => {
  const { get } = useApiProvider();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['programi'],
    queryFn: async () => {
      return await get<any>('/kontakt');
    },
  });
  return (
    <div className="h-full w-full">
      <PageHeader headline="Kontakt" size="h-2/3" />
      <div className="p-7">
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
};
export { ContactPage };
