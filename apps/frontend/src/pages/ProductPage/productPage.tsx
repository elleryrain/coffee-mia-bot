import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Modal,
  ModalContent,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@nextui-org/react';
import { radioClassNames } from '../../next-ui-styles';
import {
  useRemoveFavoriteItem,
  useGetItemById,
  useAddFavoriteItem,
  useGetGrindingTypes,
} from '../../api/generated/users/default';

const configurations = [
  {
    id: 0,
    cost: 500,
    weight: 250,
  },
  {
    id: 1,
    cost: 981,
    weight: 500,
  },
  {
    id: 2,
    cost: 1900,
    weight: 1000,
  },
  {
    id: 3,
    cost: 16000,
    weight: 10000,
  },
];

// const grindings = [
//   { id: 1, name: 'Без помола' },
//   { id: 2, name: 'Для турки' },
//   { id: 3, name: 'Для эспрессо' },
//   { id: 4, name: 'Для гейзера' },
//   { id: 5, name: 'Для воронки' },
//   { id: 6, name: 'Для фильтра' },
//   { id: 7, name: 'Для френч-пресс' },
// ];

export const ProductPage: FC = () => {
  const params = useParams<{ id: string }>();
  const [emblaRef] = useEmblaCarousel();

  const cartStore = useCartStore();

  const [grinding, setGrinding] = useState('');
  const [id, setId] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: product } = useGetItemById({ idItem: params.id ?? '' });
  const addToFavourite = useAddFavoriteItem();
  const deleteFromFavourite = useRemoveFavoriteItem();
  const { data: grindings } = useGetGrindingTypes();

  const findProduct = (id: string) => {
    return cartStore.products.find((e) => e.id.startsWith(id));
  };

  const productsCount = (id: string) => {
    const producst = cartStore.products.filter((e) => e.id.startsWith(id));
    return producst.reduce((acc, current) => acc + current.count, 0);
  };

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
          {product &&
            product.images?.map((banner, ix) => {
              if (banner.length > 0)
                return (
                  <div
                    className={`embla__slide topSlide last:pr-4 flex items-end relative overflow-hidden`}
                    key={ix}
                  >
                    <div className="absolute top-0 left-0 w-full h-full z-[5] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,.5)]"></div>
                    <img
                      src={banner}
                      alt="coffee"
                      className="object-cover absolute top-0 left-0 w-full h-full z-0 select-none pointer-events-none"
                    />
                  </div>
                );
            })}
        </div>
      </div>
      {product && (
        <>
          <div className="container mt-8">
            <div className="flex items-center justify-between py-1">
              <h1 className="text-[20px] leading-[22px] font-semibold">
                {product.title}
              </h1>
              <button
                onClick={() => {
                  addToFavourite.mutate({
                    data: { itemId: Number(params.id ?? '0') },
                  });
                }}
                className={`w-8 h-8 rounded-lg  flex justify-center items-center`}
              >
                {/* ${
              product.isFavourite ? 'bg-red10' : 'bg-gray20'
            } */}
                {/* ${
                product.isFavourite ? '/heart_active.svg' : '/heart-nobg.svg'
              } */}
                <img src={`/heart-nobg.svg`} alt="like" />
              </button>
            </div>
          </div>
          <div className="container mt-4">
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6">
              <p className="text-[14px] leading-[19.6px] text-tetriaryBlack w-[100px]">
                Страна
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.country}
              </p>
              <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
                Регион
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.region}
              </p>
              <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
                Обжарка
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.roasting}
              </p>
              <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
                Обработка
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.cultivation}
              </p>
              {/* <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
                Высота
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.height} м
              </p> */}
              {/* <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
                Качество
              </p>
              <p className="text-[14px] leading-[19.6px] text-black">
                {product.quality}
              </p> */}
            </div>
          </div>
          <div className="container mb-6">
            <h2 className="py-1 mb-2 text-[18px] leading-[19.8px] font-semibold">
              Дескрипторы
            </h2>
            <p className="py-1 text-[14px] leading-[19.6px] text-black">
              {product.descriptors}
            </p>
          </div>
          <div className="container flex gap-2 outline-none mb-7">
            {configurations.map((config) => (
              <div
                key={config.id}
                className={`p-2 rounded-xl  ${
                  findProduct(`${product.id}_${config.id}`)
                    ? 'bg-systemOrange'
                    : 'bg-gray15'
                }`}
              >
                <p
                  className={`text-[14px] leading-[16.8px] ${
                    findProduct(`${product.id}_${config.id}`)
                      ? 'text-white'
                      : ''
                  }`}
                >
                  {config.cost} ₽
                </p>
                <p
                  className={`text-[11px] leading-[14.3px] mb-2 ${
                    findProduct(`${product.id}_${config.id}`)
                      ? 'text-orange10'
                      : 'text-tetriaryBlack'
                  }`}
                >
                  {config.weight >= 1000
                    ? config.weight / 1000 + ' кг'
                    : config.weight + ' г'}
                </p>
                {findProduct(`${product.id}_${config.id}`) ? (
                  <div className="py-1 w-[68px] bg-white rounded-2xl flex gap-1 justify-between px-[6px]">
                    <button
                      onClick={() => {
                        cartStore.changeCount(
                          findProduct(`${product.id}_${config.id}`)?.id ?? '',
                          -1
                        );
                      }}
                    >
                      <img
                        className="w-4 h-4"
                        src="/minus-icon.svg"
                        alt="minus"
                      />
                    </button>
                    <p className="text-[11px] leading-[14.3px] w-4 h-4 justify-center flex items-center">
                      {productsCount(`${product.id}_${config.id}`)}
                    </p>
                    <button
                      onClick={() => {
                        setGrinding(
                          findProduct(`${product.id}_${config.id}`)
                            ?.description ?? ''
                        );
                        setId(`${product.id}_${config.id}`);
                        setPrice(config.cost);
                        setWeight(
                          config.weight >= 1000
                            ? config.weight / 1000 + ' кг'
                            : config.weight + ' г'
                        );
                        onOpenChange();
                      }}
                    >
                      <img
                        className="w-4 h-4"
                        src="/plus-icon-gray.svg"
                        alt="plus"
                      />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setId(`${product.id}_${config.id}`);
                      setPrice(config.cost);
                      setWeight(
                        config.weight >= 1000
                          ? config.weight / 1000 + ' кг'
                          : config.weight + ' г'
                      );
                      setGrinding('');
                      onOpen();
                    }}
                    className="py-1 w-[68px] bg-gray30 rounded-2xl flex justify-center"
                  >
                    <img
                      className="w-4 h-4"
                      src="/plus-icon-gray.svg"
                      alt="plus"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <Modal
        classNames={{
          base: 'w-full rounded-3xl m-0 rounded-t-[30px] rounded-b-none px-4 pt-[60px]',
          wrapper: 'w-full',
          closeButton:
            'w-8 h-8 bg-gray20 rounded-full top-4 right-4 !ring-0 !ring-transparent',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <p className="py-1 text-[20px] leading-[22px] font-semibold mb-4">
                Выберите помол
              </p>
              <RadioGroup
                className="mb-8"
                onChange={(e) => {
                  setGrinding(e.target.value);
                }}
                value={grinding}
              >
                {grindings?.map((grinding) => (
                  <Radio
                    classNames={radioClassNames}
                    key={grinding.id}
                    value={grinding.title}
                  >
                    {grinding.title}
                  </Radio>
                ))}
              </RadioGroup>
              <button
                disabled={grinding === ''}
                className={`flex py-4 mb-8 justify-center bg-orange10 rounded-xl border-1 text-black
               font-semibold text-[16px] leading-[17.6px] border-[rgba(255,230,208,1)] shadow-light
             disabled:bg-gray20 disabled:border-gray15 disabled:shadow-none disabled:text-gray50`}
                onClick={() => {
                  if (findProduct(id)) {
                    if (findProduct(id)?.description === grinding) {
                      cartStore.changeCount(id, 1);
                    } else {
                      cartStore.addProduct({
                        id: `${id}_${
                          grindings?.find((g) => g.title === grinding)?.id
                        }`,
                        link_id: product?.id ?? '',
                        description: grinding,
                        quantity: weight,
                        count: 1,
                        image: undefined,
                        isFavourite: false,
                        price: price,
                        name: product?.title ?? '',
                      });
                    }
                  } else {
                    cartStore.addProduct({
                      id: id,
                      link_id: product?.id ?? '',
                      description: grinding,
                      quantity: weight,
                      count: 1,
                      image: undefined,
                      isFavourite: false,
                      price: price,
                      name: product?.title ?? '',
                    });
                  }
                  onClose();
                }}
              >
                Сохранить
              </button>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
