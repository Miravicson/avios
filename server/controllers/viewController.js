export const index = (req, res) => {
  res
    .status(200)
    .render('index', { title: 'Avios', message: 'Up and running' });
};

export const nonIndex = (req, res) => {
  res.status(200).json({ message: 'Non Index' });
};
