import { useParams } from 'react-router-dom';
import { Card, PageTemplate } from '@/components';

const ProgramPage = () => {
  const { program } = useParams<{ program: string }>();
  return (
    <PageTemplate
      url={`/program/${program}`}
      queryKey="program_categories"
      select={(data: any) => {
        return {
          ...data,
          items: data.category,
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

export { ProgramPage };
