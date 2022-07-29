import { ScrollView, View } from 'react-native';
import { HomeCarouselItem } from './HomeCarouselItem';

export const HomeCarousel = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HomeCarouselItem
          icon={'🛵'}
          title={'Entregadores ganham mais'}
          text={'Entregadores definem suas próprias condições, e o aplicativo não fica com nada'}
        />
        <HomeCarouselItem
          icon={'🍕'}
          title={'Restaurantes ganham mais'}
          text={
            'Nossa comissão é de 5%, enquanto em outros apps esse valor pode chegar a quase 30%'
          }
        />
        <HomeCarouselItem
          icon={'🎉'}
          title={'Pratos mais baratos'}
          text={'Como restaurantes pagam menos, agora eles podem ofertar pratos com preços menores'}
        />
        <HomeCarouselItem
          icon={'📦'}
          title={'Entrega de encomendas'}
          text={
            'O AppJusto cobra R$ 5 de taxa fixa, e o restante do valor vai todo para o entregador'
          }
        />
      </ScrollView>
    </View>
  );
};
