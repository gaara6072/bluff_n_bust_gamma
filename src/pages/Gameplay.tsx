import { Box, Button, Typography, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const GameplayPage = () => {
    const { startVoting, questionOrder, currentQuestionerIndex, nextQuestionTurn, startNewRound } = useGame();

    const isCycleComplete = currentQuestionerIndex >= questionOrder.length;

    const getInstruction = () => {
        if (isCycleComplete) {
            return "Discussion finished! Time to vote.";
        }

        const asker = questionOrder[currentQuestionerIndex];
        const answerer = questionOrder[(currentQuestionerIndex + 1) % questionOrder.length];

        return (
            <>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {asker.name}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }}>
                    asks
                </Typography>
                <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold' }}>
                    {answerer.name}
                </Typography>
            </>
        );
    };

    return (
        <Stack spacing={6} alignItems="center" textAlign="center" sx={{ height: '100%', justifyContent: 'center' }}>
            <Box>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                    {isCycleComplete ? "Ready to Vote?" : "Question Round"}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {isCycleComplete
                        ? "Everyone has asked and answered."
                        : "Find the spy through your questions."}
                </Typography>
            </Box>

            <Box sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: 3,
                width: '100%',
                maxWidth: 400
            }}>
                {getInstruction()}
            </Box>

            {!isCycleComplete ? (
                <Button
                    variant="contained"
                    size="large"
                    onClick={nextQuestionTurn}
                    fullWidth
                    sx={{ py: 2, fontSize: '1.2rem' }}
                >
                    Next Question
                </Button>
            ) : (
                <Stack spacing={2} width="100%">
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={startNewRound}
                        fullWidth
                        sx={{ py: 2, fontSize: '1.2rem' }}
                    >
                        One More Round
                    </Button>
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
            )}
        </Stack>
    );
};

export default GameplayPage;
