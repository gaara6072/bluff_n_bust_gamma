import { useState } from 'react';
import { Button, Typography, Paper, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RoleRevealPage = () => {
    const { players, currentPlayerIndex, secretWord, nextPlayer } = useGame();
    const [isRevealed, setIsRevealed] = useState(false);

    const currentPlayer = players[currentPlayerIndex];
    const isSuspect = currentPlayer.role === 'suspect';

    const handleNext = () => {
        setIsRevealed(false);
        nextPlayer();
    };

    return (
        <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" gutterBottom>
                Pass the phone to
            </Typography>

            <Typography variant="h2" color="primary" sx={{ fontWeight: 800, mb: 4 }}>
                {currentPlayer.name}
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    width: '100%',
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: isRevealed
                        ? (isSuspect ? 'rgba(255, 0, 85, 0.1)' : 'rgba(0, 229, 255, 0.1)')
                        : 'rgba(255, 255, 255, 0.05)',
                    border: isRevealed
                        ? (isSuspect ? '1px solid #ff0055' : '1px solid #00e5ff')
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                {!isRevealed ? (
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<VisibilityIcon />}
                        onClick={() => setIsRevealed(true)}
                        sx={{ fontSize: '1.2rem', py: 2, px: 4 }}
                    >
                        Tap to Reveal Role
                    </Button>
                ) : (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h6" color="text.secondary">
                            Your Secret Word is:
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: 2 }}>
                            {isSuspect ? 'YOU ARE THE SPY' : secretWord}
                        </Typography>

                        {isSuspect && (
                            <Typography variant="body1" color="secondary">
                                Try to blend in and guess the word!
                            </Typography>
                        )}

                        <Button
                            startIcon={<VisibilityOffIcon />}
                            onClick={() => setIsRevealed(false)}
                            color="inherit"
                            sx={{ mt: 2 }}
                        >
                            Hide
                        </Button>
                    </Stack>
                )}
            </Paper>

            {isRevealed && (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={handleNext}
                    fullWidth
                    sx={{ py: 2 }}
                >
                    {currentPlayerIndex < players.length - 1 ? 'Next Player' : 'Start Game'}
                </Button>
            )}
        </Stack>
    );
};

export default RoleRevealPage;
