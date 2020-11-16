import React from 'react';
import { ImageStyle, Image } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

// export const CameraIcon = (style: ImageStyle): IconElement => (
//     <Image
//     style={styles.tinySendIcon}
//     source={require('../../assets/icons/send-arrow.png')}
//   />
// );

export const FileIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='file'/>
);

export const PaperPlaneIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='paper-plane'/>
  );
