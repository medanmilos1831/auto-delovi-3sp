import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  slug,
  imageUrl = '../../assets/image-placeholder.jpg',
  naziv,
  cena,
  caption,
  kataloskiBroj,
}: {
  slug: string;
  imageUrl?: string;
  naziv: string;
  cena: string;
  caption?: string;
  kataloskiBroj: string;
}) => {
  const nav = useNavigate();
  return (
    <>
      <div
        key={slug}
        className="card group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        onClick={() => {
          nav(slug);
        }}
      >
        <div
          className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
          style={{
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              className="card-image h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {naziv}
            </a>
          </h3>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-sm italic text-gray-500">
              Kataloški broj: {kataloskiBroj}
            </p>
            <p className="text-base font-medium text-gray-900">{cena} RSD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductCard };
