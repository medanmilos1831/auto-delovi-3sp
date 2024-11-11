import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ICard {
  imageUrl: any;
  text: string;
  slug: string;
  isProduct?: boolean;
  caption?: any;
  isProgram?: boolean;
}

const Card = ({
  imageUrl,
  text,
  isProgram = false,
  slug,
  isProduct = false,
  caption,
}: ICard) => {
  const nav = useNavigate();
  const [images, setImages] = useState<any>(null);

  useEffect(() => {
    if (!isProgram) return;
    const checkAllImages = async () => {
      const imagePaths = await fetch(`../assets/${imageUrl[0].id}.jpg`);
      if (imagePaths.status === 200) {
        setImages(`../assets/${imageUrl[0].id}.jpg`);
      }
    };
    checkAllImages();
  }, []);
  return (
    <div
      key={slug}
      className="card group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
      onClick={() => {
        nav(slug);
      }}
      style={{
        backgroundColor: 'rgba(0,0,0,.1)',
      }}
    >
      <div
        className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-72"
        style={{
          overflow: 'hidden',
        }}
      >
        {(isProgram ? images : imageUrl) ? (
          <img
            src={isProgram ? images : imageUrl}
            className="card-image h-full w-full object-center sm:w-full"
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
      <div
        className="flex flex-1 flex-col space-y-2 p-4"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'rgba(0,0,0,.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3
          className="text-sm text-white font-bold tracking-tight"
          style={{
            fontSize: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
          }}
        >
          <span aria-hidden="true" className="absolute inset-0" />
          {text}
        </h3>
      </div>
    </div>
  );
};

export { Card };
