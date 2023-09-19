/**
 * Ищем поле в обьекте на любом уровне вложенности
 * @param object obj
 * @param string key
 * @returns string | undefined
 */
module.exports = function findDeepValue(obj, key) {
  // Проверяем, есть ли ключ в текущем объекте
  console.log("findDeepValue obj", obj);
  if (obj?.hasOwnProperty(key)) {
    return obj[key];
  }

  // Иначе проходим по всем свойствам объекта
  for (var prop in obj) {
    // Проверяем, является ли свойство объектом
    if (typeof obj[prop] === "object") {
      // Рекурсивно вызываем функцию для вложенного объекта
      var result = findDeepValue(obj[prop], key);
      // Если значение найдено, возвращаем его
      if (result !== undefined) {
        return result;
      }
    }
  }

  // Если ключ не найден во всем объекте, возвращаем undefined
  return undefined;
};
