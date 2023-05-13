import "./App.css";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Word", key: "word" },
  { label: "Count", key: "count" },
];

function App() {
  const [isContent, setIsContent] = useState("");
  const [mostOccure, setMostOccure] = useState([]);

  function compare(first, second) {
    return second.count - first.count;
  }

  async function fetchData() {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const data = await response.text();
    setIsContent(data);
    const temp = data.split("\n");
    let temp2 = [];
    temp.forEach((ele) => {
      ele.split(" ").map((e) => {
        if (
          e[e.length - 1] === "?" ||
          e[e.length - 1] === "." ||
          e[e.length - 1] === "," ||
          e[e.length - 1] === ";" ||
          e[e.length - 1] === "," ||
          e[e.length - 1] === ")"
        ) {
          e = e.substring(0, e.length - 1);
        } else if (e !== "," && e !== "." && e !== "/" && e !== "")
          temp2.push(e);
      });
    });

    // console.log(temp2);
    const dataSplit = temp2.map((ele) => ele.toLowerCase());
    const hashmap = {};

    dataSplit.forEach((ele) => {
      hashmap[ele] = 0;
    });

    dataSplit.forEach((ele) => {
      hashmap[ele]++;
    });

    // console.log("Hasmap: ", hashmap);

    const histogramdata = [];

    Object.keys(hashmap).forEach((word) => {
      histogramdata.push({ word: word, count: hashmap[word] });
    });

    // console.log(histogramdata);

    const actualdata = histogramdata.sort(compare);
    // console.log(actualdata);

    actualdata.splice(20, actualdata.length - 1);
    // console.log(actualdata);
    setMostOccure(actualdata);
  }

  return (
    <div className="py-4 ">
      <button
        className="btn btn-success"
        type="button"
        onClick={() => {
          fetchData();
        }}
        style={{ marginRight: "20px", marginLeft: "30px" }}
      >
        Submit
      </button>
      <CSVLink
        data={mostOccure}
        headers={headers}
        filename="Terribly_Tiny_Tales"
      >
        <button className="btn btn-primary" type="button">
          Export
        </button>
      </CSVLink>

      {isContent ? (
        <div style={{ marginLeft: "200px", marginTop: "100px" }}>
          <ResponsiveContainer className="mb-4" width="80%" aspect={3}>
            <BarChart data={mostOccure} width={400} height={400}>
              <XAxis dataKey="word" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8883d8" />
            </BarChart>
          </ResponsiveContainer>
          <h1 className="pt-4">
            Terribly Tiny Tales:{" "}
            <span style={{ color: "#8883d8" }}>Word Analysis Project</span>
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
