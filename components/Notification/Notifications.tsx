import React from "react";
import { View } from "react-native";
import NotificationItem from "./NotificationItem";
import Title from "../Title";
import { useRecoilValue } from "recoil";
import { notificationsAtom } from "../../recoil/Notifications.recoil";
import Notice from "../Notice/Notice";
import { ScrollView } from "react-native-gesture-handler";

const Notification = () => {
  const notifications = useRecoilValue(notificationsAtom);
  // constructor(props) {
  //   super(props);
  //   this.store = NotificationsStore

  // }

  // componentDidMount(){
  //   NotificationsActions.list()
  //   NotificationsActions.notificationsLoaded.listen(()=>{
  //     UsersActions.update()
  //   })
  // }

  const renderItems = () => {
    if (!notifications.hasData) {
      return null;
    }
    if (notifications.hasData && notifications.data.length === 0) {
      return <Notice text="Sin notificaciones" />
    }
    return notifications.data.map((notification, index) => {

      return (
        <NotificationItem
          colorIndex={index}
          notification={notification}
          key={notification.id}
        // navigation={this.props.navigation}
        />
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Title text={"MIS \n NOTIFICACIONES"}></Title>
      <ScrollView>
        {renderItems()}
      </ScrollView>
    </View>
  );
};

export default Notification;
