import { Card, PageTemplate } from '@/components';

const HomePage = () => {
  console.log('logg');
  return (
    <>
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
        lgGrid="lg:grid-cols-3"
        imgUrl={'../../assets/skoda.webp'}
        render={(item: any) => {
          return (
            <>
              <Card
                text={item.naziv}
                slug={`programi/${item.slug}`}
                imageUrl={item.image}
                caption={item.caption}
              />
            </>
          );
        }}
      ></PageTemplate>
    </>
  );
};
export { HomePage };
