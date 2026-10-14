# Ahorrá Colombia — comparativa y asistente de mercado

Esta entrega conserva la comparativa original, el catálogo, el buscador, el carrito flotante, las listas guardadas y la generación de mercado por presupuesto. Se eliminó la sección añadida “Centro de ahorro: cesta real, precio unitario y trazabilidad”.

## Cambios de esta revisión

- **La comparativa vuelve a ser la original:** se conserva la compra unificada frente a compra mixta, con sus tablas y desglose.
- **Domicilio opcional:** un único campo permite añadir un valor de domicilio a los totales de la comparativa. El valor se suma a las dos alternativas para compararlas en igualdad de condiciones.
- **Mejor aplicación de precios consultados:** cuando el catálogo en línea devuelve un producto cuyo nombre y presentación coinciden razonablemente con un producto base, se actualiza el precio del comercio correspondiente en esa presentación. No se deben mezclar precios de paquetes de tamaños distintos.
- **Ejemplo de arepas x5:** se ajustó el precio de respaldo de D1 a $1.990 COP conforme al valor informado por el usuario. Es un valor de referencia y no una verificación actual en D1; si la consulta online obtiene el precio de la presentación equivalente, debe prevalecer el precio consultado.
- **API propia:** las consultas de Éxito, Olímpica, Jumbo, Euro, Vaquita y D1 pasan por `/api/catalogo` para evitar depender principalmente de proxies CORS públicos.

## Importante sobre precios y domicilios

Los comercios no ofrecen todos una API pública oficial, abierta y estable para precio, inventario, ubicación y tarifa de domicilio. Por eso no sería honesto afirmar que cualquier precio se actualiza en vivo para todas las tiendas ni inventar una tarifa de envío. El precio consultado depende de que el comercio permita acceder a su catálogo; puede variar por ciudad, sucursal, promoción, disponibilidad, dirección y sesión. La caché de la API es de 60 segundos, pero la tienda puede actualizar con otra frecuencia o bloquear consultas.

El campo de domicilio es manual y opcional en esta versión. Para automatizarlo de forma confiable se necesita una integración oficial o autorizada de cada tienda y conocer la dirección/zona de entrega; una tarifa fija podría mostrar ahorros falsos.

## Despliegue en Vercel

1. Descomprime el ZIP y sube `index.html`, `api/catalogo.js` y `package.json` a la raíz del repositorio.
2. Despliega desde Vercel.
3. Prueba, por ejemplo, `/api/catalogo?store=exito&q=arroz` y `/api/catalogo?store=d1&path=despensa&page=1&format=html`.
4. Comprueba los resultados en la página. Si un comercio bloquea la consulta, el catálogo de respaldo puede seguir mostrando precios de referencia.

## Validaciones realizadas

Se verificó la sintaxis de los scripts JavaScript incluidos y de la función `api/catalogo.js`. Esta entrega no ha sido validada contra una sesión de compra real ni se ha confirmado que todas las tiendas permitan consulta desde el despliegue productivo.

## Ajuste de referencias de precio (14 de octubre de 2026)

Se recorrió el catálogo de 150 productos y sus presentaciones. Se corrigieron con referencias públicas los básicos para los que encontré coincidencias útiles; el resto conserva valores orientativos de respaldo, no precios confirmados artículo por artículo. Se corrigieron referencias de varios básicos con precios visibles en catálogos públicos, entre ellos arepa blanca x5 ($1.990, indicado por el usuario y corroborado por búsqueda de producto), arroz Diana 500 g ($1.990), leche Latti bolsa 900 ml ($3.090), lenteja El Estío 500 g ($1.590), sal Refisal 1 kg ($2.900), pasta Deliziare 500 g ($3.990), tomate chonto 1 kg ($4.990), azúcar blanca 1 kg ($3.300) y panela fraccionada 1 kg (aprox. $6.550). En otros comercios los importes son estimaciones orientativas, no precios comprobados artículo por artículo.

Referencias públicas consultadas:
- D1, arroz Diana 500 g: https://www.d1.com.co/arroz-diana-500g-12002073/p
- D1, leche entera bolsa UHT Latti 900 ml: https://www.d1.com.co/leche-entera-bolsa-uht-latti-900ml-12000094/p
- D1, categorías de despensa y lácteos: https://www.d1.com.co/despensa y https://www.d1.com.co/lacteos-y-huevos
- Priceo, comparador de precios actualizado diariamente: https://priceo.co/como-funciona

La asociación de productos se hizo más estricta: se excluyen variantes como arepa de yuca/queso/chócolo al actualizar arepas de maíz, y no se actualiza el precio base si no se puede emparejar la presentación. El extractor D1 también ignora rangos de precio de filtros para reducir falsos precios.

Se incluye `referencias-precios-2026.csv` con las presentaciones y valores por comercio para que puedas detectar y reportar diferencias puntuales. Los registros no marcados como referencia D1 siguen siendo estimaciones.
