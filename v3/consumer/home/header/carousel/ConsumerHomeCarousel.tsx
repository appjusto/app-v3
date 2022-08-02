import { ScrollView, View } from 'react-native';
import { ConsumerHomeCarouselItem } from './ConsumerHomeCarouselItem';

export const ConsumerHomeCarousel = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ConsumerHomeCarouselItem
          icon={'🛵'}
          title={'Entregadores ganham mais'}
          text={'Entregadores definem suas próprias condições, e o aplicativo não fica com nada'}
        />
        <ConsumerHomeCarouselItem
          icon={'🍕'}
          title={'Restaurantes ganham mais'}
          text={
            'Nossa comissão é de 5%, enquanto em outros apps esse valor pode chegar a quase 30%'
          }
        />
        <ConsumerHomeCarouselItem
          icon={'🎉'}
          title={'Pratos mais baratos'}
          text={'Como restaurantes pagam menos, agora eles podem ofertar pratos com preços menores'}
        />
        <ConsumerHomeCarouselItem
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
