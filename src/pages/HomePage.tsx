import { Card, PageHeader, PageTemplate } from '@/components';
import { data } from '../data';
import img from '../assets/gume.jpg';

const HomePage = () => {
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
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={'Dobrodošli u 3sp'}
        image={`../assets/slike/auto-program.jpg`}
        size="h-1/4"
        // doFetch
      />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {programs.map((i: any, index: any) => {
          return (
            <div
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <Card
                text={i.naziv}
                slug={`programi/${i.slug}`}
                imageUrl={`../assets/slike/${i.slug}.jpg`}
                caption={i.caption}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export { HomePage };
