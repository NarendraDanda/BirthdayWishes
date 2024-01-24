function shooting(){
    const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white'
// ctx.strokeStyle = 'white';
ctx.linewidth = 5;
console.log(ctx)

// ctx.fillStyle ='white';
// ctx.fillRect(150,150,100,200)

class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = 15;
        this.x = this.radius+Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius+Math.random()*(this.effect.height - this.radius*2);
        this.vx = Math.random()*4;
        this.vy = 0;
        this.gravity = this.radius*0.001;
        this.friction = 0.95;
    }
    draw(context){
        context.fillStyle = 'hsl('+this.x*0.5+',100%,50%)';
         context.beginPath();
         context.arc(this.x,this.y, this.radius,0,Math.PI*2);
         context.fill();
         context.stroke();
    }
    update(){
        this.vy += this.gravity;  
        this.x += this.vx;
        // if(this.x > this.effect.width-this.radius || this.x-this.radius<0) this.vx *= -1;
        this.y += this.vy;
        if(this.y > this.effect.height-this.radius){
            this.reset();
        }
         
    }
    reset(){
        this.x = this.radius+Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius-Math.random()*this.effect.height*0.5;
    }
}

class Effect{
      constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 200;
        this.createParticles();
      }

      createParticles(){
        for(let i = 0; i< this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
      }
      handleParticles(context){
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        }); 
      }
}

const effect = new Effect(canvas);
// console.log(effect)

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate); 
}
animate()
}