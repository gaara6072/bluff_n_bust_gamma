import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const GameplayPage = () => {
    const { startVoting } = useGame();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / 300) * 100;

    return (
        <Stack spacing={6} alignItems="center" textAlign="center">
            <Box>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                    Discuss!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Ask questions and find the spy.
                </Typography>
            </Box>

            <Box position="relative" display="inline-flex">
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={200}
                    thickness={2}
                    sx={{
                        color: timeLeft < 60 ? '#ff0055' : '#00e5ff',
                        filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.3))'
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" component="div" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<HowToVoteIcon />}
                onClick={startVoting}
                fullWidth
                sx={{ py: 2, fontSize: '1.2rem' }}
            >
                Vote Now
            </Button>
        </Stack>
    );
};

export default GameplayPage;
