import React from 'react';
import { Container, Typography, Card, CardContent, List, ListItem } from '@mui/material';

const pronunciationTips = [
  {
    tip: "Listen and Repeat",
    description: "Listen carefully to native speakers, then repeat what they say. Focus on the sounds they make and try to mimic their pronunciation.",
  },
  {
    tip: "Practice Individual Sounds",
    description: "Some sounds in English don’t exist in other languages. Practice difficult sounds like 'th,' 'v,' and 'r' to improve clarity.",
  },
  {
    tip: "Use Minimal Pairs",
    description: "Practice words with similar sounds, such as 'ship' and 'sheep' or 'bat' and 'bet,' to get better at distinguishing between them.",
  },
  {
    tip: "Focus on Word Stress",
    description: "In English, certain syllables are stressed more than others. Practice emphasizing the correct syllables in words, like 'preSENT' (verb) and 'PREsent' (noun).",
  },
  {
    tip: "Use a Mirror",
    description: "Watching your mouth movements in a mirror can help you see how to form sounds correctly. This is especially helpful for difficult consonants.",
  },
  {
    tip: "Record Yourself",
    description: "Record yourself speaking and listen to the playback. Comparing your pronunciation to native speakers can help you identify areas for improvement.",
  },
];

const PronunciationTipsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pronunciation Tips
      </Typography>
      <Typography variant="body1" paragraph>
        Here are some practical tips to help you improve your English pronunciation.
      </Typography>
      <List>
        {pronunciationTips.map((item, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h6">{item.tip}</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default PronunciationTipsPage;
