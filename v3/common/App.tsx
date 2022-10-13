import { loadAssets } from '../assets';
import { BusinessApp } from '../business/BusinessApp';
import { ConsumerApp } from '../consumer/ConsumerApp';
import { CourierApp } from '../courier/CourierApp';
import * as analytics from './analytics';
import { getFlavor } from './config';
import { PreloadAssets } from './PreloadAssets';

analytics.init();

export const App = () => {
  const flavor = getFlavor();
  return (
    <PreloadAssets loadAssets={() => loadAssets(flavor)}>
      {() => (
        <>
          {flavor === 'consumer' ? <ConsumerApp /> : null}
          {flavor === 'courier' ? <CourierApp /> : null}
          {flavor === 'business' ? <BusinessApp /> : null}
        </>
      )}
    </PreloadAssets>
  );
};
