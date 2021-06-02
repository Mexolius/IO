import { useState } from "react";
import { Database } from "../../../Structure/Database";
import { GraphData } from "../../../Structure/DataModel.interface";

import Plot from 'react-plotly.js';
import { PlotMarker } from "plotly.js";

const GraphView = (props: { _id: string }) => {

    const [graph, setGraph] = useState(new Array<GraphData>());


    if (graph.length === 0) {
        Database.getGraph(props._id)
            .then(g => {
                console.log(g)
                setGraph(g)
            })
            .catch(() => { });

    }

    return (
        <>
            {Array.from(graph.values()).map((v, k) => {
                const x = Array.from(new Array(v.points.length), (x, y) => y);

                const marker: Partial<PlotMarker> = {color:x.map((x, y) => {
                    return y === v.studentPointsPosition ? "green":"blue"
                })}
                console.log(marker);

                return <Plot
                    key={"plot_"+k}
                    style={{
                        width: "100%"
                    }}
                    data={[{
                        x: x,
                        y: v.points,
                        type: 'bar',
                        marker: marker
                    }]}
                    layout={{ height: 300, autosize: true, title: v.gradeName }}
                />
            })}

        </>
    )

}

export default GraphView;