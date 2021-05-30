import { useState } from "react";
import { GraphData } from "../../../Structure/DataModel.interface";

const GraphView = (props:any) => {

    const [graph, setGraph] = useState({} as GraphData);

    return(<h2>Hello Stats</h2>)

}

export default GraphView;