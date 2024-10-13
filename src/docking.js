class Dock extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a container for docked items
        const dockContainer = document.createElement('div');
        dockContainer.setAttribute('class', 'dock-container');

        // Define styles for the dock
        const style = document.createElement('style');
        style.textContent = `
            .dock-container {
                position: fixed;
                z-index: 9999; /* Ensure it's above other content */
            }
            .dock-topright { top: 0; right: 0; }
            .dock-topleft { top: 0; left: 0; }
            .dock-bottomright { bottom: 0; right: 0; }
            .dock-bottomleft { bottom: 0; left: 0; }
        `;

        // Append styles and container to shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(dockContainer);
        this.dockContainer = dockContainer; // Reference to the container for later use
    }

    connectedCallback() {
        this.updateDocking();
        this.moveChildrenToDockContainer();
    }

    static get observedAttributes() {
        return ['id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'id') {
            this.updateDocking();
        }
    }

    updateDocking() {
        const dockingPosition = this.getAttribute('id');
        const dockContainer = this.dockContainer;

        // Remove any existing docking classes
        dockContainer.classList.remove('dock-topright', 'dock-topleft', 'dock-bottomright', 'dock-bottomleft');

        // Apply the appropriate docking class
        switch (dockingPosition) {
            case 'topright':
                dockContainer.classList.add('dock-topright');
                break;
            case 'topleft':
                dockContainer.classList.add('dock-topleft');
                break;
            case 'bottomright':
                dockContainer.classList.add('dock-bottomright');
                break;
            case 'bottomleft':
                dockContainer.classList.add('dock-bottomleft');
                break;
            default:
                console.warn(`Unknown docking position: ${dockingPosition}`);
                break;
        }
    }

    moveChildrenToDockContainer() {
        // Move all child nodes to the dock container
        while (this.firstChild) {
            this.dockContainer.appendChild(this.firstChild);
        }
    }
}

// Define the custom element
customElements.define('dock-element', Dock);
