class Item {
    constructor({ id, position, value, type }) {
        this.id = id;
        this.position = position;
        this.value = value;
        this.type = type; // 'integer' | 'float' | 'char' | 'boolean' | ...
        this.width = 20;
        this.height = 20;
        this.collected = false;
    }

    getHitbox() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height,
        };
    }

    update() {
        // no-op for now; items are static
    }

    draw() {
        if (this.collected) return;
        // Draw a simple token depending on type
        const colorsByType = {
            integer: '#4CAF50',
            float: '#2196F3',
            char: '#FFC107',
            boolean: '#E91E63',
        };
        const fill = colorsByType[this.type] || '#9E9E9E';

        c.fillStyle = fill;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Value label above the item
        c.fillStyle = 'white';
        c.font = '12px Abaddon';
        const label = String(this.value);
        c.fillText(label, this.position.x - Math.max(0, (label.length - 1) * 3), this.position.y - 4);
    }
}


