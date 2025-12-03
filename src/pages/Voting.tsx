import { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Avatar, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import PersonIcon from '@mui/icons-material/Person';

const VotingPage = () => {
    const { players, submitVote, currentVoterIndex } = useGame();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
    const [isReadyToVote, setIsReadyToVote] = useState(false);

    const currentVoter = players[currentVoterIndex];

    const handleVote = () => {
        if (selectedPlayerId) {
            submitVote(currentVoter.id, selectedPlayerId);
            setSelectedPlayerId(null);
            setIsReadyToVote(false);
        }
    };

    if (!isReadyToVote) {
        return (
            <Stack spacing={4} alignItems="center" textAlign="center" sx={{ height: '100%', justifyContent: 'center' }}>
                <Box>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Vote {currentVoterIndex + 1} of {players.length}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                        Pass to {currentVoter.name}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsReadyToVote(true)}
                    fullWidth
                    sx={{ py: 2, fontSize: '1.2rem' }}
                >
                    I am {currentVoter.name}
                </Button>
            </Stack>
        );
    }

    return (
        <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, mb: 1 }}>
                {currentVoter.name}, who is the spy?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Select the player you suspect.
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                {players.map((player) => (
                    <Grid item xs={6} key={player.id}>
                        <Paper
                            elevation={0}
                            onClick={() => setSelectedPlayerId(player.id)}
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                border: selectedPlayerId === player.id ? '2px solid #00e5ff' : '2px solid transparent',
                                backgroundColor: selectedPlayerId === player.id ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                opacity: player.id === currentVoter.id ? 0.5 : 1,
                                pointerEvents: player.id === currentVoter.id ? 'none' : 'auto'
                            }}
                        >
                            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                                <PersonIcon fontSize="large" />
                            </Avatar>
                            <Typography variant="h6">{player.name}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!selectedPlayerId}
                onClick={handleVote}
                fullWidth
                sx={{ py: 2 }}
            >
                Confirm Vote
            </Button>
        </Box>
    );
};

export default VotingPage;
