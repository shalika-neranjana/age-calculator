// Function to display error messages
function showError(message) {
    const resultElement = document.getElementById("result");
    resultElement.className = "error";
    resultElement.textContent = message;
    resultElement.style.color = "red";
}

// Function to calculate age
function calculateAge() {
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value) - 1; // Month is zero-based
    const year = parseInt(document.getElementById("year").value);

    // Validate input values
    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 0 || month > 11 || year < 1900 || year > 9999) {
        showError("Please enter a valid birthdate.");
        return;
    }

    // Check for invalid dates in specific months
    if ((month === 3 || month === 5 || month === 8 || month === 10) && day > 30) {
        showError("The selected month only has 30 days.");
        return;
    }

    // Check for invalid dates in February
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (month === 1) { // February
        if (day > 29 || (!isLeapYear && day > 28)) {
            showError(`February ${year} only has ${isLeapYear ? 29 : 28} days.`);
            return;
        }
    }

    const birthdate = new Date(year, month, day);
    const today = new Date();

    // Check if birthdate is in the future
    if (birthdate >= today) {
        showError("Birthdate cannot be in the future.");
        return;
    }

    // Calculate age
    const ageInMilliseconds = today - birthdate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.44; // Average month length
    const ageInYears = ageInMonths / 12;

    const years = Math.floor(ageInYears);
    const months = Math.floor(ageInMonths % 12);
    const days = Math.floor(ageInDays % 30.44);

    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.style.color = "#2a272b";
    resultElement.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
}

// Display today's date
const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("todayDate").textContent = "Today : " + today.toLocaleDateString('en-US', options);
