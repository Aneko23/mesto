export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(initialArray) {
        initialArray.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.append(element);
    }

    prependCard(element) {
        this._container.prepend(element); 
    }

    renderElements(cards) {
        this._renderer(cards);
    }
}