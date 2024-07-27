import { useNavigate } from 'react-router-dom';

interface ICard {
  imageUrl: string;
  text: string;
  slug: string;
  isProduct?: boolean;
  caption?: any;
}

const Card = ({ imageUrl, text, slug, isProduct = false, caption }: ICard) => {
  const nav = useNavigate();
  return (
    <div
      className="w-full card bg-white dark:bg-gray-800 h-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
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
          <img className="card-image h-full w-full" src={imageUrl} alt={slug} />
        </div>
        <div
          className="overlay"
          style={{
            zIndex: 2,
          }}
        ></div>
      </div>
      <div
        className="p-5"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
            {text}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {caption}
          </p>
        </div>
        <div>
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
    </div>
  );
};

export { Card };
