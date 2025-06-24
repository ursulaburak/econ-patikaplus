import { useQuestion } from "../context/QuestionContext";
import InfoIcon from "@mui/icons-material/Info";

import Button from '@mui/material/Button';

function Start() {
  const { startQuestion } = useQuestion(); 

  return (
    <>
      <div className="start-info">
        <h1>Question App!</h1>
        <h2>Oyunun Kuralları</h2>
        <div className="rules">
          <p>
            <InfoIcon
              fontSize="small"
              style={{
                color: "green",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
            />{" "}
            Oyun 10 sorudan oluşmaktadır.
          </p>
          <p>
            <InfoIcon
              fontSize="small"
              style={{
                color: "green",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
            />{" "}
            Her soru için 30 saniye zamanınız vardır.
          </p>
          <p>
            <InfoIcon
              fontSize="small"
              style={{
                color: "green",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
            />{" "}
            Bir önceki soruya dönüş yapamazsınız.
          </p>
        </div>
        <Button 
          onClick={startQuestion} 
          variant="contained"
          sx={{
            fontSize: "19px",
            padding: "8px 20px",
            borderRadius: "10px",
            dropShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          OYUNA BAŞLAYIN
        </Button>
      </div>
    </>
  );
}

export default Start;
