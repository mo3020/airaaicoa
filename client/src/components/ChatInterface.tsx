import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAIResponse, type Product } from "@/lib/mockData";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  products?: Product[];
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "سلام! 👋 من دستیار هوشمند شما هستم. چطور می‌تونم در پیدا کردن محصولات بهتون کمک کنم؟",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const response = getAIResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: response.text,
        products: response.products,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-background border border-border rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">پشتیبان هوشمند</h3>
            <p className="text-xs opacity-80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              آنلاین
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-foreground border border-border rounded-tl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.products && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex gap-3 bg-background/50 p-2 rounded-lg border border-border/50 hover:bg-background transition-colors cursor-pointer group"
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                            <span className="text-xs text-muted-foreground mt-1">
                              {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <span className="text-[10px] opacity-50 block mt-2 text-left">
                    {msg.timestamp.toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-slate-800 border border-border rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-background border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="سوال خود را بپرسید..."
            className="bg-muted/50 border-border focus:ring-primary/20"
            autoFocus
          />
          <Button 
            onClick={handleSend} 
            size="icon"
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
