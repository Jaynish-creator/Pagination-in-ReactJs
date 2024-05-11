import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './Common-style.css'


function Loadbtn() {
    const [userData, setUserData] = useState([])
    const { per_page } = useParams()
    const [currentpage, setCurrentpage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [totalpage, setTotalpage] = useState([])
    let numberofpage = []

    useEffect(() => {
        async function fetchData(per_page) {
            try {
                setIsLoading(true)
                const respond = await fetch(`https://reqres.in/api/users?per_page=${per_page}&page=${currentpage}`)
                const respondData = await respond.json()
                const userData = respondData.data
                setUserData(data => [...data, ...userData]);
                setTotalpage(respondData.total_pages)
            }
            catch (error) {
                console.log({ error: error, message: error.message })
            }
            setIsLoading(false)
        }
        let per_page = 2
        fetchData(per_page)
    }, [per_page, currentpage])

    const handelClick = () => {
        setCurrentpage(currentpage + 1)
        // console.log(currentpage)
    }
    for (let i = 1; i <= totalpage; i++) {
        numberofpage.push(i)
    }
    // console.log(numberofpage.length)

    return (
        <>
            {userData.map((data) => (
                <div key={data.id} className='container'>
                    <div className="grid-item">
                        <div className="grid-content">
                            <div className="firstname">{data.first_name}</div>
                            <div className="lastname">{data.last_name}</div>
                            <div className="email">{data.email}</div>
                            <div className="avtar">
                                <img src={data.avatar} alt={data.first_name} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="loader-wrap">
                    <span className="loader"></span>
                </div>
            )}
            {(currentpage !== totalpage) && (
                <div className="btn-wrap">
                    <button className="btn" onClick={handelClick}>Load More</button>
                </div>
            )}
        </>
    )
}

export default Loadbtn
