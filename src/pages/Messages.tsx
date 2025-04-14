import React, { useState } from 'react';
import { ChatList } from '../components/ChatList';
import { Chat } from '../components/Chat';

interface ChatRoom {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
}

export function Messages({ currentUserId }: { currentUserId: string }) {
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);

  const getOtherUserName = (chatRoom: ChatRoom) => {
    return chatRoom.buyer_id === currentUserId
      ? chatRoom.seller.name
      : chatRoom.buyer.name;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-1/3 border-r overflow-y-auto">
        <ChatList currentUserId={currentUserId} onSelectChat={setSelectedChat} />
      </div>
      <div className="flex-1">
        {selectedChat ? (
          <Chat
            chatRoomId={selectedChat.id}
            currentUserId={currentUserId}
            otherUserName={getOtherUserName(selectedChat)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}