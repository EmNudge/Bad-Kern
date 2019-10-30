const bookmarklet = () => {
  const className = "kern-button-" + Math.random().toString(16).slice(2);

  const style = document.createElement('style');
  style.innerText = `
    .${className} {
      color: white;
      background: #333;
      padding: 3px 10px;
      position: absolute;
      top: -20px;
      left: 0;
      border: none;
    }
    .${className}:hover {
      background: #555;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  for (const p of document.querySelectorAll('p')) {
    const button = document.createElement('button');
    button.innerText = "kern paragraph";
    button.className = className;

    button.addEventListener('click', () => {
      const buttons = document.getElementsByClassName(className);
      while (buttons.length) {
        for (const button of buttons) {
          button.parentElement.removeChild(button);
        }
      }
      kernText(p);
    });

    p.appendChild(button);
    p.style.position = "relative" 
  }

  function kernText(el) {
    const text = el.innerText.split(' ');
    el.innerText = "";

    for (const word of text) {
      for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.innerText = word[i];
        let margin = Math.random() * 3;

        if (i > 0 && i < word.length - 1) margin /= -3;

        span.style.margin = `0 ${margin}px`;
        el.appendChild(span);
      }

      const spacer = document.createElement('span');
      spacer.innerText = " ";
      el.appendChild(spacer);
    }
  }
}


const funcStr = bookmarklet
  .toString()
  .split('\n')
  .slice(1, -1)
  .map(line => line.trim())
  .join('');
document.querySelector('.bookmarklet').href = `javascript:(function(){${funcStr}})()`