import { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'civilian' | 'suspect';

export type GamePhase = 'setup' | 'reveal' | 'discuss' | 'vote' | 'results';

export interface Player {
    id: string;
    name: string;
    role: Role;
}

interface GameContextType {
    players: Player[];
    gamePhase: GamePhase;
    secretWord: string;
    suspectId: string | null;
    currentPlayerIndex: number; // For role reveal phase
    votedSuspectId: string | null;
    addPlayer: (name: string) => void;
    removePlayer: (id: string) => void;
    startGame: (word: string) => void;
    nextPlayer: () => void;
    startVoting: () => void;
    submitVote: (voterId: string, votedForId: string) => void;
    resetGame: () => void;
    setGamePhase: (phase: GamePhase) => void;
    initializeGame: (names: string[], word: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
    const [secretWord, setSecretWord] = useState<string>('');
    const [suspectId, setSuspectId] = useState<string | null>(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [votedSuspectId, setVotedSuspectId] = useState<string | null>(null);

    const addPlayer = (name: string) => {
        debugger;
        const newPlayer: Player = {
            id: crypto.randomUUID(),
            name,
            role: 'civilian', // Default, assigned later
        };
        setPlayers((prev) => [...prev, newPlayer]);
        console.log(players);
    };

    const removePlayer = (id: string) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
    };

    const startGame = (word: string) => {
        debugger;
        if (players.length < 3) {
            alert('Need at least 3 players!');
            return;
        }

        // Assign roles
        const suspectIndex = Math.floor(Math.random() * players.length);
        const updatedPlayers = players.map((p, index) => ({
            ...p,
            role: (index === suspectIndex ? 'suspect' : 'civilian') as Role,
        }));

        setPlayers(updatedPlayers);
        setSuspectId(updatedPlayers[suspectIndex].id);
        setSecretWord(word);
        setCurrentPlayerIndex(0);
        setGamePhase('reveal');
    };

    const nextPlayer = () => {
        if (currentPlayerIndex < players.length - 1) {
            setCurrentPlayerIndex((prev) => prev + 1);
        } else {
            setGamePhase('discuss');
        }
    };

    const startVoting = () => {
        setGamePhase('vote');
    };

    const submitVote = (_voterId: string, votedForId: string) => {
        setVotedSuspectId(votedForId);
    };

    const resetGame = () => {
        setPlayers([]);
        setGamePhase('setup');
        setSecretWord('');
        setSuspectId(null);
        setVotedSuspectId(null);
        setCurrentPlayerIndex(0);
    };

    const initializeGame = (names: string[], word: string) => {
        if (names.length < 3) {
            alert('Need at least 3 players!');
            return;
        }

        // Create players
        const newPlayers: Player[] = names.map(name => ({
            id: crypto.randomUUID(),
            name,
            role: 'civilian',
        }));

        // Assign roles
        const suspectIndex = Math.floor(Math.random() * newPlayers.length);
        const updatedPlayers = newPlayers.map((p, index) => ({
            ...p,
            role: (index === suspectIndex ? 'suspect' : 'civilian') as Role,
        }));

        // Batch updates
        setPlayers(updatedPlayers);
        setSuspectId(updatedPlayers[suspectIndex].id);
        setSecretWord(word);
        setCurrentPlayerIndex(0);
        setGamePhase('reveal');
    };

    return (
        <GameContext.Provider
            value={{
                players,
                gamePhase,
                secretWord,
                suspectId,
                currentPlayerIndex,
                votedSuspectId,
                addPlayer,
                removePlayer,
                startGame,
                nextPlayer,
                startVoting,
                submitVote,
                resetGame,
                setGamePhase,
                initializeGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
