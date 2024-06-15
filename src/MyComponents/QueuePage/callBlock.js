import { VStack, Box, Button, Text, HStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const CallBlock = ({ slotNo, onDone, uniqueId, startTimeStamp }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [donePressed, setDonePressed] = useState(false);
  const [undoPressed, setUndoPressed] = useState(false);

  useEffect(() => {
    let timer;
    let countdownTimer;
  
    if (!donePressed) {
      // Calculate elapsed time based on start timestamp
      const currentTimeStamp = Date.now();
      const differenceInSeconds = Math.floor((currentTimeStamp - startTimeStamp) / 1000);
      const initialElapsedTime = Math.max(0, differenceInSeconds);
  
      setElapsedTime(initialElapsedTime);
  
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      countdownTimer = setTimeout(() => {
        if (!undoPressed) {
          onDone(); // Call onDone only if undo is not pressed within 10 seconds
        }
        setDonePressed(false);
        setUndoPressed(false);
        setCountdown(0);
      }, 10000);
    }
  
    return () => {
      clearInterval(timer);
      clearTimeout(countdownTimer);
    };
  }, [donePressed, undoPressed, onDone, startTimeStamp]);
  

  useEffect(() => {
    if (donePressed && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [donePressed, countdown]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleDone = () => {
    setDonePressed(true);
    setCountdown(10);
  };

  const handleUndo = () => {
    setDonePressed(false);
    setCountdown(0);
  };

  return (
    <VStack
      className={`call-block ${countdown > 0 ? 'blurred' : ''}`}
      // spacing={2}
      bg={'white'}
      paddingInline={10}
      pb={10}
      pt={4}
      height={['65vw','38vw','35vw','30vw']}
      justify={'space-between'}
      borderRadius={'3xl'}
      // boxShadow="8px 8px 19.5px 0px rgba(0, 0, 0, 0.25)"
      boxShadow={'xl'}
      transition="filter 0.3s ease-in-out"
      filter={countdown > 0 ? 'blur(3px)' : 'none'}
    >
      <Text fontSize={['4rem','5rem','5.5rem','8xl']} mt={3} color="#1F3453" fontWeight="bold">
        {slotNo}
      </Text>
      <HStack width={'100%'} justifyContent={'space-between'} alignItems="center">
        <Box className="timer" color="#C60000" fontSize="3xl" textAlign="center">
          {countdown > 0 ? formatTime(countdown) : formatTime(elapsedTime)}
        </Box>
        {countdown > 0 ? (
          <Button className="undoButton" onClick={handleUndo} fontSize="lg" size={'lg'}color="white" borderRadius="xl" backgroundColor="#1F3453">
            Undo
          </Button>
        ) : (
          <Button className="doneButton" onClick={handleDone} size={'lg'} fontSize={'2xl'} fontWeight={'normal'} color="white" backgroundColor="#F7921C" borderRadius="xl" _hover={{ backgroundColor: '#e6811b' }}>
            Done
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default CallBlock;
