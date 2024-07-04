import { Card, PageTemplate } from '@/components';
import { useApiProvider } from '@/context';

const HomePage = () => {
  const { get } = useApiProvider();

  return (
    <PageTemplate
      queryKey={'pocetna'}
      url={'/pocetna'}
      select={(data: any) => {
        return {
          ...data,
          naziv: data.headline,
          items: data.programs,
        };
      }}
      render={(item: any) => {
        return (
          <Card
            text={item.naziv}
            slug={`programi/${item.slug}`}
            imageUrl={item.image}
            caption={item.caption}
          />
        );
      }}
    ></PageTemplate>
  );
};
export { HomePage };
