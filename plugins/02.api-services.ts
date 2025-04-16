import initApiServices from '@/services';

export default defineNuxtPlugin(() => {
  const { $ky } = useNuxtApp();
  const services = initApiServices($ky);

  return {
    provide: {
      services
    }
  };
});
