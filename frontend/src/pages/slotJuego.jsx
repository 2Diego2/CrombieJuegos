import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexto/gameContext.jsx'; 
import './css/slotJuego.css';

// Componente QuestionSlotMachine
function QuestionSlotMachine({ onQuestionComplete, correctAnswers, difficulty }) {
    // 1. Estados Locales
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [spinningQuestions, setSpinningQuestions] = useState([]);
    
    // ✨ ESTADO PARA DATOS Y CARGA
    const [allQuestions, setAllQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Carga de Datos desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/preguntas'); 
                if (!response.ok) {
                    throw new Error(`Error en la carga: ${response.statusText}`);
                }
                const data = await response.json();
                setAllQuestions(data); // ✨ Guarda todos los datos en el estado
                setError(null);
            } catch (err) {
                console.error("No se pudo cargar la información del juego:", err);
                setError(err);
            } finally {
                setIsLoading(false); // ✨ Finaliza el estado de carga
            }
        };
        fetchData();
    }, []); // Se ejecuta una sola vez al montar el componente

    // Filtrar preguntas DESPUÉS de cargarse
    // Esto asegura que `questions` se actualice cuando `allQuestions` cambie
    const questions = allQuestions.filter(q => q.difficulty === difficulty);

    // 3. Lógica del Giro
    // Hemos movido la llamada a startSlotMachine para que se haga DENTRO de un useEffect 
    // que se dispara cuando los datos están listos.

    const startSlotMachine = () => {
        // La lógica de startSlotMachine se mantiene igual
        if (isSpinning || questions.length === 0) return;
        
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

    // ✨ 4. Efecto para Iniciar el Juego (depende de los datos)
    useEffect(() => {
        // Solo inicia la máquina si NO está cargando, NO hay error, y SÍ hay preguntas
        if (!isLoading && !error && questions.length > 0) {
            startSlotMachine();
        }
    }, [isLoading, error, difficulty]); // Se ejecuta al cargar los datos

    // 5. Lógica de Respuesta (se mantiene igual)
    const handleAnswerSelect = (answerIndex) => {
        if (selectedAnswer !== null || !currentQuestion) return;

        setSelectedAnswer(answerIndex);
        const correct = answerIndex === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        setTimeout(() => {
            onQuestionComplete(correct); 
        }, 2000);
    };


    // 6. Manejo de estados de Carga/Error en el JSX
    if (isLoading) {
        return <div className="p-10 text-center">Cargando preguntas de la API...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600">Error al cargar datos: {error.message}</div>;
    }
    
    if (questions.length === 0) {
        return <div className="p-10 text-center text-yellow-600">No hay preguntas para el nivel {difficulty}.</div>;
    }

    // 7. Retorno (JSX)
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Card contenedor */}
      <div className="card p-6 bg-card border-border">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-foreground">
            Slot Machine de Preguntas
          </h3>

          {isSpinning ? (
            <div className="space-y-4">
              <div className="text-center text-muted-foreground">
                Seleccionando pregunta...
              </div>
              <div className="grid grid-cols-1 gap-2">
                {spinningQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="p-3 bg-crombie-gradient-1 rounded-lg text-white text-center animate-pulse"
                  >
                    <div className="text-sm truncate">{question}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-accent rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-6">
              <div className="p-4 bg-crombie-gradient-3 rounded-lg">
                <h4 className="text-lg font-semibold text-white text-center text-balance">
                  {currentQuestion.question}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)} // Usa 'handleAnswerSelect'
                    disabled={selectedAnswer !== null}
                    className={`p-4 h-auto text-left justify-start transition-all duration-200 w-full border rounded-md ${
                      selectedAnswer === index
                        ? index === currentQuestion.correctAnswer
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-red-500 text-white border-red-500"
                        : selectedAnswer !== null &&
                          index === currentQuestion.correctAnswer
                        ? "bg-green-500 text-white border-green-500"
                        : "hover:bg-crombie-gradient-1 hover:text-white hover:border-transparent"
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="ml-2 text-pretty">{option}</span>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="text-center space-y-4">
                  <div
                    className={`text-2xl font-bold ${
                      isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isCorrect ? "¡Correcto!" : "Incorrecto"}
                  </div>
                  <div className="text-muted-foreground">
                    {isCorrect
                      ? `¡Excelente! Llevas ${correctAnswers + 1} respuesta${
                          correctAnswers + 1 !== 1 ? "s" : ""
                        } correcta${correctAnswers + 1 !== 1 ? "s" : ""}.`
                      : "No te preocupes, ¡inténtalo de nuevo!"}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={startSlotMachine}
                className="bg-crombie-gradient-2 hover:opacity-90 text-white font-bold px-6 py-3 rounded-md"
              >
                Iniciar Slot Machine
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Indicador de progreso */}
      <div className="card p-4 bg-card border-border">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progreso</span>
            <span>{correctAnswers}/3 respuestas correctas</span> {/* Usa 'correctAnswers' */}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-crombie-gradient-1 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(correctAnswers / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal SlotJuego
export default function SlotJuego() {
  const navigate = useNavigate();
  const { difficulty } = useGame(); // Usa la dificultad del Contexto
  
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 3;

  // Chequeo de dificultad
  useEffect(() => {
    if (!difficulty) {
      // Redirigir si se accede directamente
      navigate('/seleccion-dificultad'); 
    }
  }, [difficulty, navigate]);

  const handleQuestionComplete = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentRound >= maxRounds) {
      setTimeout(() => {
        navigate('/resultado', {
          state: {
            correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
            totalQuestions: maxRounds,
            difficulty: difficulty
          }
        });
      }, 2500);
    } else {
      setTimeout(() => {
        setCurrentRound(prev => prev + 1);
      }, 2500);
    }
  };

  if (!difficulty) {
    return <div className="loading-screen">Cargando juego o redirigiendo...</div>;
  }

  return (
    <div className="slot-juego-container">
      <div className="slot-header">
        <h1>Trivia - Nivel: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h1>
        <p>Ronda {currentRound} de {maxRounds}</p>
      </div>

      <QuestionSlotMachine
        key={currentRound}
        onQuestionComplete={handleQuestionComplete}
        correctAnswers={correctAnswers}
        difficulty={difficulty}
      />
    </div>
  );
}