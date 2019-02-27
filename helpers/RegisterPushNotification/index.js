import { Permissions, Notifications } from 'expo';
import Api from '../../api/Api';

 registerPushNotifications = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;


  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return Promise.reject();
  }

  // Get the token that uniquely identifies this device
  let token = ''
  try{
    token = await Notifications.getExpoPushTokenAsync();
  } catch(e){
    console.log({e})
    return Promise.reject();
  }
  const api = new Api;
  const ret = await api.pushNotificationsRegister(token);
  console.log({ret})
  return ret;

}


export default registerPushNotifications;