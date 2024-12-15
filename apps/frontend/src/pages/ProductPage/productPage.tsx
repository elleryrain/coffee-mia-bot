import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../../mocks/mockProducts';
import { useCartStore } from '../../store/cartStore';
import useEmblaCarousel from 'embla-carousel-react';
import { mainBanners } from '../../mocks/mockItems';

export const ProductPage: FC = () => {
  const params = useParams<{ id: string }>();
  const data = products[Number(params.id)];
  const [emblaRef] = useEmblaCarousel();

  const cartStore = useCartStore();

  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="ml-2 flex items-center gap-1 mb-7 pt-6"
      >
        <img src="/arrow-left-black.svg" alt="back" />
        <p className="text-[17px] leading-[20.29px] font-normal">Назад</p>
      </button>
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
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-8">
        <div className="flex items-center justify-between pt-1">
          <h1 className="text-[20px] leading-[22px] font-semibold">
            {data.name}
          </h1>
          <button
            className={`w-8 h-8 rounded-lg ${
              data.isFavourite ? 'bg-red10' : 'bg-gray20'
            } flex justify-center items-center`}
          >
            <img
              src={`${
                data.isFavourite ? '/heart_active.svg' : '/heart-nobg.svg'
              }`}
              alt="like"
            />
          </button>
        </div>
      </div>
      Product {params.id} Page
      <button
        onClick={() => {
          cartStore.addProduct({ ...data, count: 1 });
        }}
      >
        add to cart
      </button>
    </div>
  );
};
