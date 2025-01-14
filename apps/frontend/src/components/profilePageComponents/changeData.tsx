import { FC, ReactNode } from 'react';

export const ChangeData: FC<{ onClose: () => void; children: ReactNode }> = ({
  onClose,
  children,
}) => {
  return (
    <div className="container">
      <button
        className="text-systemOrange flex items-center my-3"
        onClick={onClose}
      >
        <img src="/arrow-left.svg" alt="" />
        Назад
      </button>
      <h1 className="font-bold text-[28px] leading-[33.41px] py-2">
        Изменить данные
      </h1>
      <div className="pt-2">{children}</div>
    </div>
  );
};
