import { useParams } from 'react-router-dom';
import { PageTemplate, ProductCard } from '@/components';

const CategoryPage = () => {
  const { program, category } = useParams<{
    program: string;
    category: string;
  }>();
  return (
    <PageTemplate
      url={`category/${program}/${category}`}
      queryKey="category_products"
      select={(data: any) => {
        return {
          ...data,
          items: data.products,
        };
      }}
      render={(item: any) => {
        console.log('utem', item);
        return (
          <ProductCard
            caption={item.caption}
            naziv={item.naziv}
            cena={item.cena}
            imageUrl={item.image}
            slug={item.slug}
            kataloskiBroj={item.kataloski_broj}
          />
        );
      }}
    />
  );
};

export { CategoryPage };
