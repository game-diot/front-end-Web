// 随机数据生成模块
var randomController = (function () {
  function randomScale() {
    var scale = Math.random() * 5;
    return scale.toFixed(1); // 保留一位小数
  }

  function randomColor() {
    var red, green, blue, opacity, rgba;
    red = Math.floor(Math.random() * 256) + 1; // 0 ~ 255
    green = Math.floor(Math.random() * 256) + 1;
    blue = Math.floor(Math.random() * 256) + 1;
    opacity = Math.random() * 0.9 + 0.1; // [0.1,1)
    // 生成颜色字符串，注意去掉空格以保持一致
    rgba =
      "rgba(" + red + "," + green + "," + blue + "," + opacity.toFixed(1) + ")";
    return rgba;
  }

  function randomPosition() {
    var horizontal, vertical, pos;
    horizontal = Math.floor(Math.random() * 100) + 1 + "%"; // 1% ~ 100%
    vertical = Math.floor(Math.random() * 100) + 1 + "%";
    pos = [vertical, horizontal];
    return pos;
  }

  return {
    choosedShape: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },
    styledShape: function () {
      var scale, color, position, shapeValue;
      scale = randomScale();
      color = randomColor();
      position = randomPosition();
      shapeValue = {
        shapeScale: scale,
        shapeColor: color,
        shapePosition: position,
      };
      return shapeValue;
    },
  };
})();

// UI 控制模块
var UIController = (function () {
  var shapeType = [
    "rectangle-vertical",
    "rectangle-horizontal",
    "whole-triangle",
    "left-triangle",
    "right-triangle",
    "circle",
    "square",
  ];
  return {
    getShapeType: function () {
      return shapeType;
    },
    buildShape: function (shapeIndex, shapeData) {
      var shapeForm, classShape, shapeStyle, finalStyle, finalShape;
      shapeForm = shapeType[shapeIndex];
      // 针对三角形使用 border-bottom-color，其它使用 background-color
      if (
        shapeForm === "whole-triangle" ||
        shapeForm === "left-triangle" ||
        shapeForm === "right-triangle"
      ) {
        classShape = "shape triangle " + shapeForm;
        shapeStyle =
          "border-bottom-color: %color_value%; top: %vertical_value%; left: %horizontal_value%;";
      } else {
        classShape = "shape " + shapeForm;
        shapeStyle =
          "background-color: %color_value%; top: %vertical_value%; left: %horizontal_value%;";
      }
      // 替换样式中对应的占位符
      finalStyle = shapeStyle.replace("%color_value%", shapeData.shapeColor);
      finalStyle = finalStyle.replace(
        "%vertical_value%",
        shapeData.shapePosition[0]
      );
      finalStyle = finalStyle.replace(
        "%horizontal_value%",
        shapeData.shapePosition[1]
      );

      finalShape = document.createElement("span");
      finalShape.className = classShape;
      finalShape.style.cssText = finalStyle;
      finalShape.style.transform = "scale(" + shapeData.shapeScale + ")";
      finalShape.style.transition = "all 0.3s ease-in-out";

      // 将颜色和形状类型保存为自定义属性，便于后续读取
      finalShape.setAttribute("data-color", shapeData.shapeColor);
      finalShape.setAttribute("data-shape", shapeForm);

      // 点击图形时显示信息，同时阻止事件冒泡避免生成新图形
      finalShape.addEventListener("click", function (event) {
        event.stopPropagation();
        // 通过 dataset 读取已保存的数据，确保数据准确性
        showInfoBox(event, this.dataset.shape, this.dataset.color);
      });

      document.querySelector(".demo").appendChild(finalShape);
    },
  };
})();

// 显示信息框的全局函数
function showInfoBox(event, shapeType, color) {
  var infoBox = document.getElementById("infoBox");
  // 将信息框定位到点击处附近（向右下偏移 10px）
  infoBox.style.left = event.pageX + 10 + "px";
  infoBox.style.top = event.pageY + 10 + "px";
  infoBox.innerHTML = "形状: " + shapeType + "<br>颜色: " + color;
  infoBox.style.display = "block";

  // 3秒后隐藏信息框
  setTimeout(function () {
    infoBox.style.display = "none";
  }, 3000);
}

// 主控制器
var controller = (function (randomCtrl, UICtrl) {
  var demoContainer = document.querySelector(".demo");

  var watchEvent = function () {
    // 仅在点击 demo 空白区域时生成新图形
    demoContainer.addEventListener("click", function (event) {
      if (event.target === demoContainer) {
        deleteInstruction();
        addElement();
      }
    });
  };

  var deleteInstruction = function () {
    var instruction = document.querySelector(".instruction");
    if (instruction !== null) {
      instruction.remove();
    }
  };

  var addElement = function () {
    var shapeArr, shapeIndex, shapeData;
    shapeArr = UICtrl.getShapeType();
    shapeIndex = randomCtrl.choosedShape(shapeArr);
    shapeData = randomCtrl.styledShape();
    UICtrl.buildShape(shapeIndex, shapeData);
  };

  return {
    init: function () {
      watchEvent();
    },
  };
})(randomController, UIController);

controller.init();
