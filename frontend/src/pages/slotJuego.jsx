import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/css/juego.css";   // ✅ Import del CSS puro

const questions = [
  {
    question: "¿Cuál es el lenguaje de programación más popular para desarrollo web frontend?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: 1,
  },
  {
    question: "¿Qué significa CSS?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Code Style Structure"],
    correctAnswer: 1,
  },
  {
    question: "¿Cuál es el protocolo estándar para transferir páginas web?",
    options: ["FTP", "SMTP", "HTTP", "TCP"],
    correctAnswer: 2,
  },
  {
    question: "¿Qué es React?",
    options: ["Una base de datos", "Una librería de JavaScript", "Un servidor web", "Un lenguaje de programación"],
    correctAnswer: 1,
  },
  {
    question: "¿Cuál es la extensión de archivo para TypeScript?",
    options: [".js", ".ts", ".jsx", ".tsx"],
    correctAnswer: 1,
  },
  {
    question: "¿Qué significa API?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Automated Program Interaction",
      "Application Process Integration",
    ],
    correctAnswer: 0,
  },
  {
    question: "¿Cuál es el puerto por defecto para HTTP?",
    options: ["443", "21", "80", "22"],
    correctAnswer: 2,
  },
  {
    question: "¿Qué es Node.js?",
    options: [
      "Un framework de CSS",
      "Un entorno de ejecución de JavaScript",
      "Una base de datos",
      "Un editor de código",
    ],
    correctAnswer: 1,
  },
];

export default function QuestionSlotMachine({ onQuestionComplete, correctAnswers }) {
  const navigate = useNavigate();

  const [isSpinning, setIsSpinning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [spinningQuestions, setSpinningQuestions] = useState([]);

  const startSlotMachine = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);

    const spinInterval = setInterval(() => {
      const randomQuestions = Array.from({ length: 3 }, () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex].question;
      });
      setSpinningQuestions(randomQuestions);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestion(questions[randomIndex]);
      setIsSpinning(false);
      setSpinningQuestions([]);
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onQuestionComplete(correct);
      if (correct && correctAnswers + 1 === 3) {
        navigate("/ganaste"); // 🚀 ejemplo de navegación al ganar
      }
    }, 2000);
  };

  useEffect(() => {
    startSlotMachine();
  }, []);

  return (
    <div className="slot-container">

      <div className="card">
        <h3>Slot Machine de Preguntas</h3>

        {isSpinning ? (
          <>
            <p className="loading">Seleccionando pregunta...</p>
            <div className="spin-list">
              {spinningQuestions.map((question, index) => (
                <div key={index} className="spin-item">{question}</div>
              ))}
            </div>
          </>
        ) : currentQuestion ? (
          <>
            <div className="question-box">
              {currentQuestion.question}
            </div>

            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`option-btn
                    ${selectedAnswer === index && index === currentQuestion.correctAnswer ? "correct" : ""}
                    ${selectedAnswer === index && index !== currentQuestion.correctAnswer ? "incorrect" : ""}
                  `}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </div>
            )}
          </>
        ) : (
          <button onClick={startSlotMachine} className="option-btn start-btn">
            Iniciar Slot Machine
          </button>
        )}
      </div>

      {/* Progreso */}
      <div className="card">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(correctAnswers / 3) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          {correctAnswers}3 respuestas correctas
        </p>
      </div>
    </div>
  );
}
