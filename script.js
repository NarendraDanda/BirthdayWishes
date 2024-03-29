function stars(){
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white'
ctx.strokeStyle = 'white';
ctx.linewidth = 5;
console.log(ctx)

// ctx.fillStyle ='white';
// ctx.fillRect(150,150,100,200)

class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random()*7+2;
        this.x = this.radius+Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius+Math.random()*(this.effect.height - this.radius*2);
        this.vx = Math.random()*1;
        this.vy = Math.random()*1;
    }
    draw(context){
        context.fillStyle = 'hsl('+this.x*0.5+',100%,50%)';
         context.beginPath();
         context.arc(this.x,this.y, this.radius,0,Math.PI*2);
         context.fill();
         context.stroke();
    }
    update(){
        this.x += this.vx;
         if(this.x > this.effect.width-this.radius || this.x-this.radius<0) this.vx *= -1;
        this.y += this.vy;
         if(this.y > this.effect.height-this.radius || this.y-this.radius<0) this.vy *= -1;
    }
    reset(){
        this.x = this.radius+Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius+Math.random()*(this.effect.height - this.radius*2);
    }
}

class Effect{
      constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();

        window.addEventListener('resize', e => {
            console.log(e.target.window.innerWidth, e.target.window.innerHeight)
        })
      }

      createParticles(){
        for(let i = 0; i< this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
      }
      handleParticles(context){
        this.connectParticles(context)
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        }); 


      }
      connectParticles(context){
        const maxDistance = 100;
        for(let a =0; a<this.particles.length;a++){
            for(let b = a; b<this.particles.length;b++){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx,dy)
                if(distance< maxDistance){
                    context.save();
                    const opacity = 1-(distance/maxDistance);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x,this.particles[a].y);
                    context.lineTo(this.particles[b].x,this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
      }

      resize(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.particles.forEach(particle => {
            particle.reset();
        })
      }
}

const effect = new Effect(canvas, ctx);
// console.log(effect)

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate); 
}
animate()
}