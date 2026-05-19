import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, Bot, User, Sparkles, Mic, Volume2, MessageSquare, ArrowLeft } from 'lucide-react';
import backend from '~backend/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';

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

type ChatMode = 'select' | 'text-to-text' | 'speech-to-text' | 'text-to-speech' | 'speech-to-speech';

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
  const [mode, setMode] = useState<ChatMode>('select');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: (data: { message: string; userId?: string }) => backend.ai.chat(data),
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
    chatMutation.mutate({
      message: inputMessage,
      userId: user?.userId,
    });
    setInputMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };


  if (mode === 'select') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Credit Card Advisor</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Choose Your Interaction Mode
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            Select how you would like to interact with SwipeRight AI to find the best cashback cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-teal-500" onClick={() => setMode('text-to-text')}>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Text to Text</h3>
              <p className="text-gray-500 text-sm">Standard chat interface. Type your questions and receive text answers.</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-teal-500" onClick={() => setMode('speech-to-text')}>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
                <Mic className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Speech to Text</h3>
              <p className="text-gray-500 text-sm">Speak your questions aloud and receive text answers in the chat.</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-teal-500" onClick={() => setMode('text-to-speech')}>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-teal-100 text-teal-600 rounded-full">
                <Volume2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Text to Speech</h3>
              <p className="text-gray-500 text-sm">Type your questions and listen to the AI's spoken responses.</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-500" onClick={() => setMode('speech-to-speech')}>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-green-100 text-green-600 rounded-full">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Speech to Speech</h3>
              <p className="text-gray-500 text-sm">Fully conversational voice interface. Talk naturally with the AI.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (mode === 'speech-to-speech') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-12rem)] flex flex-col items-center justify-center relative">
        <Button variant="ghost" className="absolute top-4 left-4" onClick={() => setMode('select')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modes
        </Button>

        <div className="text-center space-y-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Voice Assistant
          </h1>

          <div className="relative flex items-center justify-center w-64 h-64 mb-8">
            <div className={`absolute inset-0 rounded-full bg-green-400 opacity-20 ${isListening ? 'animate-ping' : ''}`}></div>

            <div className={`absolute inset-4 rounded-full bg-green-500 opacity-40 ${isListening ? 'animate-pulse' : ''}`} style={{ animationDuration: '2s' }}></div>

            <div
              className="relative w-48 h-48 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,197,94,0.5)]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #4ade80, #22c55e, #166534)',
                boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.3), inset 10px 10px 20px rgba(255,255,255,0.4), 0 10px 30px rgba(22,101,52,0.6)'
              }}
              onClick={() => setIsListening(!isListening)}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                <Mic className="h-12 w-12 drop-shadow-md" />
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-600 font-medium">
            {isListening ? "Listening..." : "Tap the sphere to speak"}
          </p>

          {chatMutation.isPending && (
            <p className="text-green-600 animate-pulse">Thinking...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-12rem)] flex flex-col">

      {/* Header */}
      <div className="flex items-center mb-6 relative">
        <Button variant="ghost" className="absolute left-0" onClick={() => setMode('select')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="w-full text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            {mode === 'text-to-text' && <MessageSquare className="h-5 w-5 text-teal-600" />}
            {mode === 'speech-to-text' && <Mic className="h-5 w-5 text-teal-600" />}
            {mode === 'text-to-speech' && <Volume2 className="h-5 w-5 text-teal-600" />}
            SwipeRight AI
          </h1>
          <p className="text-sm text-gray-500 capitalize">{mode.replace(/-/g, ' ')} Mode</p>
        </div>
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
        {mode === 'speech-to-text' && (
          <Button variant="outline" className={`shrink-0 ${isListening ? 'bg-red-50 text-red-500 border-red-200' : ''}`} onClick={() => setIsListening(!isListening)}>
            <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
          </Button>
        )}
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
