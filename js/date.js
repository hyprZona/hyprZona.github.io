document.addEventListener('DOMContentLoaded', () => {
    // Show/hide date categories
    const switchButtons = document.querySelectorAll('.switch-btn');
    const dateCategories = document.querySelectorAll('.date-category');

    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and categories
            switchButtons.forEach(btn => btn.classList.remove('active'));
            dateCategories.forEach(category => category.classList.remove('active'));

            // Add active class to clicked button and corresponding category
            button.classList.add('active');
            const categoryType = button.dataset.category;
            // Fix: Match the class names with HTML structure
            const categoryClass = categoryType === 'team' ? 'team-birthdays' :
                                categoryType === 'project' ? 'project-dates' :
                                'character-birthdays';
            document.querySelector(`.${categoryClass}`).classList.add('active');
        });
    });

    // Calculate ages and time spans
    const calculateAge = (dateString) => {
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // 🎯 Calculate precise age with years, months, and days
    const calculateDetailedAge = (dateString) => {
        const startDate = new Date(dateString);
        const today = new Date();
        
        // 🧮 Calculate the time difference
        let years = today.getFullYear() - startDate.getFullYear();
        let months = today.getMonth() - startDate.getMonth();
        let days = today.getDate() - startDate.getDate();

        // 📅 Adjust for negative months or days
        if (days < 0) {
            months--;
            // Get days in previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }

        // 🎨 Format the output based on time passed
        if (years < 0 || (years === 0 && months === 0 && days < 0)) {
            return "Launching soon";
        }

        // 📝 Build the age string
        const parts = [];
        if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
        if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        
        return parts.join(', ');
    };

    // 🔄 Update ages with the new detailed calculation
    document.querySelectorAll('[data-birthday]').forEach(card => {
        const birthday = card.dataset.birthday;
        const ageElement = card.querySelector('.age');
        if (ageElement) {
            const age = calculateDetailedAge(birthday);
            ageElement.textContent = `Age: ${age}`;
        }
    });

    document.querySelectorAll('[data-launch]').forEach(card => {
        const launchDate = card.dataset.launch;
        const ageElement = card.querySelector('.age');
        if (ageElement) {
            const age = calculateDetailedAge(launchDate);
            ageElement.textContent = age === "Launching soon" ? age : `Project age: ${age}`;
        }
    });
});