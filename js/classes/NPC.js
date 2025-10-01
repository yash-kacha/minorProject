class NPC extends Sprite {
  constructor({ position, imageSrc, dialogue, frameRate = 1, frameBuffer = 0, loop = true, autoplay = true }) {
    super({ position, imageSrc, frameRate, frameBuffer, loop, autoplay });
    this.dialogue = dialogue;
    this.dialogueIndex = -1;
    this.chatbox = document.getElementById('chatbox');
    this.isTyping = false;
    this.typingInterval = null;
  }

  speak() {
    if (this.isTyping) {
      this.skipTyping();
      return;
    }
    this.advanceDialogue();
  }

  advanceDialogue() {
    if (this.isTyping) return;
    this.dialogueIndex++;
    if (this.dialogueIndex >= this.dialogue.length) {
      this.hideChatbox();
      return;
    }

    this.chatbox.style.display = 'block';
    const line = this.dialogue[this.dialogueIndex];
    let charIndex = 0;
    this.isTyping = true;

    this.typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        this.chatbox.innerText = line.substring(0, charIndex + 1);
        charIndex++;
      } else {
        clearInterval(this.typingInterval);
        this.isTyping = false;
      }
    }, 50); // Adjust typing speed here (milliseconds)
  }

  skipTyping() {
    clearInterval(this.typingInterval);
    this.chatbox.innerText = this.dialogue[this.dialogueIndex];
    this.isTyping = false;
  }

  hideChatbox() {
    this.chatbox.style.display = 'none';
    this.dialogueIndex = -1; // Reset dialogue index
    clearInterval(this.typingInterval); // Stop typing if chatbox is hidden
    this.isTyping = false;
  }
}
