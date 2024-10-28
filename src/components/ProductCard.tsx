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
            {imageUrl ? (
              <img
                className="card-image h-full w-full"
                src={imageUrl}
                alt={slug}
              />
            ) : (
              <div
                className="flex items-center justify-center h-full mb-4 bg-gray-300 rounded dark:bg-gray-700"
                style={{
                  backgroundColor: 'black',
                }}
              >
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className="text-white">Kat. broj</span>
              <span className="font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                {/* {cena} RSD */}
                {kataloskiBroj}
              </span>
            </div>
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
