import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar,
  Fab,
  CircularProgress,
  Slide,
  useTheme,
  InputAdornment,
  Tooltip,
  Chip,
  Stack
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Send as SendIcon, 
  SmartToy as BotIcon,
  QuestionAnswer as ChatIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { geminiService, ChatMessage } from '../services/gemini.service';

// Example questions to suggest to users
const exampleQuestions = [
  "How to improve our interview process?",
  "Tips for evaluating candidate resumes",
  "Best practices for onboarding new employees",
  "How to reduce employee turnover?",
  "How to structure performance reviews?",
];

const Chatbot: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessage = {
    role: 'assistant',
    content: 'Hello! I\'m your HR assistant. How can I help you today? You can ask me about recruiting strategies, interview techniques, candidate evaluation, or any other HR-related questions.'
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([initialMessage]);
      // Reset error state when opening the chat
      setError(null);
      geminiService.resetChat();
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const resetChat = () => {
    geminiService.resetChat();
    setMessages([initialMessage]);
    setError(null);
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    setError(null);
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: input
    };
    
    const userInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await geminiService.sendMessage(userInput);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('There was an issue processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <Tooltip title="HR Assistant" placement="left">
        <Fab
          color="primary"
          aria-label="chat"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
          onClick={handleOpen}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>

      {/* Chatbot Dialog */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BotIcon />
              <Typography variant="h6">
                HR Assistant
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Reset chat">
                <IconButton size="small" onClick={resetChat} sx={{ color: 'white', mr: 1 }}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              p: 2,
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Example questions - only shown at the start */}
            {messages.length === 1 && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                  Try asking:
                </Typography>
                <Stack spacing={1}>
                  {exampleQuestions.map((question, index) => (
                    <Chip
                      key={index}
                      label={question}
                      onClick={() => handleExampleClick(question)}
                      size="small"
                      sx={{ 
                        background: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
            
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                }}
              >
                {message.role === 'assistant' && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    <BotIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 1.5,
                    background: message.role === 'user' 
                      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` 
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    overflowWrap: 'break-word',
                    maxWidth: '100%',
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                </Paper>
                {message.role === 'user' && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {/* User's initial */}
                    U
                  </Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  }}
                >
                  <BotIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <CircularProgress size={20} />
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  p: 1.5,
                  background: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  borderRadius: 2,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="caption" color="error">
                  {error} <IconButton size="small" onClick={resetChat} sx={{ ml: 1, p: 0 }}><RefreshIcon fontSize="inherit" /></IconButton>
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={handleSendMessage}
                      disabled={input.trim() === '' || loading}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default Chatbot; 