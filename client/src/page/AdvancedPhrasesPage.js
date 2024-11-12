import React from 'react';
import { Container, Typography, Card, CardContent, List } from '@mui/material';

const advancedPhrases = [
    {
        phrase: "Break the ice",
        meaning: "To initiate conversation in a social setting.",
        example: "He told a joke to break the ice at the party."
    },
    {
        phrase: "Hit the nail on the head",
        meaning: "To say something exactly right.",
        example: "When she guessed the issue, she hit the nail on the head."
    },
    {
        phrase: "Bite off more than you can chew",
        meaning: "To take on more responsibility than one can handle.",
        example: "He realized he bit off more than he could chew when he agreed to lead the project alone."
    },
    {
        phrase: "Burning the midnight oil",
        meaning: "To work late into the night.",
        example: "She's been burning the midnight oil to finish her thesis."
    },
    {
        phrase: "A blessing in disguise",
        meaning: "Something that seems bad at first but has a positive outcome.",
        example: "Losing that job was a blessing in disguise – it led me to my true passion."
    },
    {
        phrase: "Once in a blue moon",
        meaning: "An event that occurs very rarely.",
        example: "They go out for dinner only once in a blue moon."
    },
    {
        phrase: "Under the weather",
        meaning: "Feeling ill or unwell.",
        example: "I'm feeling a bit under the weather, so I’ll stay home today."
    }
];

const AdvancedPhrasesPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Advanced Phrases
            </Typography>
            <Typography variant="body1" paragraph>
                Master these advanced phrases to enhance your conversational skills.
            </Typography>
            <List>
                {advancedPhrases.map((item, index) => (
                    <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h6">{item.phrase}</Typography>
                            <Typography variant="body2"><strong>Meaning:</strong> {item.meaning}</Typography>
                            <Typography variant="body2"><strong>Example:</strong> {item.example}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

export default AdvancedPhrasesPage;