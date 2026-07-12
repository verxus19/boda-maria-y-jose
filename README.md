# Web de boda - Maria y Jose

Invitacion digital premium en HTML, CSS y JS (sin framework), lista para GitHub Pages.

## Que incluye esta version

1. Hero inmersivo con narrativa visual, CTA y cuenta atras.
2. Navegacion sticky con menu movil y estado activo por seccion.
3. Barra superior de progreso de scroll.
4. Seccion "Sobre nosotros" con galeria editorial.
5. Itinerario expresivo con timeline, iconos y microcopy.
6. Bloque de ubicaciones con tarjetas y botones placeholder de mapa.
7. Dress code, RSVP, fotos, mesa de regalos y FAQ.
8. Respeto de `prefers-reduced-motion` y foco visible para teclado.

## Archivos principales

1. [index.html](index.html)
2. [styles.css](styles.css)
3. [script.js](script.js)
4. [assets/photos/pareja-1.svg](assets/photos/pareja-1.svg)
5. [assets/photos/pareja-2.svg](assets/photos/pareja-2.svg)
6. [assets/photos/pareja-3.svg](assets/photos/pareja-3.svg)
7. [assets/photos/pareja-4.svg](assets/photos/pareja-4.svg)

## Placeholders pendientes

1. RSVP: sustituir `https://forms.gle/PLACEHOLDER-RSVP` en [index.html](index.html).
2. Album compartido: sustituir `https://drive.google.com/drive/folders/PLACEHOLDER-ALBUM` en [index.html](index.html).
3. Mesa de regalos: reemplazar el boton "Placeholder: anadir IBAN o lista" en [index.html](index.html).
4. Mapas: en bloque "Ubicaciones", cambiar cada `href="#"` por enlaces reales de mapa en [index.html](index.html).

## Como cambiar fotos

La galeria usa 4 placeholders SVG en [assets/photos](assets/photos):

1. [assets/photos/pareja-1.svg](assets/photos/pareja-1.svg)
2. [assets/photos/pareja-2.svg](assets/photos/pareja-2.svg)
3. [assets/photos/pareja-3.svg](assets/photos/pareja-3.svg)
4. [assets/photos/pareja-4.svg](assets/photos/pareja-4.svg)

Opciones:

1. Mantener los nombres y reemplazar los archivos por fotos reales.
2. Usar nombres/extensiones nuevas y actualizar las rutas `<img src="...">` en [index.html](index.html).

## Ver en local

1. Abrir [index.html](index.html) directamente en el navegador.
2. O usar Live Server para recarga automatica.

## Publicacion en GitHub Pages

1. Subir los archivos a un repositorio.
2. Ir a `Settings > Pages`.
3. Elegir `Deploy from a branch`.
4. Seleccionar rama `main` y carpeta `/ (root)`.
5. Esperar 1-2 minutos.
