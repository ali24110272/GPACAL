document.addEventListener('DOMContentLoaded', () => {
    const numSemestersInput = document.getElementById('numSemesters');
    const semestersContainer = document.getElementById('semesters-container');
    const calculateBtn = document.getElementById('calculateBtn');
    const gpaResult = document.getElementById('gpa-result');
    const cgpaResult = document.getElementById('cgpa-result');

    // Event listener for number of semesters input
    numSemestersInput.addEventListener('input', () => {
        const numSemesters = parseInt(numSemestersInput.value);
        semestersContainer.innerHTML = '';

        if (numSemesters > 0 && numSemesters <= 8) {
            for (let i = 1; i <= numSemesters; i++) {
                addSemesterInput(i);
            }
        }
    });

    // Add input fields for each semester
    function addSemesterInput(semesterNum) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester-block', 'mb-4');

        semesterDiv.innerHTML = `
            <h4>Semester ${semesterNum}</h4>
            <div class="mb-3">
                <label for="numSubjects${semesterNum}" class="form-label">Enter number of subjects:</label>
                <input type="number" id="numSubjects${semesterNum}" class="form-control" placeholder="Number of subjects" required>
            </div>
            <div id="subject-container${semesterNum}"></div>
        `;

        semestersContainer.appendChild(semesterDiv);

        const numSubjectsInput = semesterDiv.querySelector(`#numSubjects${semesterNum}`);
        const subjectContainer = semesterDiv.querySelector(`#subject-container${semesterNum}`);

        // Add event listener to create subject inputs
        numSubjectsInput.addEventListener('input', () => {
            const numSubjects = parseInt(numSubjectsInput.value);
            subjectContainer.innerHTML = '';

            for (let j = 1; j <= numSubjects; j++) {
                const subjectDiv = document.createElement('div');
                subjectDiv.classList.add('mb-3');

                subjectDiv.innerHTML = `
                    <label for="subjectName${semesterNum}_${j}" class="form-label">Subject ${j} Name:</label>
                    <input type="text" id="subjectName${semesterNum}_${j}" class="form-control mb-2" placeholder="Enter subject name">
                    
                    <label for="creditHours${semesterNum}_${j}" class="form-label">Credit Hours:</label>
                    <input type="number" id="creditHours${semesterNum}_${j}" class="form-control mb-2" placeholder="Enter credit hours" required>
                    
                    <label for="gpa${semesterNum}_${j}" class="form-label">GPA:</label>
                    <input type="number" step="0.01" id="gpa${semesterNum}_${j}" class="form-control" placeholder="Enter GPA" required>
                `;
                subjectContainer.appendChild(subjectDiv);
            }
        });
    }

    // GPA & CGPA Calculation Logic
    calculateBtn.addEventListener('click', () => {
        let totalCP = 0;
        let totalCreditHours = 0;
        let totalSemesterGPA = 0;
        const numSemesters = parseInt(numSemestersInput.value);

        for (let i = 1; i <= numSemesters; i++) {
            const numSubjects = parseInt(document.getElementById(`numSubjects${i}`).value);
            let semesterCP = 0;
            let semesterCreditHours = 0;

            for (let j = 1; j <= numSubjects; j++) {
                const creditHours = parseFloat(document.getElementById(`creditHours${i}_${j}`).value);
                const gpa = parseFloat(document.getElementById(`gpa${i}_${j}`).value);

                const cp = creditHours * gpa;
                semesterCP += cp;
                semesterCreditHours += creditHours;
            }

            const semesterGPA = semesterCP / semesterCreditHours;
            totalCP += semesterCP;
            totalCreditHours += semesterCreditHours;
            totalSemesterGPA += semesterGPA;
        }

        // Display GPA and CGPA
        gpaResult.textContent = (totalCP / totalCreditHours).toFixed(2);
        cgpaResult.textContent = (totalSemesterGPA / numSemesters).toFixed(2);
    });
});
