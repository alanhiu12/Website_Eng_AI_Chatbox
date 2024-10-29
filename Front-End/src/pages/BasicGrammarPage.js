import React from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const grammarTopics = [
  { title: "Nouns", description: "Names of people, places, things, or ideas." },
  { title: "Pronouns", description: "Words that replace nouns (e.g., he, she, it)." },
  { title: "Verbs", description: "Action or state of being (e.g., run, is)." },
  { title: "Adjectives", description: "Words that describe nouns (e.g., blue, quick)." },
  { title: "Adverbs", description: "Words that modify verbs, adjectives, or other adverbs (e.g., quickly, very)." },
  { title: "Prepositions", description: "Words that show relationships (e.g., in, on, by)." },
  { title: "Conjunctions", description: "Words that connect clauses or sentences (e.g., and, but, or)." },
  { title: "Interjections", description: "Words used to express emotion (e.g., wow, ouch)." }
];

const BasicGrammarPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Basic Grammar Rules
      </Typography>
      <Typography variant="body1" paragraph>
        Learn the essential grammar rules to strengthen your English foundation.
      </Typography>
      <List>
        {grammarTopics.map((topic, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h6">{topic.title}</Typography>
              <Typography variant="body2">{topic.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default BasicGrammarPage;
