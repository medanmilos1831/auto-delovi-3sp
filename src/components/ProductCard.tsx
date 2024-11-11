import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  slug,
  imageUrl = '../../assets/slike/image-placeholder.jpg',
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
  const [hasImage, setHasImage] = useState<any>(false);

  useEffect(() => {
    const checkAllImages = async () => {
      const imagePaths = await fetch(`../assets/${imageUrl}.jpg`);
      if (imagePaths.status === 200) {
        setHasImage(true);
      }
    };
    checkAllImages();
  }, []);
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
          className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-72"
          style={{
            overflow: 'hidden',
          }}
        >
          <img
            src={
              hasImage
                ? `../assets/${imageUrl}.jpg`
                : '../../assets/slike/image-placeholder.jpg'
            }
            className="card-image h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
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
