import { useQuestion } from "../context/QuestionContext";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  Paper,
} from "@mui/material";

function Result() {
  const { results, showAnswers, toggleShowAnswers } = useQuestion();

  // Count the number of correct answers
  const correctCount = results.filter((ques) => ques.correct).length;
  // Count the number of wrong answers
  const wrongCount = results.filter(
    (ques) => !ques.correct && ques.selected
  ).length;
  // Count the number of unanswered questions
  const emptyCount = results.filter((ques) => !ques.selected).length;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Test Completed!
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1">Correct: {correctCount}</Typography>
        <Typography variant="body1">Wrong: {wrongCount}</Typography>
        <Typography variant="body1">Unanswered: {emptyCount}</Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={toggleShowAnswers}
        fullWidth
        sx={{ mb: 3 }}
      >
        {showAnswers ? "Hide Answers" : "Show Answer Key"}
      </Button>

      <Collapse in={showAnswers}>
        <List>
          {results.map((result, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`Question: ${result.question}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Correct Answer: {result.correctAnswer}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color={result.correct ? "green" : "red"}
                      >
                        Your Answer: {result.selected || "Unanswered"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < results.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}

export default Result;
