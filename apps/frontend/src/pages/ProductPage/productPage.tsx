import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../../mocks/mockProducts';
import { useCartStore } from '../../store/cartStore';
import useEmblaCarousel from 'embla-carousel-react';
import { mainBanners } from '../../mocks/mockItems';
import {
  Modal,
  ModalContent,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@nextui-org/react';
import { radioClassNames } from '../../next-ui-styles';
import { useGetApiItem } from '../../api/generated/users/default';

export const ProductPage: FC = () => {
  const params = useParams<{ id: string }>();
  const data = products[Number(params.id)];
  const [emblaRef] = useEmblaCarousel();

  const cartStore = useCartStore();

  const [grinding, setGrinding] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {  } = useGetApiItem({ idItem: params.id ?? '' });

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
        <div className="flex items-center justify-between py-1">
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
      <div className="container mt-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6">
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack w-[100px]">
            Страна
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">Бургунди</p>
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
            Регион
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">
            Провинция Каянза
          </p>
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
            Обжарка
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">Светлая</p>
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
            Обработка
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">Натуральная</p>
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
            Высота
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">1672 м</p>
          <p className="text-[14px] leading-[19.6px] text-tetriaryBlack">
            Качество
          </p>
          <p className="text-[14px] leading-[19.6px] text-black">
            gr.1 GrainPro
          </p>
        </div>
      </div>
      <div className="container mb-6">
        <h2 className="py-1 mb-2 text-[18px] leading-[19.8px] font-semibold">
          Дескрипторы
        </h2>
        <p className="py-1 text-[14px] leading-[19.6px] text-black">
          Желтая слива, чайное округлое тело, ноты карамели, яблока, цитруса, на
          послевкусии тростниковый сахар с абрикосом
        </p>
      </div>
      <div className="flex gap-2 outline-none">
        <button onClick={onOpen}>open</button>
      </div>
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
              >
                <Radio classNames={radioClassNames} value={'Без помола'}>
                  Без помола
                </Radio>
                <Radio classNames={radioClassNames} value={'Для турки'}>
                  Для турки
                </Radio>
                <Radio classNames={radioClassNames} value={'Для эспрессо'}>
                  Для эспрессо
                </Radio>
                <Radio classNames={radioClassNames} value={'Для гейзера'}>
                  Для гейзера
                </Radio>
                <Radio classNames={radioClassNames} value={'Для воронки'}>
                  Для воронки
                </Radio>
                <Radio classNames={radioClassNames} value={'Для фильтра'}>
                  Для фильтра
                </Radio>
                <Radio classNames={radioClassNames} value={'Для френч-пресс'}>
                  Для френч-пресс
                </Radio>
              </RadioGroup>
              <button
                disabled={grinding === ''}
                className={`flex py-4 mb-8 justify-center bg-orange10 rounded-xl border-1 text-black
               font-semibold text-[16px] leading-[17.6px] border-[rgba(255,230,208,1)] shadow-light
             disabled:bg-gray20 disabled:border-gray15 disabled:shadow-none disabled:text-gray50`}
                onClick={onClose}
              >
                Сохранить
              </button>
            </>
          )}
        </ModalContent>
      </Modal>
      Product {params.id} Page
    </div>
  );
};
