class GameInfo extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.setAttribute('class', 'game-card');

        const image = document.createElement('img');
        image.src = this.getAttribute('image');
        image.alt = this.getAttribute('title');

        const title = document.createElement('div');
        title.setAttribute('class', 'game-title');
        title.textContent = this.getAttribute('title');

        const moreInfoButton = this.createButton('More Infos', this.getAttribute('info-icon'), this.moreInfo);
        const playButton = this.createButton('Play', this.getAttribute('play-icon'), this.playGame);

        container.appendChild(image);
        container.appendChild(title);
        container.appendChild(moreInfoButton);
        container.appendChild(playButton);

        shadow.appendChild(container);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .game-card {
                background-color: #333;
                border: 2px solid #0056b3;
                border-radius: 10px;
                padding: 20px;
                text-align: center;
                width: 300px;
                color: white;
            }
            .game-card img {
                max-width: 100%;
                border-radius: 10px;
            }
            .game-title {
                font-size: 24px;
                margin: 10px 0;
            }
            .button {
                display: inline-flex;
                align-items: center;
                background-color: #0056b3;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 15px;
                margin: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #004494;
            }
            .button i {
                margin-right: 5px; /* Space between icon and text */
            }
        `;
        shadow.appendChild(style);
    }

    createButton(text, iconClass, callback) {
        const button = document.createElement('button');
        button.setAttribute('class', 'button');
        button.onclick = callback.bind(this);

        const icon = document.createElement('i');
        icon.setAttribute('class', `fas ${iconClass}`); // Use Font Awesome icon class
        
        button.appendChild(icon);
        button.appendChild(document.createTextNode(text));
        return button;
    }

    moreInfo() {
        alert("More information about " + this.getAttribute('title') + ".");
    }

    playGame() {
        alert("Starting the " + this.getAttribute('title') + " game...");
        // Here you would add logic to start the game.
    }
}

// Define the new element
customElements.define('game-info', GameInfo);