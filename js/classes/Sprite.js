class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations, frameBuffer = 2, loop = true, autoPlay = true }) {
    this.position = position;
    this.image = new Image()

    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
      this.loaded = true
    }
    this.image.src = imageSrc
    this.loaded = false
    this.frameRate = frameRate
    this.currentFrame = 0

    this.elapsedFrames = 0
    this.frameBuffer = frameBuffer
    this.animations = animations
    this.loop = loop
    this.autoPlay = autoPlay
    this.currentAnimation

    // Preload all animation images
    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image()
        image.src = this.animations[key].imageSrc
        this.animations[key].image = image
      }
    }
  }

  // Starts the animation
  play() {
    this.autoPlay = true
  }

  // Draws the sprite on the canvas
  draw() {
    if (!this.loaded || !this.image.complete) {
      // Draw a placeholder if the image is not loaded
      c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      c.fillRect(this.position.x, this.position.y, this.width || 32, this.height || 32)
      return
    }
    
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    }

    try {
      c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height)
    } catch (error) {
      // Draw a placeholder if drawing fails
      c.fillStyle = 'rgba(0, 255, 0, 0.5)'
      c.fillRect(this.position.x, this.position.y, this.width || 32, this.height || 32)
    }
    
    this.updateFrames()
  }

  // Updates the animation frames
  updateFrames() {
    if (!this.autoPlay) return
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1)
        this.currentFrame++
      else if (this.loop) this.currentFrame = 0
    }
    this.elapsedFrames++

    if (this.currentAnimation?.onComplete) {
      if (this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive) {
        this.currentAnimation.onComplete()
        this.currentAnimation.isActive = true
      }
    }
  }
}