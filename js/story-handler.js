document.addEventListener('DOMContentLoaded', () => {
    const loadStory = (containerId, storyId) => {
        const container = document.querySelector(`#${containerId} .lore-content`);
        if (container && window.storyManager) {
            const story = window.storyManager.getStory(storyId);
            if (story) {
                container.innerHTML = story.content;
            }
        }
    };

    // Load stories into their respective containers
    setTimeout(() => {
        loadStory('original-lore', 'hornyMonsters');
        loadStory('remade-lore', 'ghostface');
    }, 100);
});