import { loadAssets } from '../assets';
import { AppBusiness } from '../business/AppBusiness';
import { getFlavor } from '../config';
import { AppConsumer } from '../consumer/AppConsumer';
import { AppCourier } from '../courier/AppCourier';
import { PreloadAssets } from './PreloadAssets';

export const App = () => {
  const flavor = getFlavor();
  return (
    <PreloadAssets loadAssets={() => loadAssets(flavor)}>
      {() => (
        <>
          {flavor === 'consumer' ? <AppConsumer /> : null}
          {flavor === 'courier' ? <AppCourier /> : null}
          {flavor === 'business' ? <AppBusiness /> : null}
        </>
      )}
    </PreloadAssets>
  );
};
