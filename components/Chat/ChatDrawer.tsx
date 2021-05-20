import React, { useRef } from 'react';
import { Drawer} from 'native-base';
import FullChat from './FullChat';

const ChatDrawer = (props) => {
  const drawerRef = useRef<any>(null);
  const closeDrawer = () => {
    drawerRef.current._root.close()
  }
  const openDrawer = () => {
    drawerRef.current._root.open()
  };

  return (
    <Drawer
      type="overlay"
      onOpen={() => { console.log(drawerRef) }}
      side={'right'}
      ref={drawerRef}
      captureGestures
      tweenDuration={100}
      negotiatePan={true}
      
      // panThreshold={0.08}
      panOpenMask={0.35}
      content={<FullChat closeDrawer={closeDrawer} />}
    >
      {props.children}
    </Drawer>
  );

}
export default ChatDrawer;