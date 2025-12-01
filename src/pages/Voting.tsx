import { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Avatar } from '@mui/material';
import { useGame } from '../context/GameContext';
import PersonIcon from '@mui/icons-material/Person';

const VotingPage = () => {
    const { players, submitVote, setGamePhase } = useGame();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

    const handleVote = () => {
        if (selectedPlayerId) {
            // In a real networked game, we'd collect all votes.
            // Here, we simulate a collective decision or just check if the selected person is the spy.
            // For simplicity in this local version, we'll treat this as the "Group's Decision".

            // We pass the voted ID to the results phase via state or context if needed, 
            // but for now let's just transition and maybe store the winner in context?
            // Actually, let's just pass the result to the next screen or store it in a temp state.
            // I'll modify context to store 'winner' or 'votedSuspectId'.

            // For now, let's hack it: we'll just set the phase to results. 
            // Ideally, we should update the context to store the vote result.
            // I'll assume the context *could* handle it, but I'll just pass it via a simple prop or 
            // just let the Results page handle the logic if I store the "votedId" in context.

            // Let's update context to store "votedSuspectId"
            // Wait, I didn't add that to context. I'll add a simple state here or just modify context later.
            // Actually, I can just use a local storage or pass it? No, context is best.
            // I'll add `setVotedSuspectId` to context in a future step if needed, 
            // but for now I'll just use a simple hack: 
            // I will add a `votedPlayerId` to the GameContext in the next step or just use `submitVote` to store it.

            submitVote('group', selectedPlayerId); // Using 'group' as voterId for this local version
            setGamePhase('results');
        }
    };

    return (
        <Box textAlign="center">
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
                Who is the Spy?
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
                                gap: 1
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
