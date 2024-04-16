import './edu.css'
const educationDetails = [
    {
      year: "2021 - CURRENT",
      institution: "BSCSE, AMERICAN INTERNATIONAL UNIVERSITY - BANGLADESH",
      details: [
        "Majoring in Software and/or Hardware Engineering",
        "3.95 GPA (currently)",
        "Expected Graduation in 2024"
      ]
    },
    {
      year: "MAY/JUNE 2020",
      institution: "A LEVELS, BANGLADESH INTERNATIONAL SCHOOL (ENGLISH SECTION), JEDDAH",
      details: [
        "Mathematics: A",
        "Physics: A",
        "Information Technology: B"
      ]
    },
    {
      year: "MAY/JUNE 2018",
      institution: "IGCSE, BANGLADESH INTERNATIONAL SCHOOL (ENGLISH SECTION), JEDDAH",
      details: [
        "English: A",
        "Mathematics: A*",
        "Information Communication Technology: A",
        "Biology: A",
        "Chemistry: A*",
        "Physics: A*"
      ]
    }
  ];
  
  function Edu() {
    return (
      <div className='.education-container'>
        <h2>Education</h2>
        {educationDetails.map((education, index) => (
          <div key={index}>
            <h4>{education.year}</h4>
            <h4><u>{education.institution}</u></h4>
            <ul>
              {education.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
export default Edu