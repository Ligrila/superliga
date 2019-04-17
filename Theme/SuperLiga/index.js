import AppHeader from './AppHeader'
import NotificationBullet from './NotificationBullet'
import ChampionshipItem from './ChampionshipItem'

import Challenges from './Challenges'
import Contact from './Contact';
import Chat from './Chat';



export default {

    'SuperLiga.AppHeader':AppHeader,
    'SuperLiga.NotificationBullet':NotificationBullet,
    'SuperLiga.ChampionshipItem':ChampionshipItem,
    'SuperLiga.ContactScreen':Contact,
    ...Chat,
    ...Challenges,

}
