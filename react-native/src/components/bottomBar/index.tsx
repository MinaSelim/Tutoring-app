import React from 'react';
import BottomDrawer from 'rn-bottom-drawer';

interface IBottomBar {
  children?: React.ReactNode;
  containerHeight: number;
  offset: number;
  startUp?: boolean;
  downDisplay?: number;
  drawerTitle?: string;
}
const BottomBar: React.FunctionComponent<IBottomBar> = ({
  children,
  offset,
  containerHeight,
}: IBottomBar) => {
  return (
    <BottomDrawer containerHeight={containerHeight} offset={offset}>
      {children}
    </BottomDrawer>
  );
};

export default BottomBar;
