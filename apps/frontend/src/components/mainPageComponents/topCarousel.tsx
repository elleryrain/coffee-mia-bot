import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';
import { mainBanners } from '../../mocks/mockItems';

export const TopCarousel: FC = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="mt-2">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container w-[calc(100vw-16px)] px-4 gap-2">
          {mainBanners.map((banner) => (
            <div
              className={`embla__slide topSlide last:pr-4 flex items-end relative overflow-hidden`}
              key={banner.id}
            >
              <div className="absolute top-0 left-0 w-full h-full z-[5] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,.5)]"></div>
              <img
                src={banner.image}
                alt="coffee"
                className="object-cover absolute top-0 left-0 w-full h-full z-0 select-none pointer-events-none"
              />
              <h2 className="mb-7 ml-8 text-white z-10 font-semibold text-[24px] leading-[26.4px]">
                {banner.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
