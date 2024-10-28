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
  size?: 'h-1/2' | 'h-full' | 'h-2/3' | 'h-1/4';
  image?: string;
}) => {
  return (
    <div className={`h-2/5 mb-5`}>
      <div className="relative isolate overflow-hidden bg-gray-900 h-full w-full">
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
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
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          ></div>
          <div className="max-w-7xl px-7 lg:px-8">
            <div className="mx-auto max-w-4xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">
                {headline}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageHeader };
