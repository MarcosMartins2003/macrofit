
  let height = 183;


  const heightDisplay = document.getElementById("height-display");
  const decreaseBtn = document.querySelector(".decrease-btn");
  const increaseBtn = document.querySelector(".increase-btn");


  const updateHeightDisplay = () => {
    heightDisplay.textContent = `${height}cm`;
  };


  decreaseBtn.addEventListener("click", () => {
    if (height > 0) { 
      height--;
      updateHeightDisplay();
    }
  });

  increaseBtn.addEventListener("click", () => {
    height++;
    updateHeightDisplay();
  });




  let weight = 75;

  const weightDisplay = document.getElementById("weight-display");
  const weightDecreaseBtn = document.querySelector(".weight-decrease-btn");
  const weightIncreaseBtn = document.querySelector(".weight-increase-btn");

  const updateWeightDisplay = () => {
    weightDisplay.textContent = `${weight}kg`;
  };

  weightDecreaseBtn.addEventListener("click", () => {
    if (weight > 0) {
      weight--; 
      updateWeightDisplay();
    }
  });    

  weightIncreaseBtn.addEventListener("click", () => {
    weight++;
    updateWeightDisplay();
  });


  function selectCard(card) {

    const cards = document.querySelectorAll('.div-2');
    cards.forEach(c => c.classList.remove('selected'));

    card.classList.add('selected');
}



function selectActivity(card) {
   
    const cards = document.querySelectorAll('.frame-19, .frame-21'); 
    cards.forEach(c => {
        c.classList.remove('selected');
        const textWrapper = c.querySelector('.text-wrapper-4, .text-wrapper-6');
        if (textWrapper) {
            textWrapper.classList.remove('selected');
        }
        const icon = c.querySelector('.img');
        icon.src = icon.dataset.originalSrc || icon.src; 
    });

    
    card.classList.add('selected');
    const selectedTextWrapper = card.querySelector('.text-wrapper-4, .text-wrapper-6');
    if (selectedTextWrapper) {
        selectedTextWrapper.classList.add('selected');
    }

    const selectedIcon = card.querySelector('.img');
    selectedIcon.dataset.originalSrc = selectedIcon.src; 
    selectedIcon.src = 'img/lucide-badge-check.svg'; 
}
