import { Card, CardSkeleton, PageHeader } from '@/components';
import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { data } from '../data';

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
  const { get } = useApiProvider();
  const {
    data: pocetnaData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['pocetna'],
    queryFn: async () => {
      return await get<any>(`/pocetna`);
    },
    placeholderData: new Array(30).fill(null),
  });
  console.log('data', pocetnaData);
  // const programs = [];
  // for (const key in data as any) {
  //   if (Object.hasOwnProperty.call(data, key)) {
  //     const program = data[key];
  //     const { naziv, slug, image, caption } = program;
  //     programs.push({ naziv, slug, image, caption });
  //   }
  // }
  return (
    <div className="h-full w-full">
      <PageHeader
        headline={pocetnaData?.headline}
        image={pocetnaData?.image}
        size="h-1/4"
      />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {isLoading || isFetching
          ? Object.keys(data).map((item: any, index: number) => {
              return <CardSkeleton key={index} />;
            })
          : pocetnaData?.programi?.map((i: any, index: any) => {
              return (
                <div
                  key={i.slug}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <Card
                    text={i.naziv}
                    slug={`programi/${i.slug}`}
                    imageUrl={i.image}
                    caption={i.caption}
                    doFetch
                  />
                </div>
              );
            })}
        {/* {data?.programi?.map((i: any, index: any) => {
          return (
            <div
              key={i.slug}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <Card
                text={i.naziv}
                slug={`programi/${i.slug}`}
                imageUrl={i.image}
                caption={i.caption}
                doFetch
              />
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
export { HomePage };
