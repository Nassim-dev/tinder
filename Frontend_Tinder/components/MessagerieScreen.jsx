import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");  // Assurez-vous que l'URL correspond à celle de votre backend

const MessagerieScreen = ({ route }) => {
  const { conversationId } = route.params;  // Récupérer le conversationId à partir des paramètres de navigation
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (conversationId) {
      // Rejoindre la conversation avec le conversationId
      socket.emit('joinConversation', conversationId);

      // Écouter les messages entrants
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Nettoyage à la déconnexion
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [conversationId]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = { text: inputMessage, id: messages.length + 1 };
      // Envoyer le message avec le conversationId
      socket.emit('sendMessage', { conversationId, message });
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Tapez un message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ececec',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MessagerieScreen;
