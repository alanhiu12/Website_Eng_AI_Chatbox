import React from 'react';
import { Container, Typography, Card, CardContent, List } from '@mui/material';

const vocabularyWords = [
    { word: "Abundant", definition: "Present in large quantities." },
    { word: "Benevolent", definition: "Well-meaning and kindly." },
    { word: "Candid", definition: "Truthful and straightforward." },
    { word: "Diligent", definition: "Showing care in one's work or duties." },
    { word: "Eccentric", definition: "Unconventional and slightly strange." },
    { word: "Facilitate", definition: "To make an action or process easier." },
    { word: "Gregarious", definition: "Fond of company; sociable." },
    { word: "Harbinger", definition: "A person or thing that announces or signals the approach of another." }
];

const IntermediateVocabularyPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Intermediate Vocabulary
            </Typography>
            <Typography variant="body1" paragraph>
                Expand your vocabulary with these intermediate-level words and their definitions.
            </Typography>
            <List>
                {vocabularyWords.map((vocab, index) => (
                    <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h6">{vocab.word}</Typography>
                            <Typography variant="body2">{vocab.definition}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

export default IntermediateVocabularyPage;