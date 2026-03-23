import fs from 'fs';
import path from 'path';
import facts from '../data/facts.json';

const filePath = path.resolve('./data/messages.json');

function readMessages() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveMessages(messages) {
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const messages = readMessages();
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { text, category } = req.body;

    let messages = readMessages();

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user'
    };

    messages.push(userMessage);

    let filtered = facts;

    if (category) {
      filtered = facts.filter(f => f.category === category);
    }

    const randomFact = filtered[Math.floor(Math.random() * filtered.length)];

    const botMessage = {
      id: Date.now() + 1,
      text: randomFact.text,
      sender: 'bot'
    };

    messages.push(botMessage);

    saveMessages(messages);

    return res.status(200).json({
      userMessage,
      botMessage
    });
  }
}