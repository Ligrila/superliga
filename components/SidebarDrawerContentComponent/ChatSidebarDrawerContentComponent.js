import React, { Component } from 'react'
import FullChat from '../Chat/FullChat'





export default class Sidebar extends Component {
  render() {
    return (
        <FullChat />
    )
  }
}


export const ChatSidebarDrawerContentComponent = (props) => (
    <Sidebar />
  );
  