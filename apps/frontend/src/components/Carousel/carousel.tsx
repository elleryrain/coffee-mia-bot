import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Carousel: FC<{
  items: { id: number; image: string; title: string; favorite: boolean }[];
}> = ({ items }) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container w-[340px] gap-2">
        {items.map((item) => (
          <Link
            to=""
            className={`smallSlide border-gray20 flex flex-col gap-3`}
            key={item.id}
          >
            <div className="smallSlideImg relative flex flex-col items-center justify-center overflow-hidden">
              <button>
                <img
                  className="absolute top-2 right-2"
                  src={`${item.favorite ? 'heart_active.svg' : 'heart.svg'}`}
                  alt="like"
                />
              </button>
              <img
                className=""
                src={item.image.length === 0 ? 'empty_img.svg' : item.image}
                alt="coffee"
              />
            </div>
            <p className="mt-3 text-[14px] font-normal">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
