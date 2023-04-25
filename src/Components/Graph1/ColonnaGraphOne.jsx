import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { parseDate } from "../../Utility/UtilityFunctions"

function ColonnaGraphOne({ data, maxHeight }) {

    //nMad :(nMad/50) = 624 : x
    const oneSectionHeight = maxHeight / 50;
    const graphHeight = 624 / oneSectionHeight;
    //calcolo scala;
    const ratioHeight = (n) => {
        return n * (graphHeight / 50)
    };

    const malesClr = ["#282270", "#4A42A8", "#665DCE", "#7D75D4", "#ACA6EB"];
    const femClr = ["#EEA8FF", "#D27DD6", "#B459B9", "#9B389E", "#68326A"].reverse();
    const unkTotClr = ["#6FBA68", "#727272"].reverse();
    const {
        date,
        unknown_total,
        total_sum,
        M1, M2, M3, M4, M5,
        F1, F2, F3, F4, F5,
        sales_point
    } = data;
    const [totals, setTotals] = useState([])
    const categories = ["M", "F", "N", "T"];
    const [males, setMales] = useState({});
    const [females, setFemales] = useState({})

    function renderGenders(x, clrArr) {
        return x.demo?.map((dem, key) => {
            return <div className="daily-data_col" key={key} style={{ height: `${ratioHeight(dem)}px`, background: `${clrArr[key]}` }}>
                <h3>{dem}</h3>
            </div>
        })
    }

    useEffect(() => {
        setMales({
            total: [M5, M4, M3, M2, M1].reduce((a, c) => a + c),
            demo: [M5, M4, M3, M2, M1]
        });
        setFemales({
            total: [F5, F4, F3, F2, F1].reduce((a, c) => a + c),
            demo: [F5, F4, F3, F2, F1]
        });
        setTotals([unknown_total, total_sum])

    }, [data]);

    return <>
        <Link to={`/${sales_point}/${date}`} className="daily-data_container"  >
            <div style={{ height: `${ratioHeight(males.total)}px` }} className="daily-data_col_tot">
                {
                    renderGenders(males, malesClr)
                }
            </div>
            <div style={{ height: `${ratioHeight(females.total)}px` }} className="daily-data_col_tot">
                {
                    renderGenders(females, femClr)
                }
            </div>
            {
                totals.map((one, idx) => {
                    return <div style={{ height: `${ratioHeight(one)}px`, background: `${unkTotClr[idx]}` }} key={idx} className="daily-data_col">
                        <h3>{one}</h3>
                    </div>
                })
            }
            <div className="labels_container">
                {
                    categories.map(one => {
                        return <h4 key={one} className="label">{one}</h4>
                    })
                }
            </div>
            <div className="dates-sm_container">
                <h4 className="date">  {
                    parseDate(date).slice(0, 5)
                }
                </h4>
            </div>
        </Link>
    </>

}

export default ColonnaGraphOne;
