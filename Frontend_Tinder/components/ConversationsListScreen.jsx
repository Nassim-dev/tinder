import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ConversationsListScreen = ({ navigation }) => {
  const conversations = [
    { id: '1', name: 'Alice', lastMessage: 'Hâte de te revoir 😘' },
    { id: '2', name: 'Sophie', lastMessage: 'Haha, on verra si tu peux suivre ! 😜' },
    { id: '3', name: 'Clara', lastMessage: 'C’était une super soirée, merci encore !' },
    { id: '4', name: 'Diane', lastMessage: 'Tu me dois toujours ce verre 😏' },
  ];

  const handleConversationPress = (conversationId, conversationName) => {
    navigation.navigate('MessagerieScreen', { conversationId, conversationName });
  };

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleConversationPress(item.id, item.name)}
    >
      <Text style={styles.conversationName}>{item.name}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        style={styles.conversationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
});

export default ConversationsListScreen;
