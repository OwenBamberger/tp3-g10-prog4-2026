# Cafetería Origen — API

## Instalar y correr
```bash
npm install
npm test          # tests (Vitest)
npm run coverage  # cobertura
npm run test:watch
npm run dev       # servidor en http://localhost:3000
```

## Probar con curl
```bash
curl http://localhost:3000/productos
curl http://localhost:3000/productos/4
curl -X POST http://localhost:3000/pedidos -H "Content-Type: application/json" \
  -d '{"items":[{"productoId":1,"cantidad":2},{"productoId":19,"cantidad":1}]}'
curl http://localhost:3000/pedidos
curl http://localhost:3000/reportes/facturacion
curl http://localhost:3000/reportes/mas-vendido
```
