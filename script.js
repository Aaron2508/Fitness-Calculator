document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const submitButton = document.getElementById("submitButton");
    const fitnessPlan = document.getElementById("fitnessPlan");
    const form = document.getElementById("fitnessForm");
    const progress = document.getElementById("progress"); // Progress bar element
    let currentStep = 0;

    // Update the visibility of steps and progress bar
    const updateStep = () => {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        // Update button visibility
        prevButton.style.display = currentStep > 0 ? "inline-block" : "none";
        nextButton.style.display = currentStep < steps.length - 1 ? "inline-block" : "none";
        submitButton.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";

        // Update progress bar width
        const progressPercentage = ((currentStep + 1) / steps.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    };

    // Next button click
    nextButton.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateStep();
        }
    });

    // Back button click
    prevButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    });

    // Form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect user inputs
        const gender = form.querySelector("input[name='gender']:checked").value;
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        const goal = form.querySelector("input[name='fitnessGoal']:checked").value;
        const workoutDays = form.querySelector("input[name='workoutDays']:checked").value;
        const sleepHours = form.querySelector("input[name='sleepHours']:checked").value;
        const stressLevel = form.querySelector("input[name='stressLevel']:checked").value;

        // Basal Metabolic Rate (BMR) calculation
        const bmr =
            gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5
                : 10 * weight + 6.25 * height - 5 * age - 161;

        // Calorie Target based on goal
        const maintenanceCalories = Math.round(bmr);
        const calorieTarget =
            goal === "weightLoss"
                ? maintenanceCalories - 500
                : goal === "muscleGain"
                ? maintenanceCalories + 500
                : maintenanceCalories;

        // Macronutrient calculations
        const protein = (2 * weight).toFixed(1); // grams
        const carbs = (4 * weight).toFixed(1); // grams
        const fats = (0.8 * weight).toFixed(1); // grams

        // Detailed fitness plan
        fitnessPlan.innerHTML = `
            <h2>Your Fitness Plan</h2>
            <div class="plan-section">
                <h3>1. Calorie and Macronutrient Needs</h3>
                <p>• Maintenance Calories: ${maintenanceCalories} kcal/day</p>
                <p>• Target Calories: ${calorieTarget} kcal/day</p>
                <p>• Protein: ${protein} g/day</p>
                <p>• Carbohydrates: ${carbs} g/day</p>
                <p>• Fats: ${fats} g/day</p>
            </div>
            <div class="plan-section">
                <h3>2. Training Plan</h3>
                <p>• Focus on ${
                    goal === "muscleGain" ? "hypertrophy training" : "general fitness."
                }</p>
                <p>• Commit to ${workoutDays} workouts per week.</p>
                <p>• Include compound lifts such as squats, deadlifts, and bench press.</p>
                <p>• Progressively overload to increase strength and endurance.</p>
            </div>
            <div class="plan-section">
                <h3>3. Supplements</h3>
                <p>• Protein Powder: Helps meet your daily protein goals conveniently.</p>
                <p>• Creatine Monohydrate: Improves performance and muscle growth.</p>
                <p>• Omega-3: Reduces inflammation and supports recovery.</p>
            </div>
            <div class="plan-section">
                <h3>4. Wellbeing</h3>
                <p>• Sleep: Aim for ${sleepHours} hours of quality sleep per night.</p>
                <p>• Stress: Your stress level is ${stressLevel}. Practice mindfulness or light activities like yoga.</p>
                <p>• Prioritize a consistent routine to improve mental and physical health.</p>
            </div>
            <div class="plan-section">
                <h3>5. Meal Timing</h3>
                <p>• Pre-workout: Carbs + protein (e.g., banana + whey shake).</p>
                <p>• Post-workout: High-protein meal (e.g., chicken breast + rice + veggies).</p>
                <p>• Spread protein intake across 4-5 meals/snacks (20–40 g each).</p>
            </div>
            <button onclick="location.reload()" class="button restart-button">Restart</button>
        `;

        // Hide the form and show the fitness plan
        form.style.display = "none";
        fitnessPlan.style.display = "block";
    });

    // Initialize the first step
    updateStep();
});
