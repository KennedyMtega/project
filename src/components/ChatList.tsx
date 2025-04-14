import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ChatRoom {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  updated_at: string;
  product: {
    title: string;
  };
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
  last_message: {
    content: string;
    created_at: string;
  };
}

interface ChatListProps {
  currentUserId: string;
  onSelectChat: (chatRoom: ChatRoom) => void;
}

export function ChatList({ currentUserId, onSelectChat }: ChatListProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    loadChatRooms();

    const subscription = supabase
      .channel('chat_rooms_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms',
        },
        () => {
          loadChatRooms();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUserId]);

  const loadChatRooms = async () => {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        product:products(title),
        buyer:buyer_id(name),
        seller:seller_id(name),
        last_message:messages(content, created_at)
      `)
      .or(`buyer_id.eq.${currentUserId},seller_id.eq.${currentUserId}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading chat rooms:', error);
      return;
    }

    setChatRooms(data);
  };

  return (
    <div className="divide-y">
      {chatRooms.map((room) => (
        <div
          key={room.id}
          onClick={() => onSelectChat(room)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                {room.buyer_id === currentUserId ? room.seller.name : room.buyer.name}
              </h3>
              <p className="text-sm text-gray-600">{room.product.title}</p>
            </div>
            {room.last_message && (
              <span className="text-xs text-gray-500">
                {new Date(room.last_message.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
          {room.last_message && (
            <p className="text-sm text-gray-600 mt-1 truncate">
              {room.last_message.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}