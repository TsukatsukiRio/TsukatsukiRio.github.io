const boxes = document.querySelectorAll('.box');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const indexManager = {
    currentIndex: 0,
    updatePrevIndex() {
        this.currentIndex = (this.currentIndex - 1 + boxes.length) % boxes.length;
        return this.currentIndex;
    },
    updateNextIndex() {
        this.currentIndex = (this.currentIndex + 1) % boxes.length;
        return this.currentIndex;
    }
};

function showBox(index) {
    boxes.forEach((box, i) => {
        if (i === index) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

prevButton.addEventListener('click', () => {
    let currentIndex = indexManager.updatePrevIndex();
    showBox(currentIndex);
});

nextButton.addEventListener('click', () => {
    let currentIndex = indexManager.updateNextIndex();
    showBox(currentIndex);
});