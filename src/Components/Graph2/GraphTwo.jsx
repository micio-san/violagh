import React from "react";
import { parseHr } from "../../Utility/UtilityFunctions"
import { Chart, registerables, Filler } from "chart.js"
import { Line } from "react-chartjs-2";
import NoData from "./NoData";
Chart.register(...registerables, Filler)

function GraphTwo({ state, allTimes, date }) {
    const hrs = parseHr(allTimes)
    const clrs = ["#4A42A8", "#993366", "#6FBA68", "#0b0a0b96"]

    function checkEmptyness() {
        const isEmpty = Object.values(state).filter((item) => {
            return item.length > 0
        })
        return isEmpty.length == 0 ? true : false
    }

    if (checkEmptyness()) {
        return <>
            <NoData date={date} />
        </>
    }

    const options = {
        mantainAspectRatio: false,
        layout: {
            padding: 0,
        },
        plugins: {
            backgroundColor: clrs[3],
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: clrs[3],
                title: {
                    display: false,
                },
            }
        },
        scales: {
            y: {
                border: {
                    color: clrs[1],
                    width: 3
                },
                grid: {
                    drawBorder: true,
                    color: clrs[1],
                    tickLength: 24,
                },
                ticks: {
                    min: 12,
                    color: clrs[1],
                    labelOffset: 13,
                    padding: 0,
                    font: {
                        size: 20,
                        weight: "bold",
                        family: "'Quicksand', sans-serif"
                    },
                }
            },
            x: {
                border: {
                    color: clrs[1],
                    width: 3
                },
                grid: {
                    drawBorder: true,
                    color: clrs[1],
                },
                ticks: {
                    padding: 24,
                    font: {
                        size: 20,
                        weigth: 300,
                        family: "'Quicksand', sans-serif"
                    },
                    color: "rgba(11, 10, 11, 0.5882352941)"
                }
            }
        },
        chartArea: {
            backgroundColor: 'rgba(251, 85, 85)'
        }
    }

    const data = {
        labels: hrs,
        datasets: [
            {
                label: "Uomini Totale",
                data: state.totMen,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                addFill: true,
                radius: 4
            },
            {
                label: "Donne Totale",
                data: state.totWomen,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Sconosciuti",
                data: state.unk,
                backgroundColor: clrs[2],
                borderColor: clrs[2],
                tension: 0.4,
                radius: 4

            },
            {
                label: "Uomini 0-17",
                data: state.men1,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 18-34",
                data: state.men2,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 35-49",
                data: state.men3,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 50-64",
                data: state.men4,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Uomini 65+",
                data: state.men5,
                backgroundColor: clrs[0],
                borderColor: clrs[0],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 0-17",
                data: state.fem1,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 18-34",
                data: state.fem2,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 35-49",
                data: state.fem3,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 50-64",
                data: state.fem4,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },
            {
                label: "Donne 65+",
                data: state.fem5,
                backgroundColor: clrs[1],
                borderColor: clrs[1],
                tension: 0.4,
                radius: 4
            },

        ]
    }

    return <Line data={data} options={options}>
    </Line >
}

export default GraphTwo