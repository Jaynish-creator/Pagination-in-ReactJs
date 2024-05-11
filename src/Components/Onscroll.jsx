import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Common-style.css"


function Onscroll() {
    const [userData, setUserdata] = useState([])
    const { per_page } = useParams()
    const [currentpage, setCurrentpage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData(per_page) {
            try {
                setIsLoading(true)
                const respond = await fetch(`https://reqres.in/api/users?per_page=${per_page}&page=${currentpage}`)
                const responData = await respond.json()
                const userData = responData.data
                setUserdata(data => [...data, ...userData]);
            } catch (error) {
                console.log({ error: error, message: error.message })
            }
            setIsLoading(false)
        }

        const per_page = 2
        fetchData(per_page)

    }, [per_page, currentpage])

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCurrentpage(currentpage + 1)
        }
    }
    window.addEventListener('scroll', handleScroll);

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

        </>
    )
}

export default Onscroll
