import { ChatResponse } from '../types/chat';

const responses: Record<string, ChatResponse> = {
  default: {
    message: "Hola! ¿Cómo puedo ayudarte con tu entrega hoy?",
    options: [
      "Seguimiento de mi pedido",
      "Problemas de entrega",
      "Cambiar dirección de entrega",
      "Hablar con el equipo de PunaYa"
    ]
  },
  "rastrear mi pedido": {
    message: "Proporcione su número de pedido para rastrear su entrega.",
  },
  "Problemas de entrega": {
    message: "¿Qué problema estás experimentando con tu entrega?",
    options: [
      "Entrega retrasada",
      "Artículos erróneos entregados",
      "Artículos dañados",
      "Otro"
    ]
  },
  "cambiar dirección de entrega": {
    message: "Para cambiar su dirección de envío, proporcione primero su número de pedido.",
  },
  "speak to human agent": {
    message: "En breve te pondré en contacto con un representante de atención al cliente. Espera un momento.",
  }
};

export const getBotResponse = (input: string): ChatResponse => {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(responses)) {
    if (normalizedInput.includes(key)) {
      return response;
    }
  }
  
  return {
    message: "Lo siento. ¿Podrías reformular eso o elegir una de las opciones que aparecen a continuación?",
    options: responses.default.options
  };
};