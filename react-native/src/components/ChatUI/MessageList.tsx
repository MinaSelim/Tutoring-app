import React, { Component} from 'react'
import { FlatList, Text, ListRenderItem,  } from 'react-native'
import MessageRow from './MessageRow'
import IMessage from '../../model/IMessage'

const ITEM_HEIGHT = 50
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    userName: 'First Item',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: 635235325
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    userName: 'First Item',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: 635235325
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'First Item',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: 635235325
  },
];

interface IMessageListState {
    messages: IMessage[]
}

class MessageList extends Component<any,IMessageListState > {

 constructor(props:any){
     super(props);
     this.state = {
         messages: []
     }
     this.renderItem = this.renderItem.bind(this);
 }   


renderItem:any = (item : IMessage) => {<MessageRow {...item} />}
itemLayout = (data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})

 render(){
     return(
         <FlatList
            //style={styles.container}
            data={DATA}
            keyExtractor={item => item.id}
            renderItem= {this.renderItem}
            getItemLayout={this.itemLayout}
            inverted
         > 
         
         </FlatList>
     );
 }
}