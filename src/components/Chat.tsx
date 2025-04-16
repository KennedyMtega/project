import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Send } from 'lucide-react';
import { Database } from '../types/database.types';
import { handleAuthError } from '../lib/supabase';

// Using proper type definitions from database schema
type Message = Database['public']['Tables']['messages']['Row'];

interface ChatProps {
  chatRoomId: string;
  currentUserId: string;
  otherUserName: string;
}

// Error boundary component for chat errors
class ChatErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): {hasError: boolean} {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error('Chat component error:', error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h3 className="text-red-500 font-medium">Something went wrong with the chat</h3>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function Chat({ chatRoomId, currentUserId, otherUserName }: ChatProps): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load existing messages
    loadMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`chat_${chatRoomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setMessages(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error loading messages:', error);
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Rate limiting implementation
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const MESSAGE_RATE_LIMIT_MS = 1000; // 1 second between messages
  
  const sendMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastMessageTime < MESSAGE_RATE_LIMIT_MS) {
      setError(`Please wait before sending another message (rate limit: ${MESSAGE_RATE_LIMIT_MS/1000}s)`);
      return;
    }
    
    setError(null);
    const messageContent = newMessage.trim();
    // Optimistic UI update - clear input immediately
    setNewMessage('');
    
    try {
      // Input validation for message content
      if (messageContent.length > 1000) {
        throw new Error('Message is too long (maximum 1000 characters)');
      }
      
      // Sanitize input to prevent XSS
      const sanitizedContent = messageContent
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      const { error } = await supabase.from('messages').insert({
        chat_room_id: chatRoomId,
        sender_id: currentUserId,
        content: sanitizedContent,
        read: false
      });

      if (error) {
        throw error;
      }
      
      // Update last message time for rate limiting
      setLastMessageTime(now);
    } catch (err) {
      const error = err as Error;
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ChatErrorBoundary>
      <div className="flex flex-col h-full">
      <div className="bg-white px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">{otherUserName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender_id === currentUserId
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-75">
                {new Date(message.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
    </ChatErrorBoundary>
  );
}