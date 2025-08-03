import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import backend from '~backend/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "What's the best card for grocery shopping?",
  "How do I track my rotating category benefits?",
  "Which card should I use for gas purchases?",
  "What are the annual limits on my cashback cards?",
  "Best travel credit cards for 2024?",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm SwipeRight AI, your personal credit card advisor. I can help you find the best cards for specific purchases, track your benefits, and optimize your cash back strategy. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: (message: string) => backend.ai.chat({ message }),
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputMessage);
    setInputMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <div className="text-center space-y-4 mb-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Credit Card Advisor</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">
          Chat with
          <span className="block bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            SwipeRight AI
          </span>
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {chatMutation.isPending && (
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-teal-100 rounded-full">
              <Bot className="h-5 w-5 text-teal-600" />
            </div>
            <Card className="flex-1 border-0 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-600">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestion(question)}
                className="text-left hover:bg-teal-50 hover:border-teal-300"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Ask about credit cards, cashback strategies, or benefits..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={chatMutation.isPending}
          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
        />
        <Button 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || chatMutation.isPending}
          className="bg-teal-500 hover:bg-teal-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${
        message.isUser 
          ? 'bg-teal-500 text-white' 
          : 'bg-teal-100 text-teal-600'
      }`}>
        {message.isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      
      <Card className={`flex-1 max-w-[80%] border-0 ${
        message.isUser 
          ? 'bg-teal-500 text-white' 
          : 'bg-gray-50'
      }`}>
        <CardContent className="p-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <p className={`text-xs mt-2 ${
            message.isUser ? 'text-teal-100' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
