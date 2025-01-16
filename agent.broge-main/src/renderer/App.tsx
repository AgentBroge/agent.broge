import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  Heading,
  Link,
  Switch,
  VStack,
  extendTheme,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaGithub, FaStop, FaTrash } from 'react-icons/fa';
import { HiMinus, HiX } from 'react-icons/hi';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { useDispatch } from 'zutron';
import { useStore } from './hooks/useStore';
import { RunHistory } from './RunHistory';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'white',
        bg: '#040B1D',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        color: 'white',
      },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: 'whiteAlpha.200',
          _checked: {
            bg: '#2073F1',
          },
        },
      },
    },
  },
});

function Main() {
  const dispatch = useDispatch(window.zutron);
  const {
    instructions: savedInstructions,
    fullyAuto,
    running,
    error,
    runHistory,
  } = useStore();
  const [localInstructions, setLocalInstructions] = React.useState(
    savedInstructions ?? '',
  );
  const toast = useToast();

  const startRun = () => {
    dispatch({ type: 'SET_INSTRUCTIONS', payload: localInstructions });
    dispatch({ type: 'RUN_AGENT', payload: null });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      startRun();
    }
  };

  return (
    <Box
      position="relative"
      w="100%"
      h="100vh"
      p={4}
      bg="#040B1D"
      color="white"
      sx={{
        '-webkit-app-region': 'drag',
      }}
    >
      <Box position="absolute" top={2} left={6}>
        <Heading
          fontFamily="Garamond, serif"
          fontWeight="hairline"
          color="white"
        >
          Agent.Broge
        </Heading>
      </Box>

      <HStack
        position="absolute"
        top={2}
        right={2}
        spacing={0}
        sx={{
          '-webkit-app-region': 'no-drag',
        }}
      >
        <Link href="https://github.com/AgentBroge/Agent.Broge" isExternal>
          <Button
            variant="ghost"
            size="sm"
            aria-label="GitHub"
            minW={8}
            p={0}
            color="white"
          >
            <FaGithub />
          </Button>
        </Link>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => window.electron.windowControls.minimize()}
          minW={8}
          p={0}
          color="white"
        >
          <HiMinus />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => window.electron.windowControls.close()}
          minW={8}
          p={0}
          color="white"
        >
          <HiX />
        </Button>
      </HStack>

      <VStack
        spacing={4}
        align="center"
        h="100%"
        w="100%"
        pt={16}
        sx={{
          '& > *': {
            '-webkit-app-region': 'no-drag',
          },
        }}
      >
        <Box
          as="textarea"
          placeholder="What can I do for you today?"
          width="100%"
          height="auto"
          minHeight="48px"
          p={4}
          borderRadius="16px"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
          color="white"
          bg="rgba(255, 255, 255, 0.05)"
          verticalAlign="top"
          resize="none"
          overflow="hidden"
          sx={{
            '-webkit-app-region': 'no-drag',
            transition: 'box-shadow 0.2s, border-color 0.2s',
            _hover: {
              boxShadow: '0 2px 8px rgba(32, 115, 241, 0.1)',
            },
            _focus: {
              borderColor: '#2073F1',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(32, 115, 241, 0.2)',
            },
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          }}
          value={localInstructions}
          disabled={running}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setLocalInstructions(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={handleKeyDown}
        />
        <HStack justify="space-between" align="center" w="100%" color="white">
          <HStack spacing={2}>
            <Switch
              isChecked={fullyAuto}
              onChange={(e) => {
                toast({
                  description:
                    "Whoops, automatic mode isn't actually implemented yet. 😬",
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            />
            <Box>Full Auto</Box>
          </HStack>
          <HStack>
            {running && <Spinner size="sm" color="#2073F1" mr={2} />}
            {!running && runHistory.length > 0 && (
              <Button
                bg="transparent"
                fontWeight="normal"
                color="rgba(255, 255, 255, 0.9)" // Updated color for trash icon
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#2073F1',
                  boxShadow: '0 1px 4px rgba(32, 115, 241, 0.1)',
                }}
                _focus={{
                  boxShadow: '0 1px 4px rgba(32, 115, 241, 0.1)',
                  outline: 'none',
                }}
                borderRadius="12px"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.2)"
                onClick={() => dispatch('CLEAR_HISTORY')}
                aria-label="Clear history"
              >
                <FaTrash />
              </Button>
            )}
            <Button
              bg="transparent"
              fontWeight="normal"
              color="rgba(255, 255, 255, 0.9)" // Updated color for button text
              _hover={{
                bg: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#2073F1',
                boxShadow: '0 1px 4px rgba(32, 115, 241, 0.1)',
              }}
              _focus={{
                boxShadow: '0 1px 4px rgba(32, 115, 241, 0.1)',
                outline: 'none',
              }}
              borderRadius="12px"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              onClick={running ? () => dispatch('STOP_RUN') : startRun}
              isDisabled={!running && localInstructions?.trim() === ''}
            >
              {running ? <FaStop /> : "Let's Go"}
            </Button>
          </HStack>
        </HStack>

        {error && (
          <Box w="100%" color="#FF4444">
            {error}
          </Box>
        )}

        <Box flex="1" w="100%" overflow="auto">
          <RunHistory />
        </Box>
      </VStack>
    </Box>
  );
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#040B1D" minHeight="100vh">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
