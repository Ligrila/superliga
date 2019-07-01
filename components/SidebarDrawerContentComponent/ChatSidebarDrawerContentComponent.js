import React, { Component } from 'react'
import FullChat from '../Chat/FullChat'





export class ChatSidebarDrawerContentComponent extends Component {
  componentWillMount(){
    this.setState({drawerLockMode:'locked-open'});
  }
  render() {

    return (
        <FullChat />
    )
  }
}
