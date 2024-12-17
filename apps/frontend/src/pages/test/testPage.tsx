import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { FC } from 'react';
import { useGetApiItemGrain } from '../../api/generated/users/default';
import { items } from '../../mocks/mockItems';

export const TestPage: FC = () => {
  const { initData } = retrieveLaunchParams();

  const { isLoading, isError, data } = useGetApiItemGrain();
  console.log(isLoading, isError, data);

  return (
    <div>
      <p>{initData?.authDate.toLocaleDateString()}</p>
      {data &&
        data.map(
          (item, ix) =>
            item.items?.map((e) => (
              <>
                <p className="text-3xl font-black">{e.title}</p>
                <img src={e.image ?? ''} alt="123" />
              </>
            ))
          // <SubCategory title={item.nameCategory??''} description={item.description} products={item.items}/>
        )}
      <p>{initData?.user?.firstName}</p>
      <p>{initData?.user?.username}</p>
      <img src={initData?.user?.photoUrl} alt="" />
    </div>
  );
};
