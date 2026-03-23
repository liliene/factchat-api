import facts from '../data/facts.json';

export default function handler(req, res) {
  const { category } = req.query;

  let filtered = facts;

  if (category) {
    filtered = facts.filter(f => f.category === category);
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];

  res.status(200).json(random);
}