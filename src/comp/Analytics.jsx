import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    ArcElement,
} from 'chart.js';
import { Bar, Chart, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    ArcElement

);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },

        title: {
            display: true,
            text: 'Liked Vacations',
        },
    },
};




export default function Analytics({ allVacations, update }) {
    const [likedVactionsNumber, setLikedVactionsNumber] = useState([])

    useEffect(() => {
        (async () => {
            const res2 = await fetch(`https://final-project-react-node-sql.herokuapp.com/vacations//likes/likes`, {
                headers: { 'content-type': 'application/json' }
            })
            const data2 = await res2.json()
            setLikedVactionsNumber(data2)
        })()
    }, [update])
    const userVacationsArr = []
    userVacationsArr.push(...allVacations)
    userVacationsArr.sort((a, b) => b.likenumber - a.likenumber)
    console.log(userVacationsArr)
    for (const vac of userVacationsArr) {
        const numberOfLikes = likedVactionsNumber.filter(item => item.destination_id == vac.id)
        vac.likenumber = numberOfLikes.length
    }

    const labels = userVacationsArr.filter(v => v.likenumber > 0).map(v => v.destionation);
    const numberOfLikes = userVacationsArr.filter(v => v.likenumber > 0).map(v => v.likenumber)
    console.log(numberOfLikes)
    const data = {
        labels,
        datasets: [
            {
                label: 'Number Of Likes',
                data: numberOfLikes,
                backgroundColor:
                    'rgba(54, 162, 235, 0.2)',
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            }
        ],
    };

    return (
        <div>
            <Bar height="130vh" data={data} />
        </div>
    )
}
