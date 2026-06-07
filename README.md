# FairPlate

App para dividir cuentas en grupo. Desarrollada con Ionic + Angular.

## Funcionalidades

- Dos modos: división en partes iguales o por consumo
- En partes iguales: ingresás el total y la cantidad de personas, muestra sugerencias de propina
- Por consumo: agregás personas e items, asignás quien pidió qué, propina proporcional al subtotal de cada uno
- Resumen con lo que debe cada persona
- Montos en formato ARS (punto para miles, coma para decimales)


## Requisitos

- Node 18+
- Ionic CLI

## Correr en Android


```
// ============= Generacion de carpeta android ============== //

ionic cap add android
ionic cap sync

// ================ Restauracion de iconos ================== //
// ====== (toma `resources/icon-only.png` como fuente) ====== //

npm install @capacitor/assets --save-dev
npx capacitor-assets generate

// ======================= Correr =========================== //

ionic cap run android
```

