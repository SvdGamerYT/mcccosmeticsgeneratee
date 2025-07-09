// script.js
document.getElementById("thickness").addEventListener("input", function () {
  document.getElementById("thicknessValue").textContent = this.value + "x";
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) return alert("Sube un archivo JSON primero");

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const model = JSON.parse(e.target.result);
      const thickness = parseFloat(document.getElementById("thickness").value);
      const style = document.getElementById("style").value;

      const outlined = createOutline(model, thickness);
      const result = {
        ...outlined,
        textures: { outline: "item/outline_texture" },
      };

      document.getElementById("output").textContent = JSON.stringify(result, null, 2);
    } catch (err) {
      alert("Archivo JSON inválido: " + err.message);
    }
  };

  reader.readAsText(file);
});

function createOutline(model, thickness) {
  const outlined = JSON.parse(JSON.stringify(model));
  if (!outlined.elements) return outlined;

  outlined.elements = outlined.elements.map((el) => {
    const center = [(el.from[0] + el.to[0]) / 2, (el.from[1] + el.to[1]) / 2, (el.from[2] + el.to[2]) / 2];
    const size = [el.to[0] - el.from[0], el.to[1] - el.from[1], el.to[2] - el.from[2]];
    const newSize = size.map((s) => s * thickness);

    const newEl = JSON.parse(JSON.stringify(el));
    newEl.from = center.map((c, i) => c - newSize[i] / 2);
    newEl.to = center.map((c, i) => c + newSize[i] / 2);

    if (newEl.faces) {
      for (const face in newEl.faces) {
        if (newEl.faces[face].texture) {
          newEl.faces[face].texture = "#outline";
        }
      }
    }

    return newEl;
  });

  return outlined;
}
