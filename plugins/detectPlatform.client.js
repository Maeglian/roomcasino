import detect from '@/utils/deviceDetector';

export default async context => {
  const platform = detect.mobile() || detect.tablet() || detect.phone() ? 'mobile' : 'desktop';
  context.store.commit('setPlatform', platform);
};
