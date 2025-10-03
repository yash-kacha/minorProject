class Item {
    constructor({ id, position, value, type }) {
        this.id = id;
        this.position = position;
        this.value = value;
        this.type = type; // 'integer' | 'float' | 'char' | 'boolean' | ...
        this.width = 20;
        this.height = 20;
        this.collected = false;

        if (!Item.bgBoxImage) {
            Item.bgBoxImage = new Image();
            Item.bgBoxImage.src = './img/bgBox.png';
            Item.bgBoxLoaded = false;
            Item.bgBoxImage.onload = () => { Item.bgBoxLoaded = true; };
        }
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
        // Background box
        if (Item.bgBoxImage && Item.bgBoxImage.complete) {
            c.drawImage(Item.bgBoxImage, this.position.x, this.position.y, this.width, this.height);
        } else {
            // Fallback color if image not loaded yet
            c.fillStyle = '#2b2d42';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        // Centered pixelated number with outline for contrast
        c.save();
        c.font = '16px Abaddon';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        const centerX = this.position.x + this.width / 2;
        const centerY = this.position.y + this.height / 2 + 1;
        c.strokeStyle = 'white';
        c.lineWidth = 2;
        c.strokeText(String(this.value), centerX, centerY);
        c.fillStyle = '#111';
        c.fillText(String(this.value), centerX, centerY);
        c.restore();
    }
}


