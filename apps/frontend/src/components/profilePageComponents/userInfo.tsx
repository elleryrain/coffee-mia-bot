import {
  Avatar,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { on, retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { FC, useState } from 'react';
import { avatarStyles, inputStyles, modalStyles } from '../../next-ui-styles';
import { ChangeData } from './changeData';
import {
  useGetUserInfo,
  useUpdateUserName,
} from '../../api/generated/users/default';

export const UserInfo: FC = () => {
  const { initData } = retrieveLaunchParams();
  const { data: user, refetch: refetchUser } = useGetUserInfo();

  const [name, setName] = useState(
    user?.firstName ? user?.firstName : initData?.user?.firstName
  );
  const [surname, setSurname] = useState(
    user?.lastName ? user?.lastName : initData?.user?.firstName
  );

  const { mutateAsync: updateUserName } = useUpdateUserName();

  const {
    isOpen: isUserDataModalOpen,
    onOpen: onUserDataModalOpen,
    onOpenChange: onUserDataModalOpenChange,
  } = useDisclosure();

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-6 items-end py-2 px-1">
        <Avatar classNames={avatarStyles} src={initData?.user?.photoUrl} />
        <div>
          <p
            className={`text-[22px] leading-[26.25px] font-bold ${
              initData?.user?.firstName || user?.firstName ? '' : 'text-gray40'
            }`}
          >
            {user?.firstName
              ? user.firstName
              : initData?.user?.firstName
              ? initData?.user?.firstName
              : 'Имя'}
          </p>
          <p
            className={`text-[22px] leading-[26.25px] font-bold ${
              initData?.user?.firstName || user?.lastName ? '' : 'text-gray40'
            }`}
          >
            {user?.lastName
              ? user.lastName
              : initData?.user?.lastName
              ? initData?.user?.lastName
              : 'Фамилия'}
          </p>
        </div>
      </div>
      <button
        onClick={onUserDataModalOpen}
        className="text-[12px] mb-2 leading-[14.32px] text-systemOrange"
      >
        Изменить
      </button>
      <Modal
        classNames={modalStyles}
        isOpen={isUserDataModalOpen}
        onClose={onUserDataModalOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ChangeData onClose={onClose}>
              <div>
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  label="Имя"
                  labelPlacement="outside"
                  placeholder="Введите имя"
                  classNames={inputStyles}
                />
                <Input
                  className="!mt-12"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  label="Фамилия"
                  labelPlacement="outside"
                  placeholder="Введите фамилию"
                  classNames={inputStyles}
                />
              </div>
              <button
                disabled={
                  user?.firstName === name && user?.lastName === surname
                }
                onClick={async () => {
                  await updateUserName({
                    data: { firstName: name, lastName: surname },
                  });
                  refetchUser();
                }}
                className="update-button shadow-light"
              >
                Готово
              </button>
            </ChangeData>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
