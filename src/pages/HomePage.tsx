import { Card, PageTemplate } from '@/components';
import { data } from '../data';
import img from '../assets/gume.jpg';

const HomePage = () => {
  console.log('logg');
  // pocetnaRouter.get("/pocetna", async (req, res) => {
  //   try {
  //     const aboutData = req.sharedData.pocetna;
  //     const programi = req.sharedData.program;
  //     const programs = [];

  //     // Iterate through all keys in the JSON object
  //     for (const key in programi) {
  //       if (Object.hasOwnProperty.call(programi, key)) {
  //         const program = programi[key];
  //         const { naziv, slug, image, caption } = program;
  //         programs.push({ naziv, slug, image, caption });
  //       }
  //     }

  //     res.send({
  //       ...aboutData,
  //       programi: programs,
  //     });
  //   } catch (error) {
  //     console.log("GET POCETNA", error);
  //     res.status(error.code).send(error.message);
  //   }
  // });
  const programs = [];
  for (const key in data as any) {
    if (Object.hasOwnProperty.call(data, key)) {
      const program = data[key];
      const { naziv, slug, image, caption } = program;
      programs.push({ naziv, slug, image, caption });
    }
  }
  console.log('eeeee', programs);
  return (
    <>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {programs.map((i: any, index: any) => {
          return (
            <div
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              {/* {render(item)} */}
              <Card
                text={i.naziv}
                slug={`programi/${i.slug}`}
                imageUrl={img}
                caption={i.caption}
              />
            </div>
          );
        })}
      </div>
      {/* <PageTemplate
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
      ></PageTemplate> */}
    </>
  );
};
export { HomePage };
