import React, { useState, useEffect } from 'react';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  "In the middle of difficulty lies opportunity. Albert Einstein's famous quote reminds us to look for potential in adversity. It’s how we respond to challenges that defines our success.",
  "Typing speed is a critical skill in the digital age. By practicing daily, we can enhance both our speed and accuracy. This leads to more efficient communication and productivity.",
  "Technology is advancing at a rapid pace. Innovations in AI, machine learning, and cloud computing have changed the way we live and work. Staying up-to-date with these changes is crucial."
];

const TypingTestApp = () => {
  const [currentText, setCurrentText] = useState(sampleTexts[0]);
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (inputText === currentText) {
      const endTime = new Date().getTime();
      const durationInMinutes = (endTime - startTime) / 60000;
      const words = currentText.split(" ").length;
      setWpm(Math.round(words / durationInMinutes));
      calculateAccuracy();
      setIsComplete(true);
    }
  }, [inputText]);

  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    setInputText(e.target.value);
  };

  const calculateAccuracy = () => {
    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === currentText[i]) {
        correctChars++;
      }
    }
    const calculatedAccuracy = Math.round((correctChars / currentText.length) * 100);
    setAccuracy(calculatedAccuracy);
  };

  const resetTest = () => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    setCurrentText(sampleTexts[randomIndex]); // Set new random sample text
    setInputText("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", padding: "16px" }}>
      <div style={{ maxWidth: "600px", width: "100%", padding: "24px", backgroundColor: "#ffffff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "16px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "24px" }}>Typing Speed Test</h1>
        <p style={{ fontSize: "18px", padding: "16px", backgroundColor: "#f9fafb", borderRadius: "8px", marginBottom: "16px" }}>
          {currentText.split("").map((char, index) => (
            <span key={index} style={{ fontFamily: "monospace", color: inputText[index] === char ? "#16a34a" : inputText[index] ? "#dc2626" : "#6b7280" }}>
              {char}
            </span>
          ))}
        </p>
        <textarea
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", border: "2px solid #d1d5db", marginBottom: "16px" }}
          placeholder="Start typing here..."
          value={inputText}
          onChange={handleInputChange}
          disabled={isComplete}
        ></textarea>
        {isComplete && (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>Typing Speed: {wpm} WPM</p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>Accuracy: {accuracy}%</p>
          </div>
        )}
        <button
          style={{ width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          onClick={resetTest}
        >
          {isComplete ? "Retake Test with New Text" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default TypingTestApp;
