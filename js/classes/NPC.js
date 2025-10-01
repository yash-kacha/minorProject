class NPC extends Sprite {
  constructor({ position, imageSrc, dialogue }) {
    super({ position, imageSrc });
    this.dialogue = dialogue;
    this.dialogueIndex = 0;
    this.chatbox = document.getElementById('chatbox');
  }

  speak() {
    if (this.dialogueIndex < this.dialogue.length) {
      this.chatbox.style.display = 'block';
      this.chatbox.innerText = this.dialogue[this.dialogueIndex];
      this.dialogueIndex++;
    } else {
      this.hideChatbox();
    }
  }

  hideChatbox() {
    this.chatbox.style.display = 'none';
    this.dialogueIndex = 0; // Reset dialogue index
  }
}
