'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  products?: Product[]
  quickReplies?: string[]
}

interface Product {
  id: string
  name: string
  price: string
  description: string
  category: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Solitaire Diamond Ring',
    price: '$5,999',
    description: '1.5 carat round brilliant cut diamond, platinum setting',
    category: 'rings'
  },
  {
    id: '2',
    name: 'Diamond Eternity Band',
    price: '$3,499',
    description: '18K white gold band with 2 carats total weight',
    category: 'rings'
  },
  {
    id: '3',
    name: 'Diamond Tennis Necklace',
    price: '$8,999',
    description: '10 carat total weight, 18K white gold',
    category: 'necklaces'
  },
  {
    id: '4',
    name: 'Diamond Stud Earrings',
    price: '$4,299',
    description: '2 carat total weight, round brilliant cut',
    category: 'earrings'
  },
  {
    id: '5',
    name: 'Halo Diamond Engagement Ring',
    price: '$7,499',
    description: '2 carat center stone with halo, 18K rose gold',
    category: 'rings'
  },
  {
    id: '6',
    name: 'Diamond Tennis Bracelet',
    price: '$6,799',
    description: '5 carat total weight, classic design',
    category: 'bracelets'
  },
  {
    id: '7',
    name: 'Princess Cut Diamond Ring',
    price: '$6,499',
    description: '1.8 carat princess cut, platinum setting',
    category: 'rings'
  },
  {
    id: '8',
    name: 'Diamond Pendant Necklace',
    price: '$3,999',
    description: '1 carat solitaire pendant, 18K white gold chain',
    category: 'necklaces'
  }
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      addBotMessage(
        "✨ Welcome to Luxe Diamonds! I'm here to help you find the perfect diamond jewellery. How can I assist you today?",
        [
          "Show me engagement rings",
          "Browse necklaces",
          "View earrings",
          "What's on sale?",
          "Tell me about diamonds"
        ]
      )
    }, 500)
  }, [])

  const addBotMessage = (text: string, quickReplies?: string[], products?: Product[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies,
        products
      }
      setMessages(prev => [...prev, newMessage])
    }, 1000 + Math.random() * 1000)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase()

    // Greetings
    if (msg.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      addBotMessage(
        "Hello! 👋 Welcome to Luxe Diamonds. I'm excited to help you discover our stunning diamond collection. What are you looking for today?",
        [
          "Engagement rings",
          "Necklaces",
          "Earrings",
          "Bracelets",
          "Special occasions"
        ]
      )
    }
    // Engagement rings
    else if (msg.includes('engagement') || msg.includes('proposal')) {
      const rings = products.filter(p => p.category === 'rings')
      addBotMessage(
        "💍 Congratulations on your upcoming engagement! Here are our most popular engagement rings:",
        ["Tell me more", "Show other categories", "Price range options"],
        rings
      )
    }
    // Rings
    else if (msg.includes('ring')) {
      const rings = products.filter(p => p.category === 'rings')
      addBotMessage(
        "💎 Here's our exquisite collection of diamond rings:",
        ["Filter by price", "Show necklaces instead", "Diamond education"],
        rings
      )
    }
    // Necklaces
    else if (msg.includes('necklace') || msg.includes('pendant')) {
      const necklaces = products.filter(p => p.category === 'necklaces')
      addBotMessage(
        "✨ Our stunning diamond necklaces:",
        ["Show earrings", "Price details", "Customization options"],
        necklaces
      )
    }
    // Earrings
    else if (msg.includes('earring') || msg.includes('stud')) {
      const earrings = products.filter(p => p.category === 'earrings')
      addBotMessage(
        "💫 Beautiful diamond earrings perfect for any occasion:",
        ["Show bracelets", "Gift wrapping", "More details"],
        earrings
      )
    }
    // Bracelets
    else if (msg.includes('bracelet') || msg.includes('bangle')) {
      const bracelets = products.filter(p => p.category === 'bracelets')
      addBotMessage(
        "✨ Elegant diamond bracelets:",
        ["View rings", "Check availability", "Shipping info"],
        bracelets
      )
    }
    // Price/Budget
    else if (msg.includes('price') || msg.includes('cost') || msg.includes('budget') || msg.includes('expensive') || msg.includes('cheap') || msg.includes('affordable')) {
      addBotMessage(
        "Our diamond jewellery ranges from $3,499 to $8,999. We offer:\n\n💳 Flexible payment plans\n📦 Free shipping on orders over $5,000\n🎁 Complimentary gift wrapping\n✅ Certificate of authenticity\n\nWhat's your budget range?",
        ["Under $5,000", "$5,000 - $7,000", "Over $7,000", "Show all"]
      )
    }
    // Sale/Discount
    else if (msg.includes('sale') || msg.includes('discount') || msg.includes('offer') || msg.includes('deal')) {
      addBotMessage(
        "🎉 Great timing! We're currently offering:\n\n• 15% off on all tennis bracelets\n• Free sizing on engagement rings\n• Complimentary cleaning service for 1 year\n• Buy 2 get 10% off additional items\n\nWould you like to see our featured items?",
        ["Show sale items", "Browse all", "Subscribe for offers"]
      )
    }
    // Diamond education
    else if (msg.includes('diamond') || msg.includes('carat') || msg.includes('clarity') || msg.includes('cut') || msg.includes('4c')) {
      addBotMessage(
        "💎 Diamond Education:\n\nThe 4 C's of Diamonds:\n\n✨ Cut - Determines brilliance\n💎 Clarity - Internal purity\n⚖️ Carat - Weight measurement\n🎨 Color - Grade from D to Z\n\nAll our diamonds come with GIA certification. Would you like to learn more about a specific aspect?",
        ["Tell me about cuts", "Certification info", "View diamonds"]
      )
    }
    // Shipping
    else if (msg.includes('ship') || msg.includes('delivery') || msg.includes('tracking')) {
      addBotMessage(
        "📦 Shipping Information:\n\n✅ Free insured shipping on orders over $5,000\n🚚 Express delivery available (2-3 business days)\n🌍 International shipping to 50+ countries\n📍 Real-time tracking\n🔒 Fully insured transit\n\nWhere would you like to ship?",
        ["Domestic shipping", "International", "Express options"]
      )
    }
    // Returns/Warranty
    else if (msg.includes('return') || msg.includes('warranty') || msg.includes('guarantee') || msg.includes('refund')) {
      addBotMessage(
        "🛡️ Your Peace of Mind:\n\n✅ 30-day hassle-free returns\n💎 Lifetime warranty on craftsmanship\n🔧 Free resizing within 60 days\n✨ Annual professional cleaning\n📜 Certificate of authenticity\n\nWe stand behind every piece!",
        ["Browse products", "Contact support", "Store locations"]
      )
    }
    // Customization
    else if (msg.includes('custom') || msg.includes('personalize') || msg.includes('engrave') || msg.includes('design')) {
      addBotMessage(
        "✨ Custom Design Services:\n\n💍 Create your own unique piece\n✍️ Free engraving on all rings\n🎨 Work with our expert designers\n💎 Choose your own diamonds\n⏱️ 3-4 weeks production time\n\nWould you like to start a custom design consultation?",
        ["Yes, start consultation", "Show ready pieces", "Design examples"]
      )
    }
    // Gift
    else if (msg.includes('gift') || msg.includes('present') || msg.includes('birthday') || msg.includes('anniversary')) {
      addBotMessage(
        "🎁 Perfect Gift Ideas:\n\nOur most popular gifts:\n💝 Diamond studs - Classic & timeless\n💖 Pendant necklaces - Elegant daily wear\n✨ Tennis bracelets - Sophisticated charm\n\n🎀 All items include luxury gift packaging!\n\nWho's the lucky recipient?",
        ["For her", "For mom", "For wife", "Anniversary gift"]
      )
    }
    // Contact/Support
    else if (msg.includes('contact') || msg.includes('call') || msg.includes('email') || msg.includes('support') || msg.includes('help')) {
      addBotMessage(
        "📞 Contact Us:\n\n📧 Email: support@luxediamonds.com\n☎️ Phone: 1-800-DIAMONDS\n💬 Live Chat: Available 24/7\n📍 Visit our showrooms in NYC, LA, Miami\n\n🕐 Customer service hours: Mon-Sat 9AM-8PM EST\n\nHow else can I help you today?",
        ["Book appointment", "Store locations", "Browse products"]
      )
    }
    // Thanks
    else if (msg.includes('thank')) {
      addBotMessage(
        "You're very welcome! 😊 Is there anything else I can help you with today?",
        ["Browse more", "Check on order", "Ask a question"]
      )
    }
    // Goodbye
    else if (msg.match(/^(bye|goodbye|see you|thanks bye)/)) {
      addBotMessage(
        "Thank you for visiting Luxe Diamonds! ✨ We look forward to helping you find the perfect piece. Have a wonderful day! 💎",
        ["Browse more", "Contact us", "Visit again"]
      )
    }
    // Default
    else {
      addBotMessage(
        "I'd be happy to help you with that! Our specialties include:\n\n💍 Engagement & Wedding Rings\n📿 Diamond Necklaces\n💎 Earrings & Studs\n⌚ Bracelets & Bangles\n\nWhat would you like to explore?",
        [
          "Show all products",
          "Engagement rings",
          "Speak to expert",
          "Price information"
        ]
      )
    }
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue)
      getBotResponse(inputValue)
      setInputValue('')
    }
  }

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply)
    getBotResponse(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="container">
      <div className="chat-header">
        <div className="header-avatar">💎</div>
        <div className="header-info">
          <h1>Luxe Diamonds Assistant</h1>
          <p>Online • Here to help you find perfect jewellery</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>

              {message.products && message.products.length > 0 && (
                <div>
                  {message.products.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-name">{product.name}</div>
                      <div className="product-price">{product.price}</div>
                      <div className="product-desc">{product.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {message.quickReplies && message.quickReplies.length > 0 && (
                <div className="quick-replies">
                  {message.quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      className="quick-reply"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend} disabled={!inputValue.trim()}>
          Send
        </button>
      </div>
    </div>
  )
}
