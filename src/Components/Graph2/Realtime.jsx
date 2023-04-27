import React, { useState, useEffect } from "react";
import { parseAPIDate, getAges } from "../../Utility/UtilityFunctions"
import Loadingwheel from "../Loadingwheel";

function Realtime() {
    const time = (15 * 60) * 1000
    const [dataList, setDataList] = useState()

    const fetchRealtime = async () => {
        try {
            const dati = await fetch("https://viola-counter.herokuapp.com/api/realtime-traffics?pageCount");
            const dataParsed = await dati.json();
            const dataSorted = await dataParsed.data.sort((a, b) => b.id - a.id)
            const removeMore15 = dataSorted.filter((item) => {
                const parseDate = (x) => Date.parse(x);
                //filtro i dati degli ultimi 15mins
                return parseDate(item.attributes.createdAt) > parseDate(dataSorted[0].attributes.createdAt) - time
            })
            const mapping = removeMore15.map((item) => {
                return Object.entries(item.attributes)
            })
            const x = mapping.map((item) => {
                return item.filter(secArr => secArr[0] === "createdAt" || secArr[1] > 0)
            })
            const trimming = x.length > 10 ? x.slice(0, 10) : x
            setDataList(trimming)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchRealtime()
        const intervalCall = setInterval(() => {
            fetchRealtime()
            console.log("data")
        }, 8000);
        return () => {
            clearInterval(intervalCall);
        };
    }, [])

    if (!dataList) {
        return <Loadingwheel sm={true} />
    }

    return <article className="realtime-container">
        {
            dataList.map(item => {
                return <article className="realtime-item" key={item[1][1]}>
                    <div className={item[0][0].startsWith("M") ? "color-cont color-cont_men" : "color-cont color-cont_women"}>
                    </div>
                    <h2>   {
                        item[0][0].startsWith("M") ? "Uomo" : "Donna"
                    }</h2>
                    <h2>{getAges(item[0][0])}</h2>
                    <h2>{parseAPIDate(item[1][1])}</h2>
                </article>
            })
        }
    </article>
}

export default Realtime;
