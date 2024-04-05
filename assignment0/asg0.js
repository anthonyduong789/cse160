
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById("example");
  
    if (!canvas) {
      console.log("Failed to retrieve the <canvas> element");
      return;
    }
    // Get the rendering context for 2DCG
    let v1 = new Vector3([2.25, 2.25, 0]);
    var ctx = canvas.getContext("2d");
    // Draw a blue rectangle
    ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // Set a blue color
    ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
    /**
     *
     * @param {*} v
     * @param {*} color
     */
    var V1 = new Vector3([2.25, 2.25, 0]);
    var V2 = new Vector3([2.25, 2.25, 0]);
    function drawVector(v, color) {
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
    drawVector(v1, "red");
    function handleDrawEvent() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // set it black
      ctx.fillRect(0, 0, 400, 400);
      let v1_x = document.getElementById("v1_x").value;
      let v1_y = document.getElementById("v1_y").value;
      let v2_x = document.getElementById("v2_x").value;
      let v2_y = document.getElementById("v2_y").value;
      let copy = new Vector3([v1_x, v1_y, 0]);
      let copy2 = new Vector3([v2_x, v2_y, 0]);
  
      V1.set(copy);
      V2.set(copy2);
      // V1.set([x, y, 0]);
      drawVector(V1, "red");
      drawVector(V2, "blue");
    }
    // V1.add(V2);
    V1.sub(V2);
    console.log(V1.elements);
    document.addEventListener("documentLoaded", function () {
      var button = document.getElementById("DrawButton");
      button.addEventListener("click", handleDrawEvent);
    });
  }
  