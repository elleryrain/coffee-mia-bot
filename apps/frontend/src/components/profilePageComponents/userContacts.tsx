import { Input, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { FC, Ref, useState } from 'react';
import { ChangeData } from './changeData';
import { inputStyles, modalStyles } from '../../next-ui-styles';
import { useIMask } from 'react-imask';
import { useGetUserInfo } from '../../api/generated/users/default';

export const UserContacts: FC = () => {
  const { initData } = retrieveLaunchParams();

  const { data: user } = useGetUserInfo();

  const [nickname, setNickname] = useState(
    user?.username
      ? `@${user.username}`
      : initData?.user?.username
      ? `@${initData?.user?.username}`
      : '@'
  );

  const {
    value: phone,
    ref: phoneRef,
    setValue: setPhone,
  } = useIMask({ mask: '+{7}(900)000-00-00' });

  const {
    isOpen: isPhoneModalOpen,
    onOpen: onPhoneModalOpen,
    onOpenChange: onPhoneModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isNicknameModalOpen,
    onOpen: onNicknameModalOpen,
    onOpenChange: onNicknameModalOpenChange,
  } = useDisclosure();

  return (
    <div className="mt-8">
      <div className="py-3 px-1 flex justify-between">
        <div className="flex gap-3">
          <img src="/phone-ic.svg" alt="" />
          <div>
            <p className="text-[14px] leading-[16.71px] mb-[2px] text-tetriaryBlack">
              Телефон
            </p>
            <p className="text-[16px] leading-[19.09px]"></p>
          </div>
        </div>
        <button onClick={onPhoneModalOpen}>
          <img src="/arrow_right.svg" alt="" />
        </button>
        <Modal
          classNames={modalStyles}
          isOpen={isPhoneModalOpen}
          onClose={onPhoneModalOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <ChangeData onClose={onClose}>
                <Input
                  ref={phoneRef as Ref<HTMLInputElement>}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  label="Номер телефона"
                  labelPlacement="outside"
                  placeholder="+7"
                  classNames={inputStyles}
                />
              </ChangeData>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="py-3 px-1 flex justify-between items-center">
        <div className="flex gap-3">
          <img src="/telegram-ic.svg" alt="" />
          <div>
            <p className="text-[14px] leading-[16.71px] mb-[2px] text-tetriaryBlack">
              Ник в Телеграм
            </p>
            <p className="text-[16px] leading-[19.09px]">
              @{initData?.user?.username}
            </p>
          </div>
        </div>
        <button onClick={onNicknameModalOpen}>
          <img src="/arrow_right.svg" alt="" />
        </button>
        <Modal
          classNames={modalStyles}
          isOpen={isNicknameModalOpen}
          onClose={onNicknameModalOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <ChangeData onClose={onClose}>
                <Input
                  classNames={inputStyles}
                  value={nickname}
                  labelPlacement="outside"
                  label="Ник в Телеграм"
                  placeholder="Введите ник"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </ChangeData>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
