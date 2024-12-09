import { FC } from 'react';
import { Link } from 'react-router-dom';

export const CatrgoriesList: FC = () => {
  return (
    <div className="flex container justify-between mt-6">
      <Link className="linkCard border-gray15 p-3 flex flex-col" to="grain">
        <img
          className="w-8 h-8 mb-[6px]"
          src="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/coffee.svg"
          alt="coffee"
        />
        <h3 className="text-[13px] leading-[18.2px] font-semibold mb-2">
          Зерно
        </h3>
        <p className="text-gray70 font-normal text-[11px] leading-[14.3px]">
          Собственной обжарки
        </p>
      </Link>
      <Link className="linkCard border-gray15 p-3 flex flex-col" to="dripPacks">
        <img
          className="w-8 h-8 mb-[6px]"
          src="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/drips.svg"
          alt="drips"
        />
        <h3 className="text-[13px] leading-[18.2px] font-semibold mb-2">
          Дрипы
        </h3>
        <p className="text-gray70 font-normal text-[11px] leading-[14.3px]">
          Любимый кофе всегда с собой
        </p>
      </Link>
      <Link className="linkCard border-gray15 p-3 flex flex-col" to="other">
        <img
          className="w-8 h-8 mb-[6px]"
          src="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/other.svg"
          alt="things"
        />
        <h3 className="text-[13px] leading-[18.2px] font-semibold mb-2">
          Штуки
        </h3>
        <p className="text-gray70 font-normal text-[11px] leading-[14.3px]">
          Книги, стикеры и другое
        </p>
      </Link>
    </div>
  );
};
