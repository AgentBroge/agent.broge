import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from './hooks/useStore';
import { extractAction } from '../main/store/extractAction';

export function RunHistory() {
  const { runHistory } = useStore();

  const messages = runHistory
    .filter((m) => m.role === 'assistant')
    .map((m) => extractAction(m));

  useEffect(() => {
    const element = document.getElementById('run-history');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  if (runHistory.length === 0) return null;

  return (
    <Box
      id="run-history"
      w="100%"
      h="100%"
      bg="rgba(255, 255, 255, 0.03)"
      borderRadius="16px"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      p={4}
      overflow="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
          },
        },
      }}
    >
      {messages.map((action, index) => {
        const { type, ...params } = action.action;
        return (
          <Box
            key={index}
            mb={4}
            p={3}
            borderRadius="md"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            _hover={{
              borderColor: 'rgba(32, 115, 241, 0.3)',
              bg: 'rgba(255, 255, 255, 0.07)',
            }}
            transition="all 0.2s"
          >
            <Box mb={2} fontSize="sm" color="rgba(255, 255, 255, 0.8)">
              {action.reasoning}
            </Box>
            <Box
              fontFamily="monospace"
              color="#2073F1"
              bg="rgba(32, 115, 241, 0.1)"
              p={2}
              borderRadius="md"
              overflow="auto"
            >
              {type}({params ? JSON.stringify(params) : ''})
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
