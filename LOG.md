# LOG seminari 8

## referencias

- documentacion de nanostores (la misma que usamos en clase para el viewMode)
- el codigo del viewMode.ts del propio proyecto, me base en ese para entender como hacer el atom con localStorage
- el enunciado

## IA usada

claude code (la extension de vscode), no se exactamente que modelo era el que tenia puesto

---

## registro de prompts

### prompt 1

tenia claro que habia que usar nanostores pero no sabia si guardar solo el id del libro o el libro entero en el atom, le pregunte:

> si tengo un atom de nanostores con los favoritos, es mejor guardar solo el id del libro o el objeto entero? la lista de favoritos solo tiene que mostrar info del libro, no editar

me explico los tradeoffs: guardar el id es mas limpio pero necesitas volver a llamar a la api para pintar la lista; guardar el objeto entero evita la llamada pero si el libro se edita despues el favorito queda desactualizado. decidi guardar el objeto entero porque para este seminario no hay caso de uso de editar un libro y verlo inmediatamente en favoritos

### prompt 2

no tenia claro como hacer el listen de nanostores para persistir en localStorage, en el viewMode.ts ya lo habia pero queria entender por que funciona:

> en nanostores si uso atom.listen() para guardar en localStorage cada vez que cambia, cuando se monta el componente se dispara el listen o solo cuando el valor cambia de verdad?

me aclaro que listen solo se dispara cuando el valor cambia, no al montar, por eso hay que cargar el valor inicial de localStorage antes de crear el atom (lo que hace la funcion load())

### prompt 3

tenia un error de typescript con el JSON.parse:

> error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'Book[]'

> porque typescript no acepta directamente el resultado del JSON.parse como Book[]? pensaba que con tipar la variable como unknown y luego hacer el cast estaba bien

me explico que hay que hacer el cast explicitamente con `as Book[]` despues del Array.isArray(), que es el patron correcto porque el Array.isArray actua como type guard parcial pero no es suficiente para typescript sin el cast

---

## problemas

- al principio no habia hecho npm install asi que no funcionaba nada, obvio
- npm test falla con 2 tests pero comprobe con git stash que fallaban igual antes de mis cambios, no es cosa mia
- hay un warning de oxlint en ToastContext.tsx que tampoco es mio

## cosas que me llaman la atencion del codigo generado

guarda el libro entero en el localStorage en vez de solo el id. la ventaja es que FavouritesList no necesita hacer ninguna llamada a la api. pero si editas un libro despues, en favoritos seguira saliendo el titulo de antes hasta que lo desmarques y lo vuelvas a marcar. para el seminario no es un problema pero me parece una decision discutible
