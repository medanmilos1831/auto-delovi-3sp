import { useLocation, useParams } from 'react-router-dom';
import { Card, PageHeader, PageTemplate } from '@/components';
import { data } from '../../data';

const ProgramPage = () => {
  const { program } = useParams<{ program: string }>();
  const l = useLocation();

  const categories = [];

  for (const programKey in data) {
    if (Object.hasOwnProperty.call(data, programKey)) {
      const program = data[programKey];

      for (const categoryKey in program.kategorije) {
        if (Object.hasOwnProperty.call(program.kategorije, categoryKey)) {
          const category = program.kategorije[categoryKey];

          const { slug, naziv, desc, caption, image, imageName } = category;

          categories.push({ slug, naziv, desc, caption, image, imageName });
        }
      }
    }
  }
  let r: any = {
    naziv: data[program as any]?.naziv ?? null,
    caption: data[program as any]?.caption ?? null,
    desc: data[program as any]?.desc ?? null,
    image: data[program as any]?.image ?? null,
    imageName: data[program as any]?.imageName ?? null,
    category: (() => {
      if (!data[program as any].kategorije) {
        return [];
      }
      const v = Object.values(data[program as any].kategorije);
      const kategorijeBezProizvoda = Object.values(
        data[program as any].kategorije
      ).map((kategorija: any) => {
        const { prozivodi, ...rest } = kategorija;

        return rest;
      });

      return kategorijeBezProizvoda;
    })(),
  };
  return (
    <div className="h-full w-full">
      <PageHeader headline={r?.naziv} image={data?.image} size="h-1/4" />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {r.category.map((i: any, index: any) => {
          // console.log('iiiii', i);
          return (
            <div
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <Card
                text={i.naziv}
                slug={`${l.pathname}/${i.slug}`}
                imageUrl={Object.values(
                  data[program as any].kategorije[i.slug].prozivodi
                )}
                caption={i.caption}
                isProgram
              />
            </div>
          );
        })}
      </div>
    </div>
    // <PageTemplate
    //   url={`/program/${program}`}
    //   queryKey="program_categories"
    //   select={(data: any) => {
    //     return {
    //       ...data,
    //       items: data.category,
    //     };
    //   }}
    //   render={(item: any) => {
    //     return (
    //       <Card
    //         text={item.naziv}
    //         slug={item.slug}
    //         imageUrl={item.image}
    //         caption={item.caption}
    //       />
    //     );
    //   }}
    // />
  );
};

// try {
//   // let jsonArray = JSON.parse(fs.readFileSync(filePath, "utf8"));
//   let jsonArray = req.sharedData.program;
//   if (!jsonArray[req.params.program]) {
//     return res.send([]);
//   }

//   const categories = [];

//   for (const programKey in jsonArray) {
//     if (Object.hasOwnProperty.call(jsonArray, programKey)) {
//       const program = jsonArray[programKey];

//       for (const categoryKey in program.kategorije) {
//         if (Object.hasOwnProperty.call(program.kategorije, categoryKey)) {
//           const category = program.kategorije[categoryKey];

//           const { slug, naziv, desc, caption, image, imageName } = category;

//           categories.push({ slug, naziv, desc, caption, image, imageName });
//         }
//       }
//     }
//   }
// res.send({
//   naziv: jsonArray[req.params.program]?.naziv ?? null,
//   caption: jsonArray[req.params.program]?.caption ?? null,
//   desc: jsonArray[req.params.program]?.desc ?? null,
//   image: jsonArray[req.params.program]?.image ?? null,
//   imageName: jsonArray[req.params.program]?.imageName ?? null,
//   category: (() => {
//     if (!jsonArray[req.params.program].kategorije) {
//       return [];
//     }
//     const v = Object.values(jsonArray[req.params.program].kategorije);
//     const kategorijeBezProizvoda = Object.values(
//       jsonArray[req.params.program].kategorije
//     ).map((kategorija) => {
//       const { prozivodi, ...rest } = kategorija;

//       return rest;
//     });

//     return kategorijeBezProizvoda;
//   })(),
// });
// } catch (error) {
//   res.status(error.code || 500).send(error.message);
// }

export { ProgramPage };
