import { Card, PageTemplate, ProductCard } from '@/components';
import { useLocation, useParams } from 'react-router-dom';
import { data } from '../../data';

const CategoryPage = () => {
  const { program, category } = useParams<any>();
  const l = useLocation();
  const pr = data[program as any];
  const cat = pr.kategorije[category as any];
  let r = {
    products: Object.values(cat.prozivodi),
    ...(() => {
      const { prozivodi, ...rest } = cat;
      return { ...rest };
    })(),
  };
  return (
    <>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {r.products.map((i: any, index: any) => {
          console.log('item', i);
          return (
            <div
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <Card
                text={i.naziv}
                slug={`${l.pathname}/${i.slug}`}
                // imageUrl={'../assets/gume.jpg'}
                imageUrl={`${i.image ? i.image : null}`}
                caption={i.caption}
              />
            </div>
          );
        })}
      </div>
      {/* <PageTemplate
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
      /> */}
    </>
  );
};

export { CategoryPage };

// try {
//   let jsonArray = req.sharedData.program;
//   // const jsonData = fs.readFileSync(filePath, "utf8");
//   // let jsonArray = JSON.parse(jsonData);

//   const program = jsonArray[req.params.program];
//   if (!program) {
//     return res.send({
//       products: [],
//       category: null,
//     });
//   }
//   const cat = program.kategorije[req.params.category];
//   if (!cat) {
//     return res.send({
//       products: [],
//       category: null,
//     });
//   }
//   return res.send({
// products: Object.values(cat.prozivodi),
// ...(() => {
//   const { prozivodi, ...rest } = cat;
//   return { ...rest };
// })(),
//   });
// } catch (error) {
//   res.status(error.code).send(error.message);
// }
