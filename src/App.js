import React, { useState, useEffect } from "react";

// Get from local Storage............................................................

const getLocalItems = () => {
  let list = localStorage.getItem("studyPlannerSubjects");
  // console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("studyPlannerSubjects"));
  } else {
    return [];
  }
};

const App = () => {
  const [subjects, setSubjects] = useState(getLocalItems());
  const [subjectName, setSubjectName] = useState("");
  const [subjectHours, setSubjectHours] = useState("");

  // Set to local Storage.................................................................
  useEffect(() => {
    localStorage.setItem("studyPlannerSubjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    if (subjectName && subjectHours) {
      const newSubject = {
        id: subjects.length + 1,
        name: subjectName,
        hours: parseInt(subjectHours, 10),
      };

      setSubjects([...subjects, newSubject]);
      setSubjectName("");
      setSubjectHours("");
    }
  };

  const handleIncrementHours = (id) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === id ? { ...subject, hours: subject.hours + 1 } : subject
      )
    );
  };

  const handleDecrementHours = (id) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === id && subject.hours > 0
          ? { ...subject, hours: subject.hours - 1 }
          : subject
      )
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Study Planner</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Hours"
            value={subjectHours}
            onChange={(e) => setSubjectHours(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <button
            onClick={handleAddSubject}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Subject
          </button>
        </div>
        <div>
          {subjects.map((subject) => (
            <div key={subject.id} className="mb-4">
              <p>
                {subject.name} - {subject.hours} hours{" "}
                <button
                  onClick={() => handleIncrementHours(subject.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mx-2"
                >
                  +
                </button>
                <button
                  onClick={() => handleDecrementHours(subject.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
