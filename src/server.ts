import { createApp } from './app';

const PORT = process.env.PORT ?? 3000;

createApp().listen(PORT, () => {
  console.log(`Cafetería Origen API escuchando en http://localhost:${PORT}`);
});
