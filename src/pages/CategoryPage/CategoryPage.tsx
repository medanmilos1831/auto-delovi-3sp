import { PageTemplate, ProductCard } from '@/components';
import { useParams } from 'react-router-dom';

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
      hasSearch
      onSearch={(value: any, state: any, setState: any) => {
        let cloneState = state;
        let v = state.items;
        if (value) {
          v = state.products.filter((item: any) =>
            item.kataloski_broj.startsWith(value)
          );
          setState((prev: any) => {
            return {
              ...prev,
              items: v,
            };
          });
        } else {
          setState((prev: any) => {
            return {
              ...prev,
              items: cloneState.products,
            };
          });
        }
      }}
      render={(item: any) => {
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
