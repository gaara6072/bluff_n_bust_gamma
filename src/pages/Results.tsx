
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import ReplayIcon from '@mui/icons-material/Replay';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const ResultsPage = () => {
    const { players, suspectId, votedSuspectId, resetGame } = useGame();

    const suspect = players.find((p) => p.id === suspectId);
    const votedPlayer = players.find((p) => p.id === votedSuspectId);

    const civiliansWin = votedSuspectId === suspectId;

    return (
        <Stack spacing={4} alignItems="center" textAlign="center">
            <Box>
                <Typography variant="h2" gutterBottom sx={{
                    fontWeight: 900,
                    background: civiliansWin
                        ? 'linear-gradient(45deg, #00e5ff, #00b8d4)'
                        : 'linear-gradient(45deg, #ff0055, #ff4081)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    {civiliansWin ? 'Civilians Win!' : 'Spy Wins!'}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {civiliansWin
                        ? 'The spy has been caught!'
                        : 'The spy escaped detection!'}
                </Typography>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    width: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            The Group Voted For
                        </Typography>
                        <Typography variant="h5" color={civiliansWin ? 'success.main' : 'error.main'}>
                            {votedPlayer?.name || 'No one'}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            The Real Spy Was
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff0055' }}>
                            {suspect?.name}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            <Box>
                {civiliansWin ? (
                    <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffd700', mb: 2 }} />
                ) : (
                    <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, color: '#ff0055', mb: 2 }} />
                )}
            </Box>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ReplayIcon />}
                onClick={resetGame}
                fullWidth
                sx={{ py: 2 }}
            >
                Play Again
            </Button>
        </Stack>
    );
};

export default ResultsPage;
