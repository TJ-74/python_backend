'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Bot } from 'lucide-react';
import Navbar from '@/components/NavBar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
}

let messageCounter = 0;

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => [{
    id: 'system-init',
    text: "Hello! I'm your healthcare assistant. How can I help you today?",
    sender: 'system',
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = input.trim();
    setInput('');

    messageCounter++;
    const newUserMessage: Message = {
      id: `msg-${messageCounter}`,
      text: userMessage,
      sender: 'user',
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: userMessage,
            }
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data = await response.json();
      messageCounter++;
      const aiMessage: Message = {
        id: `msg-${messageCounter}`,
        text: data.message,
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      messageCounter++;
      const errorMessage: Message = {
        id: `msg-${messageCounter}`,
        text: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        sender: 'system',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 rounded-lg shadow-lg h-[calc(100vh-8rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Start a conversation by sending a message!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 flex items-start ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {(message.sender === 'ai' || message.sender === 'system') && (
                      <Bot className="mr-2 mt-1" size={16} />
                    )}
                    <p className={message.sender === 'system' ? 'text-gray-200' : ''}>{message.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 