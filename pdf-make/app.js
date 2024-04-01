const express = require("express");
const PdfPrinter = require("pdfmake");
const app = express();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

app.get("", async (req, res) => {
  let tempArr = [1, 2, 3, 4];
  let rowDataTemp = [
    {
      image: "Image.jpg",
      fit: [150, 150],
      border: [false, true, false, false],
      borderColor: ["red", "red", "red", "red"],
    },
    {
      text: "This is a demo image\nThis is not good\nthis is the best",
      border: [false, true, false, false],
      borderColor: ["red", "red", "red", "red"],
    },
  ];
  var rowArr = [["", ""]];
  for (let i = 0; i < tempArr.length; i++) {
    let rowData = [
      {
        image: "Image.jpg",
        fit: [150, 150],
        border: [false, true, false, false],
        borderColor: ["#008080", "#008080", "#008080", "#008080"],
      },
      {
        text: [
          {
            text: "Entry " + (i + 1) + "\n",
            fontSize: 15,
            bold: true,
          },
          {
            text: "My name is khan and \n I am not a terrorist.",
          },
        ],

        border: [false, true, false, false],
        borderColor: ["#008080", "#008080", "#008080", "#008080"],
        //margin: [0, 5, 0, 0],
      },
    ];
    rowArr.push(rowData);
  }

  console.log(rowArr);
  var actualData = [
    [
      {
        image: "Image.jpg",
        fit: [150, 150],
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
      {
        text: "This is a demo image\nThis is not good\nthis is the best",
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
    ],
    [
      {
        image: "Image.jpg",
        fit: [150, 150],
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
      {
        text: "This is a demo image\nThis is not good\nthis is the best",
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
    ],
    [
      {
        image: "Image.jpg",
        fit: [150, 150],
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
      {
        text: "This is a demo image\nThis is not good\nthis is the best",
        border: [false, true, false, false],
        borderColor: ["red", "red", "red", "red"],
      },
    ],
  ];

  var fonts = {
    Roboto: {
      normal: "fonts/Roboto-Regular.ttf",
      bold: "fonts/Roboto-Medium.ttf",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
  };
  var printer = new PdfPrinter(fonts);
  var docDefinition = {
    content: [table(rowArr)],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream("Doc.pdf"));
  pdfDoc.end();
  res.send("Pdf generated");
});

function buildTableBody(data) {
  var body = [];

  data.forEach(function (row) {
    var dataRow = [];
    for (let i = 0; i < 2; i++) {
      dataRow.push(row[i]);
    }
    body.push(dataRow);
  });

  return body;
}

function table(data) {
  return {
    table: {
      unbreakable: true,
      headerRows: 1,
      widths: [160, 340],
      body: buildTableBody(data),
    },
    layout: {
      defaultBorder: false,
      paddingLeft: function (i, node) {
        return 0;
      },
      paddingRight: function (i, node) {
        return 0;
      },
      paddingTop: function (i, node) {
        return 2;
      },
      paddingBottom: function (i, node) {
        return 25;
      },
      hLineWidth: function (i, node) {
        return 2.75;
      },
    },
  };
}

app.listen(3000, () => {
  console.log("Server is up and running on port 3000.");
});
