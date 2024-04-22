import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const App = () => {

  const svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="484" height="152" viewBox="0 0 484 152" fill="none">
  <g filter="url(#filter0_d_2617_7494)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M288.035 48.3011C295.51 37.4547 302.026 28 312.998 28H456V124H28V28H165.967C175.939 28 182.283 37.0582 189.675 47.6134C199.993 62.3481 212.355 80 239.482 80C266.189 80 277.98 62.8914 288.035 48.3011Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_d_2617_7494" x="0.9" y="0.9" width="482.2" height="150.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="13.55"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2617_7494"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2617_7494" result="shape"/>
    </filter>
  </defs>
</svg>`;

  return (
    <View style={{ backgroundColor: '#F1F1F1', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ shadowColor: '#fae', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 10 }}>
        <SvgXml xml={svgXml} />
      </View>
    </View>
  );
};

export default App;
