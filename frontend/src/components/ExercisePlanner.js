import React, { useState } from "react";
import "../styles/ExercisePlanner.scss";
import DOMPurify from "dompurify";

const ExercisePlanner = () => {
  const [exercise, setExercise] = useState({
    name: "",
    weight: "",
    reps: "",
  });
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  // Sanitize Input
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise({ ...exercise, [name]: sanitizeInput(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !exercise.name ||
      !exercise.weight ||
      !exercise.reps ||
      isNaN(exercise.weight) ||
      isNaN(exercise.reps)
    ) {
      setError("All fields are required, and Weight/Reps must be numbers.");
      return;
    }

    setExercises([
      ...exercises,
      {
        name: sanitizeInput(exercise.name),
        weight: sanitizeInput(exercise.weight),
        reps: sanitizeInput(exercise.reps),
      },
    ]);
    setExercise({ name: "", weight: "", reps: "" });
    setError(""); // Clear any errors
  };

  return (
    <div className="center-container">
      <div className="planner-container">
        <h2>Exercise Planner</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={exercise.name}
            onChange={handleChange}
            required
            maxLength="50"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (lbs)"
            value={exercise.weight}
            onChange={handleChange}
            required
            min="1"
            max="1000"
          />
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={exercise.reps}
            onChange={handleChange}
            required
            min="1"
            max="100"
          />
          <button type="submit">Add Exercise</button>
        </form>
        {exercises.length > 0 && (
          <div className="exercise-list">
            <h3>Planned Exercises</h3>
            <ul>
              {exercises.map((ex, index) => (
                <li key={index}>
                  <span>{ex.name}</span> - <span>{ex.weight} lbs</span> -{" "}
                  <span>{ex.reps} reps</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePlanner;
