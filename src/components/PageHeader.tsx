const PageHeader = ({
  headline,
  size = 'h-full',
  image = '../../assets/image-placeholder.jpg',
  caption,
  desc,
}: {
  headline?: string;
  caption?: string;
  desc?: string;
  size?: 'h-1/2' | 'h-full' | 'h-2/3';
  image?: string;
}) => {
  return (
    <div className={`${size} mb-5`}>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 h-full w-full">
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            background: 'black',
            opacity: 0.7,
            zIndex: -1,
          }}
        ></div>
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">
              {headline}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">{desc}</p>
          </div>
          {/* <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {data?.items?.map((i: any) => {
                  return (
                    <div className="flex flex-col-reverse">
                      <dt className="text-xl  leading-7 text-gray-300">
                        {i.value}
                      </dt>
                      <dd className="text-4xl font-bold leading-9 tracking-tight text-white">
                        {i.label}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div> */}
        </div>
      </div>
    </div>
    // <div
    //   className={`flex justify-center items-center relative bg-white w-full ${size} mb-8`}
    // >
    //   <img
    //     src={url}
    //     className="h-full w-full"
    //     style={{
    //       objectFit: 'cover',
    //     }}
    //   />
    //   <div
    //     className="absolute t-0 l-0 h-full w-full"
    //     style={{
    //       background: 'black',
    //       opacity: 0.45,
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //   ></div>
    //   {headline ? (
    //     <div className="absolute inset-0 flex items-center justify-center">
    //       <h1 className="font-family-bold text-8xl text-white uppercase">
    //         {headline}
    //       </h1>
    //     </div>
    //   ) : null}
    // </div>
  );
};

export { PageHeader };
