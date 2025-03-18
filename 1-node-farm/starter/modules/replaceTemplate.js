module.exports = (template, el) => {
  let output = template;
  for (let key in el) {
    output = output.replaceAll(`{%${key.toUpperCase()}%}`, el[key]);
  }
  if (!el.organic) {
    output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");
  }
  return output;
};