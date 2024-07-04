import { Card, PageTemplate } from '@/components';

const ProgramiPage = () => {
  return (
    <PageTemplate
      url={`/programi`}
      queryKey="programi-page"
      select={(data: any) => {
        return {
          ...data,
          items: data.programs,
          naziv: data.headline,
        };
      }}
      render={(item: any) => {
        return (
          <Card
            text={item.naziv}
            slug={item.slug}
            imageUrl={item.image}
            caption={item.caption}
          />
        );
      }}
    />
  );
};
export { ProgramiPage };
