import { EVENTS, addKeyword, createFlow } from '@builderbot/bot';

const welcome = addKeyword(['hola'])
    .addAnswer("Hola, " + getTimeRegreats());

const youAreWelcome = addKeyword(['gracias', 'gracias por tu ayuda'])
    .addAnswer('De nada, ' + getTimeRegreats());

const defaultFlow = addKeyword(EVENTS.WELCOME).addAnswer('Hola, por el momento no me es posible atenderte.')
.addAnswer('Te invito a visitar la pagina web');



function getTimeRegreats() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "buen día";
    } else if (hour < 18) {
        return "buena tarde";
    } else {
        return "buena noche";
    }
}



const flow = createFlow([welcome, defaultFlow, youAreWelcome]);

export default flow;