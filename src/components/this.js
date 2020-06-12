(() => {
  const continha = document
    .getElementsByClassName("form-group")[2]
    .getElementsByTagName("label")[0].innerText;

  const a = continha
    .slice(continha.indexOf("+"))
    .replace("+", "")
    .replace("?", "")
    .trim();

  const b = continha
    .slice(continha.indexOf("é"), continha.indexOf("+"))
    .replace("é", "")
    .replace("?", "")
    .replace("+", "")
    .trim();

  const continhaInput = document
    .getElementsByClassName("form-group")[2]
    .getElementsByTagName("input")[0];

  continhaInput.value = parseInt(a) + parseInt(b);
})();
