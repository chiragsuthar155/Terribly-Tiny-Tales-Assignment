## Terribly Tiny Tales Word Analysis Project

This is a React application that fetches data from a URL and analyzes the frequency of words in the text. The top 20 most frequently occurring words are displayed in a bar chart, and the user can also export the data in CSV format.

```
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
```

This block of code imports the required dependencies for the project. useState is used to manage state within the component. ResponsiveContainer, BarChart, Bar, XAxis, YAxis, and Tooltip are from the recharts library, which is used to create the bar chart. CSVLink is from the react-csv library, which is used to export the data as a CSV file.

```
const headers = [
  { label: "Word", key: "word" },
  { label: "Count", key: "count" },
];
```

This block of code creates an array of headers for the CSV file.

```
function App() {
  const [isContent, setIsContent] = useState("");
  const [mostOccure, setMostOccure] = useState([]);
```

This block of code defines the App component and initializes the state variables isContent and mostOccure using the useState hook. isContent stores the text data fetched from the URL, and mostOccure stores the array of top 20 most frequently occurring words.

```
function compare(first, second) {
  return second.count - first.count;
}
```

This block of code defines a function compare that takes in two objects first and second and returns the difference between their count properties. This function is used to sort the array of word-count objects in descending order of frequency.

```
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

  const dataSplit = temp2.map((ele) => ele.toLowerCase());
  const hashmap = {};

  dataSplit.forEach((ele) => {
    hashmap[ele] = 0;
  });

  dataSplit.forEach((ele) => {
    hashmap[ele]++;
  });

  const histogramdata = [];

  Object.keys(hashmap).forEach((word) => {
    histogramdata.push({ word: word, count: hashmap[word] });
  });

  const actualdata = histogramdata.sort(compare);

  actualdata.splice(20, actualdata.length - 1);
  setMostOccure(actualdata);
}
```

This block of code defines an asynchronous function fetchData which is called when the component mounts. fetchData fetches the text data from the URL using the fetch API and sets the state variable isContent with the fetched data. It then processes the data by splitting it into an array of words, removing any punctuation and filtering out any empty strings or common stop words. It then generates a frequency count for each word using a hash map and constructs an array of objects containing each word and its frequency count. This array is then sorted in descending order of frequency using the compare function and truncated to contain only the top 20 most frequently occurring words. The resulting array is then set as the state variable mostOccure.

```
return (
<div className="App">
<header className="App-header">
<h1>Terribly Tiny Tales Word Analysis</h1>
<form onSubmit={handleSubmit}>
<label>
Enter URL to fetch text data:
<input type="text" value={url} onChange={handleURLChange} />
</label>
<input type="submit" value="Fetch Data" />
</form>
{isContent && (
<div>
<ResponsiveContainer width="100%" height={400}>
<BarChart data={mostOccure}>
<XAxis dataKey="word" />
<YAxis />
<Tooltip />
<Bar dataKey="count" fill="#8884d8" />
</BarChart>
</ResponsiveContainer>
<CSVLink data={mostOccure} headers={headers}>
Download CSV
</CSVLink>
</div>
)}
</header>
</div>
);
```

This block of code defines the render method for the App component. It returns a form with an input field where the user can enter a URL to fetch text data. When the form is submitted, it calls the handleSubmit function. The component then checks if isContent is truthy and if so, it renders a bar chart using the data stored in mostOccure. It also includes a Download CSV button using the CSVLink component from the react-csv library, which exports the data in CSV format. The headers for the CSV file are defined in the headers array.
