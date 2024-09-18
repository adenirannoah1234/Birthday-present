import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Grid,
  useBreakpointValue,
  keyframes,
  BoxProps,
} from '@chakra-ui/react';
import { motion, MotionProps, useAnimation } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const MotionBox = motion<Omit<BoxProps, keyof MotionProps>>(
  React.forwardRef((props, ref) => <Box ref={ref} {...props} />)
);

const floatingAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const images = ['/temi1.jpg', '/temi2.jpg', '/couple.jpg', '/couple2.jpg'];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });

  useEffect(() => {
    audioRef.current = new Audio('/Gratitude.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error('Error playing audio:', e));
        controls.start({
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          transition: { duration: 2, repeat: Infinity },
        });
      } else {
        audioRef.current.pause();
        controls.stop();
      }
    }
  }, [isPlaying, controls]);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Box
      minHeight="100vh"
      bg="pink.50"
      p={8}
      position="relative"
      overflow="hidden"
      // mb={10}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: 'push' },
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#ff69b4' },
            links: {
              color: '#ff69b4',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 2,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />
      <VStack spacing={8} position="relative" zIndex={1}>
        <Heading
          as="h1"
          size="1xl"
          color="pink.500"
          animation={`${floatingAnimation} 3s ease-in-out infinite`}
        >
          Happy Birthday Amope!
        </Heading>

        <Grid
          templateColumns={`repeat(${gridColumns}, 1fr)`}
          gap={6}
          width="100%"
        >
          {images.map((src, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={src}
                alt={`Love Story Image ${index + 1}`}
                borderRadius="md"
                width="100%"
                height="auto"
                objectFit="cover"
                boxShadow="lg"
              />
            </MotionBox>
          ))}
        </Grid>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Text
            fontSize="xl"
            color="gray.700"
            textAlign="center"
            fontWeight="bold"
          >
            Happy birthday to the most beautiful soul I know! On this special
            day, I want to remind you just how much you mean to me. You are my
            light, my joy, and the reason my heart beats a little faster every
            time I see you. Every day with you feels like a blessing, and today,
            I celebrate the gift of you in my life. As you step into a new year,
            my love, I pray that God showers you with endless blessings, peace,
            and joy. May your heart overflow with love, and may your path be
            filled with success and happiness. I pray that every dream you’ve
            ever had becomes a reality and that you never face a day without
            knowing how deeply loved you are — by me and by everyone who’s lucky
            enough to know you. I thank God every day for bringing you into my
            life, and I ask that He continues to guide and protect you. May He
            bless you with good health, surround you with positivity, and grant
            you the desires of your heart. As you grow older, may your wisdom
            deepen, your beauty shine even brighter, and your spirit soar to new
            heights. You deserve every bit of happiness in the world, and I
            promise to spend my life making sure you feel cherished, adored, and
            supported. You are my world, and I am forever grateful to share this
            journey of life with you. Happy birthday, my love. Here’s to a year
            filled with love, laughter, and countless magical moments.
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Text
            fontSize="lg"
            color="purple.600"
            fontStyle="italic"
            textAlign="center"
          >
            I love you more than words can express. I want to spend every moment
            with you, to be your everything, and to cherish every moment we have
            together. I want to hold you close, to feel your warmth and to know
            that you are loved. I want to be your rock, your shelter, your safe
            haven, and your best friend. I want to be your confidant, your
            guide, your partner, and your soulmate. I want to be your light,
            your shine, your star, and your inspiration. I want to be your
            voice, your song, your story, and your heart. I want to be your
            love, your joy, your happiness, and your life.
          </Text>
        </MotionBox>

        <MotionBox animate={controls}>
          <Button
            colorScheme="pink"
            onClick={() => {
              setIsPlaying(!isPlaying);
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
            }}
            _hover={{ transform: 'scale(1.1)' }}
            transition="all 0.2s"
            mt={10}
          >
            {isPlaying ? 'Pause Music' : 'Click me for a surprise!'}
          </Button>
        </MotionBox>

        <Box position="absolute" bottom="20px">
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: showMessage ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text color="pink.500" fontWeight="bold">
              {isPlaying ? 'Enjoy your favorite song!' : 'Music paused'}
            </Text>
          </MotionBox>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
