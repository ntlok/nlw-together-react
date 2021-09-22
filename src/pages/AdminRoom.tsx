import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import answedQuestion from "../assets/images/answer.svg";
import checkQuestion from "../assets/images/check.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/room.scss";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const history = useHistory();
  const [hightlightChange, setHighlightChange] = useState(false);
  const [checkedChange, setCheckedChange] = useState(false);

  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que deseja excluir esta pergunta?")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}/`).remove();
    }
  }

  async function handleCheckedQuestionAnswered(questionId: string) {

    setCheckedChange(!checkedChange);
    

    await database.ref(`/rooms/${roomId}/questions/${questionId}/`).update({
      isAnswered: checkedChange,
      isHighlighted: false
    });

    
  }

  async function handleHighlightQuestion(questionId: string) {

    setHighlightChange(!hightlightChange);

    await database.ref(`/rooms/${roomId}/questions/${questionId}/`).update({
      isHighlighted: hightlightChange
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isHoutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isChecked={question.isAnswered}
                isHighlight={question.isHighlighted}
              >
                { !question.isAnswered && (
                  <>
                    <button
                    type="submit"
                    onClick={() => handleCheckedQuestionAnswered(question.id)}
                    >
                      <img
                        src={checkQuestion}
                        alt="marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answedQuestion} alt="Dar destaque na pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="submit"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
