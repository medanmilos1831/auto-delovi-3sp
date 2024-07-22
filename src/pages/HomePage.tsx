import { Card, PageTemplate } from '@/components';

const HomePage = () => {
  return (
    <PageTemplate
      queryKey={'pocetna'}
      url={'/pocetna'}
      select={(data: any) => {
        return {
          ...data,
          naziv: data.headline,
          items: data.programi,
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
