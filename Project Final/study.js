// Check the answer in the quiz
function checkAnswer(selected) {
    const resultElement = document.getElementById('quiz-result');
    if (selected === 'run') {
        resultElement.innerHTML = "Correct! 'Run' means to move swiftly on foot.";
        resultElement.style.color = "green";
    } else {
        resultElement.innerHTML = "Try again!";
        resultElement.style.color = "red";
    }
}

// Navigate to other lessons
function navigateToLesson(lesson) {
    alert(`Navigating to ${lesson.replace('-', ' ')} lesson!`);
    // Here, you would implement the navigation logic, e.g., window.location.href
}

// Handle form submission for adding a lesson
document.getElementById('add-lesson-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('lesson-title').value;
    const description = document.getElementById('lesson-description').value;

    // Here, you'd typically send this data to the server
    console.log(`New Lesson: ${title} - ${description}`);

    // Show success message
    document.getElementById('lesson-success-message').style.display = 'block';
});
