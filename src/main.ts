import { Application } from "./Application";
import { BubbleMessage } from "./BubbleMessage";
import { Duck } from "./Duck";
import data from "./assets/data.json";

const app = new Application();
app.mount(document.body);
const duck = new Duck();
duck.position.setX(-128);
duck.position.setY(app.ctx.canvas.height / 2);
duck.velocity.set(350, 0);
duck.moveTo(app.ctx.canvas.width / 2, app.ctx.canvas.height / 2);

app.entities.push(duck);

const msg = new BubbleMessage();
msg.bind(duck);
app.messages.push(msg);

msg.open("Привет, я доктор-утка");
setTimeout(() => {
  msg.close();
}, 3500);

const phrases = data;

app.ctx.canvas.addEventListener("mousedown", () => {
  const idx = Math.floor(Math.random() * phrases.length);
  msg.open(phrases[idx]);

  setTimeout(() => {
    msg.close();
  }, 3500);
});

app.play();
