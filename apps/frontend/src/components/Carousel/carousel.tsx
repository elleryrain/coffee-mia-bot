import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShortItem } from '../../api/generated/users/model';
import {
  useAddFavoriteItem,
  useGetFavoriteItems,
  useRemoveFavoriteItem,
} from '../../api/generated/users/default';

export const Carousel: FC<{
  items: ShortItem[];
}> = ({ items }) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const { refetch: getFavourites } = useGetFavoriteItems();
  const addToFavourite = useAddFavoriteItem();
  const deleteFromFavourite = useRemoveFavoriteItem();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container w-[calc(100vw-16px)] px-4 gap-2">
        {items.map((item) => (
          <div className="relative max-w-[150px]">
            <button
              className="absolute top-2 right-2 z-20"
              onClick={async (e) => {
                e.stopPropagation();
                if (item.favorite) {
                  await deleteFromFavourite.mutateAsync({
                    data: { itemId: item.id },
                  });
                  getFavourites();
                } else {
                  addToFavourite.mutateAsync({ data: { itemId: item.id } });
                  getFavourites();
                }
              }}
            >
              <img
                // className="absolute top-2 right-2"
                src={`${item.favorite ? 'heart_active.svg' : 'heart.svg'}`}
                alt="like"
              />
            </button>
            <Link
              to={`/products/${item.id}`}
              className={`smallSlide border-gray20 flex flex-col gap-3`}
              key={item.id}
            >
              <div className="smallSlideImg relative flex flex-col items-center justify-center overflow-hidden">
                <img
                  className=""
                  src={
                    item.image && item.image.length > 1
                      ? item.image
                      : 'empty_img.svg'
                  }
                  alt="coffee"
                />
              </div>
              <p className="mt-3 text-[14px] font-normal">{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
