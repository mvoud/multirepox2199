class DockElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Inject CSS styles
        const style = document.createElement('style');
        style.textContent = `
            /* Basic styles for the dock element */
            div {
                border: 1px solid #000; 
                padding: 10px; 
                margin: 10px; 
                background-color: #f9f9f9;
                position: absolute; /* Set position to absolute for docking */
            }

            /* Styles for different dock types */
            .dock-bottom-right {
                bottom: 10px;
                right: 10px;
            }

            .dock-bottom-left {
                bottom: 10px;
                left: 10px;
            }

            .dock-bottom-center {
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
            }

            .dock-center-left {
                top: 50%;
                left: 10px;
                transform: translateY(-50%);
            }

            .dock-center {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .dock-center-right {
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
            }

            .dock-top-left {
                top: 10px;
                left: 10px;
            }

            .dock-top-center {
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
            }

            .dock-top-right {
                top: 10px;
                right: 10px;
            }
        `;
        shadow.appendChild(style);

        // Create a container for the element
        const container = document.createElement('div');

        // Get the docking ID and type
        const dockingId = this.getAttribute('of');
        const dockType = this.getAttribute('type');

        // Set the class based on the type
        if (dockType) {
            container.classList.add(`dock-${dockType.replace(/ /g, '-')}`);
        }

        // Add content to the container
        const content = document.createElement('span');
        content.textContent = `Docking ID: ${dockingId} - Content: `;
        container.appendChild(content);

        // Create a slot for the inner content
        const slot = document.createElement('slot');
        container.appendChild(slot);

        // Append the container to the shadow DOM
        shadow.appendChild(container);
    }
}

// Define the new element
customElements.define('dock', DockElement);