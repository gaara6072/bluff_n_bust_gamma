import { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Stack } from '@mui/material';
import { useGame } from '../context/GameContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';

const SetupPage = () => {
    const { initializeGame, resetGame } = useGame();
    const [playerNames, setPlayerNames] = useState<string[]>(['', '', '']); // Start with 3 inputs
    const [word, setWord] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...playerNames];
        newNames[index] = value;
        setPlayerNames(newNames);
    };

    const handleAddInput = () => {
        setPlayerNames([...playerNames, '']);
    };

    const handleRemoveInput = (index: number) => {
        if (playerNames.length > 3) {
            const newNames = playerNames.filter((_, i) => i !== index);
            setPlayerNames(newNames);
        }
    };

    const handleStart = () => {
        const validNames = playerNames.filter(name => name.trim() !== '');
        if (validNames.length < 3) {
            alert('You need at least 3 players!');
            return;
        }
        if (!word.trim()) {
            alert('Please enter a secret word!');
            return;
        }

        resetGame(); // Clear any previous state
        initializeGame(validNames, word);
    };

    return (
        <Stack spacing={4}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" gutterBottom sx={{
                    background: 'linear-gradient(45deg, #00e5ff, #ff0055)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1
                }}>
                    Bluff n Bust
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Find the spy before time runs out!
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <Typography variant="h6">Secret Word</Typography>
                    <TextField
                        fullWidth
                        label="Enter the Secret Word"
                        variant="outlined"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        helperText="Don't let anyone see this!"
                    />
                </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Players ({playerNames.length})</Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={handleAddInput}
                            size="small"
                            variant="text"
                        >
                            Add Player
                        </Button>
                    </Box>

                    {playerNames.map((name, index) => (
                        <Box key={index} display="flex" gap={1}>
                            <TextField
                                fullWidth
                                label={`Player ${index + 1}`}
                                value={name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                placeholder="Enter name"
                            />
                            {playerNames.length > 3 && (
                                <IconButton onClick={() => handleRemoveInput(index)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </Stack>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleStart}
                startIcon={<PlayArrowIcon />}
                sx={{ py: 2, fontSize: '1.2rem' }}
            >
                Start Game
            </Button>
        </Stack>
    );
};

export default SetupPage;
