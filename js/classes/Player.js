class Player extends Sprite {
    constructor({
        collisionBlocks = [], imageSrc, frameRate, animations,loop
    }) {
        super({ imageSrc, frameRate, animations ,loop})
        this.position = {
            x: 130,
            y: 500,

            // x: 96,
            // y: 169,
        }
        this.velosity = {
            x: 0,
            y: 0,
        }
        this.width = 32
        this.height = 32
        this.sides =
        {
            bottom: this.position.y + this.height
        }

        this.gravity = 1
        this.collisionBlocks = collisionBlocks
        this.animationSwitchDelay = 0
        this.pendingAnimation = null // Store animation to switch to when ready
        this.jumpDirection = 'right' // Track jump direction to prevent switching mid-jump
    }

    // Handles player input for movement and actions
    handleInput(keys)
    {
        if(this.preventInput) return
        this.velosity.x = 0
        const isGrounded = this.velosity.y === 0
        if (keys.d.pressed) {
          this.velosity.x = 5
          this.lastDirection = 'right'
          if (isGrounded) this.switchSprite('RunRight')
        }
        else if (keys.a.pressed) {
          this.velosity.x = -5
          this.lastDirection = 'left'
          if (isGrounded) this.switchSprite('RunLeft')
        }
        else {
          // Only switch to idle from input when grounded; air handled in update()
          if (isGrounded) {
            if (this.lastDirection === 'left') this.switchSprite('IdleLeft')
            else this.switchSprite('IdleRight')
          }
        }
    }

    // Switches the player's current animation
    switchSprite(name) {
        // Don't switch if already on this animation
        if (this.image === this.animations[name].image) return
        
        // Reset the onComplete flag for the new animation
        this.animations[name].isActive = false

        // Simple switch - no delays, no complex logic
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    // Updates the player's state every frame
    update() {
        this.position.x += this.velosity.x

        this.updateHitBox()
        this.checkForHorizontalCollision()
        this.applyGravity()
        this.updateHitBox()

        this.checkForVerticalCollision()

        // Animation switching logic
        if (!this.preventInput) {
            if (this.velosity.y === 0) {
                if (this.velosity.x > 0) {
                    this.switchSprite('RunRight')
                } else if (this.velosity.x < 0) {
                    this.switchSprite('RunLeft')
                } else {
                    if (this.lastDirection === 'left') this.switchSprite('IdleLeft')
                    else this.switchSprite('IdleRight')
                }
            }
            else if (this.velosity.y < -3 && this.currentAnimation !== this.animations['JumpLeft'] && this.currentAnimation !== this.animations['JumpRight']) {
                if (this.lastDirection === 'left') {
                    this.switchSprite('JumpLeft')
                } else {
                    this.switchSprite('JumpRight')
                }
            }
            else if (this.velosity.y > 3 && this.currentAnimation !== this.animations['FallLeft'] && this.currentAnimation !== this.animations['FallRight']) {
                if (this.lastDirection === 'left') {
                    this.switchSprite('FallLeft')
                } else {
                    this.switchSprite('FallRight')
                }
            }
        }
    }

    // Updates the player's hitbox position
    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + 20,
                y: this.position.y + 15,
            },
            width: 25,
            height: 30
        }
    }

    // Checks for horizontal collisions with collision blocks
    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (collisionBlock.width && collisionBlock.height &&
                this.hitbox.position.x <= (collisionBlock.position.x + collisionBlock.width) &&
                (this.hitbox.position.x + this.hitbox.width) >= (collisionBlock.position.x) &&
                (this.hitbox.position.y + this.hitbox.height) >= (collisionBlock.position.y) &&
                (this.hitbox.position.y) <= (collisionBlock.position.y + collisionBlock.height)
            ) {
                if (this.velosity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                if (this.velosity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }

    // Applies gravity to the player
    applyGravity() {
        this.velosity.y += this.gravity
        this.position.y += this.velosity.y
    }

    // Checks for vertical collisions with collision blocks
    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (collisionBlock.width && collisionBlock.height &&
                this.hitbox.position.x <= (collisionBlock.position.x + collisionBlock.width) &&
                (this.hitbox.position.x + this.hitbox.width) >= (collisionBlock.position.x) &&
                (this.hitbox.position.y + this.hitbox.height) >= (collisionBlock.position.y) &&
                (this.hitbox.position.y) <= (collisionBlock.position.y + collisionBlock.height)
            ) {

                if (this.velosity.y < 0) {
                    this.velosity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                if (this.velosity.y > 0) {
                    this.velosity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
        super.update();
    }
}