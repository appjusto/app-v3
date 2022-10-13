import Svg, { Path, SvgProps } from 'react-native-svg';

export const FacebookIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15Z"
      fill="#1977F3"
    />
    <Path
      d="M20.839 19.337 21.503 15h-4.16v-2.814c0-1.185.58-2.344 2.445-2.344h1.892V6.151s-1.717-.293-3.358-.293c-3.426 0-5.666 2.075-5.666 5.837V15h-3.81v4.337h3.81v10.482a15.312 15.312 0 0 0 4.687 0V19.337h3.496Z"
      fill="#fff"
    />
  </Svg>
);
