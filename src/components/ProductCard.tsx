import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  slug,
  imageUrl = '../../assets/image-placeholder.jpg',
  naziv,
  cena,
  caption,
}: {
  slug: string;
  imageUrl?: string;
  naziv: string;
  cena: string;
  caption?: string;
}) => {
  const nav = useNavigate();
  return (
    <>
      <div
        className="w-full card bg-white dark:bg-gray-800"
        onClick={() => {
          nav(slug);
        }}
      >
        <div
          className="relative"
          style={{
            paddingTop: '50%',
            overflow: 'hidden',
          }}
        >
          <div className="absolute top-0 left-0 h-full w-full">
            <img
              className="card-image h-full w-full"
              src={imageUrl}
              alt={slug}
            />
          </div>
          <div
            className="overlay"
            style={{
              zIndex: 2,
            }}
          ></div>
        </div>
        <div className="p-5">
          <div className="flex justify-between mb-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              {naziv}
            </h5>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              {cena} RSD
            </span>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {caption}
          </p>
          <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 bg-blue-700">
            Detaljnije
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
};

export { ProductCard };
