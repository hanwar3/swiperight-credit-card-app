import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
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
  "Best travel credit cards for 2025?",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm SwipeRight AI, your personal credit card advisor. I can help you find the best cards for specific purchases, track your benefits, and optimize your cash back strategy. You can type or use the microphone to speak with me!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const ttsMutation = useMutation({
    mutationFn: (text: string) => backend.ai.textToSpeech({ text }),
    onSuccess: (data) => {
      const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
      currentAudioRef.current = audio;
      setIsSpeaking(true);
      audio.play();
      audio.onended = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
    },
    onError: (error) => {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    },
  });

  const sttMutation = useMutation({
    mutationFn: (data: { audioBase64: string; mimeType: string }) =>
      backend.ai.speechToText(data),
    onSuccess: (data) => {
      if (data.transcript.trim()) {
        setInputMessage(data.transcript);
        sendMessage(data.transcript);
      } else {
        toast({ title: "No speech detected", description: "Please try speaking again.", variant: "destructive" });
      }
      setIsProcessingVoice(false);
    },
    onError: (error) => {
      console.error('STT error:', error);
      toast({ title: "Speech recognition failed", description: "Could not process your speech. Please try again.", variant: "destructive" });
      setIsProcessingVoice(false);
    },
  });

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
      if (ttsEnabled) {
        ttsMutation.mutate(data.response);
      }
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

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate({ message: text, userId: user?.userId });
    setInputMessage('');
  }, [chatMutation, user]);

  const handleSendMessage = () => {
    sendMessage(inputMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const stopSpeaking = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setIsSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      stopSpeaking();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setIsProcessingVoice(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          sttMutation.mutate({ audioBase64: base64, mimeType });
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone error:', error);
      toast({ title: "Microphone access denied", description: "Please allow microphone access to use voice input.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const isLoading = chatMutation.isPending || isProcessingVoice;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-12rem)] flex flex-col">
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
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Powered by</span>
          <span className="font-semibold text-teal-600">Gemini</span>
          <span>&</span>
          <span className="font-semibold text-purple-600">ElevenLabs</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-teal-100 rounded-full">
              <Bot className="h-5 w-5 text-teal-600" />
            </div>
            <Card className="flex-1 border-0 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {isProcessingVoice ? (
                    <>
                      <Loader2 className="h-4 w-4 text-purple-500 animate-spin" />
                      <span className="text-sm text-gray-600">Processing your speech...</span>
                    </>
                  ) : (
                    <>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isSpeaking && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm animate-pulse">
              <Volume2 className="h-4 w-4" />
              <span>Speaking...</span>
              <button onClick={stopSpeaking} className="ml-1 hover:text-purple-900 underline text-xs">Stop</button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

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

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (isSpeaking) stopSpeaking();
            setTtsEnabled(prev => !prev);
          }}
          title={ttsEnabled ? "Disable voice responses" : "Enable voice responses"}
          className={`shrink-0 ${ttsEnabled ? 'border-purple-300 text-purple-600 hover:bg-purple-50' : 'text-gray-400'}`}
        >
          {ttsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>

        <Input
          placeholder="Ask about credit cards, cashback strategies, or benefits..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
          disabled={isLoading}
          className="border-gray-200 focus:border-teal-500 focus:ring-teal-500"
        />

        <Button
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          disabled={isProcessingVoice || chatMutation.isPending}
          title={isRecording ? "Stop recording" : "Start voice input"}
          className={`shrink-0 transition-all ${isRecording
            ? 'bg-red-500 border-red-500 text-white hover:bg-red-600 animate-pulse'
            : 'border-gray-200 text-gray-600 hover:bg-teal-50 hover:border-teal-300'
            }`}
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>

        <Button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-teal-500 hover:bg-teal-600 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        {isRecording
          ? "Recording... tap the mic again to stop"
          : "Tap the mic to speak, or type your question"}
      </p>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`p-2 rounded-full shrink-0 ${message.isUser ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-600'}`}>
        {message.isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>

      <Card className={`flex-1 max-w-[80%] border-0 ${message.isUser ? 'bg-teal-500 text-white' : 'bg-gray-50'}`}>
        <CardContent className="p-4">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <p className={`text-xs mt-2 ${message.isUser ? 'text-teal-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
