import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Importation de l'icône de "like"
import { array as frenchBadwords } from 'french-badwords-list';

const MessagerieScreen = ({ route }) => {
  const { conversationId, conversationName } = route.params;
  const userId = "user1";  // Identifiant de l'utilisateur connecté

  const conversations = {
    '1': [
      { id: 1, text: 'Hey Alice, tu as passé une bonne journée ?', senderId: 'user1', timestamp: new Date(), liked: true }, // liked en true
      { id: 2, text: 'Oui, super, et toi ? 😊', senderId: 'user2', timestamp: new Date(), liked: true },
      { id: 3, text: 'Plutôt tranquille, mais j’ai hâte qu’on se revoie !', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 4, text: 'Moi aussi, je suis déjà impatiente 😘', senderId: 'user2', timestamp: new Date(), liked: true },
      { id: 5, text: 'Hâte de te revoir 😘', senderId: 'user2', timestamp: new Date(), liked: false },
    ],
    '2': [
      { id: 1, text: 'Salut Sophie, prête pour notre footing demain ? 😉', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 2, text: 'Haha, tu penses pouvoir me suivre ? 😜', senderId: 'user2', timestamp: new Date(), liked: false },
      { id: 3, text: 'Je crois que je suis plus rapide que tu ne le penses !', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 4, text: 'Haha, on verra si tu peux suivre ! 😜', senderId: 'user2', timestamp: new Date(), liked: false },
    ],
    '3': [
      { id: 1, text: 'Clara, j’ai adoré passer la soirée avec toi hier.', senderId: 'user1', timestamp: new Date(), liked: true },
      { id: 2, text: 'C’était vraiment sympa, merci pour l’invitation !', senderId: 'user2', timestamp: new Date(), liked: false },
      { id: 3, text: 'On remet ça bientôt ? 😉', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 4, text: 'Avec plaisir, c’était une super soirée !', senderId: 'user2', timestamp: new Date(), liked: false },
      { id: 5, text: 'C’était une super soirée, merci encore !', senderId: 'user2', timestamp: new Date(), liked: true },
    ],
    '4': [
      { id: 1, text: 'Diane, ce verre, c’est pour quand ? 😏', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 2, text: 'Haha, dès que tu me le proposes !', senderId: 'user2', timestamp: new Date(), liked: true },
      { id: 3, text: 'Je te l’ai proposé plusieurs fois, tu me fais languir !', senderId: 'user1', timestamp: new Date(), liked: false },
      { id: 4, text: 'Je sais, mais ça rend les choses plus intéressantes 😉', senderId: 'user2', timestamp: new Date(), liked: true },
      { id: 5, text: 'Tu me dois toujours ce verre 😏', senderId: 'user2', timestamp: new Date(), liked: false },
    ],
  };

  const [messages, setMessages] = useState(conversations[conversationId]);
  const [inputMessage, setInputMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // État pour gérer l'affichage de l'erreur

  // Fonction pour liker un message (empêcher user1 de liker ses propres messages)
  const handleLikeMessage = (messageId) => {
    const updatedMessages = messages.map(message => {
      if (message.id === messageId && message.senderId !== userId) {
        return { ...message, liked: !message.liked };  // Inverser l'état du "like"
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const handleSendMessage = () => {
    // Vérifier si le message contient des mots interdits
    const containsBannedWords = frenchBadwords.some(word => inputMessage.toLowerCase().includes(word));

    if (containsBannedWords) {
      setErrorMessage('Votre message contient des mots interdits. Merci de respecter les règles de courtoisie.');
      setInputMessage('');  // Réinitialiser le champ de saisie
      return;  // Ne pas envoyer le message
    }

    // Si pas de mots interdits, envoyer le message
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        senderId: userId,
        timestamp: new Date(),
        liked: false,  // Par défaut, les nouveaux messages ne sont pas likés
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');  // Réinitialiser le champ de saisie
      setErrorMessage('');  // Effacer le message d'erreur si le message est valide
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const renderItem = ({ item }) => {
    const isSender = item.senderId === userId;
    const showTimestamp = item.id === messages[messages.length - 1]?.id;
  
    return (
      <View style={[styles.messageContainer, isSender ? styles.senderContainer : styles.receiverContainer]}>
        <View
          style={[
            styles.messageBubble,
            isSender ? styles.senderBubble : styles.receiverBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isSender ? styles.senderText : styles.receiverText,
            ]}
          >
            {item.text}
          </Text>
  
          {/* Afficher le bouton "like" pour les messages de user1 à gauche */}
          {isSender && (
            <Ionicons
              name={item.liked ? 'heart' : 'heart-outline'}
              size={16}
              color={item.liked ? 'red' : 'gray'}
              style={styles.likeIconLeft}  // Place le like à gauche pour user1
            />
          )}
  
          {/* Bouton "like" à droite pour les messages de user2 */}
          {!isSender && (
            <TouchableOpacity onPress={() => handleLikeMessage(item.id)}>
              <Ionicons
                name={item.liked ? 'heart' : 'heart-outline'}
                size={16}
                color={item.liked ? 'red' : 'gray'}
                style={styles.likeIconRight}  // Place le like à droite pour l'autre utilisateur
              />
            </TouchableOpacity>
          )}
        </View>
  
        {/* Affichage de la date/heure en dessous du message */}
        {showTimestamp && (
          <Text style={[styles.timestamp, isSender ? styles.timestampRight : styles.timestampLeft]}>
            {formatTimestamp(item.timestamp)}
          </Text>
        )}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.conversationHeader}>{conversationName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.messageList}
      />

      {/* Affichage du message d'erreur */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Zone de saisie de texte */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Tapez un message..."
          value={inputMessage}
          onChangeText={(text) => {
            setInputMessage(text);
            if (errorMessage) {
              setErrorMessage('');  // Effacer le message d'erreur dès que l'utilisateur tape un nouveau message
            }
          }}
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
  conversationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  senderContainer: {
    alignItems: 'flex-end',
  },
  receiverContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    position: 'relative',  // Ajoute cette ligne
  },
  senderBubble: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverBubble: {
    backgroundColor: '#ececec',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#000',
  },
  likeIconRight: {
    position: 'absolute',
    right: -40,  // Ajuste la valeur pour décaler le cœur hors de la bulle
    top: '50%',
    transform: [{ translateY: -8 }],  // Centrer verticalement
  },
  likeIconLeft: {
    position: 'absolute',
    left: -30,  // Ajuste la valeur pour décaler le cœur hors de la bulle
    top: '50%',
    transform: [{ translateY: -8 }],  // Centrer verticalement
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  timestampRight: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  timestampLeft: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default MessagerieScreen;
