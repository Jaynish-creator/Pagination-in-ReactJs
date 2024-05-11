
import React, { useEffect, useState } from 'react'
import './Common-style.css'
// import { useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner'

function Pagination() {
    const [userdata, setUserdata] = useState([]);
    // const { per_page } = useParams()
    const [currentpage, setCurrentpage] = useState(1)
    const [totalpage, setTotalpage] = useState([])
    let numberofpage = []
    const [perpage, setPerpage] = useState(2)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const respond = await fetch(`https://reqres.in/api/users?per_page=${perpage}&page=${currentpage}`)
                const respondData = await respond.json()
                const userData = respondData.data
                // const total_pages = respondData.total_pages;
                setUserdata(userData)
                setTotalpage(respondData.total_pages)

            } catch (error) {
                console.log({ error: error, message: error.message })
            }
            setIsLoading(false)
        }
        fetchData()
    }, [perpage, currentpage])

    for (let i = 1; i <= totalpage; i++) {
        numberofpage.push(i)
    }
    // console.log(numberofpage);

    const handleChange = (number) => {
        setCurrentpage(number);
    }
    const handelPrevPage = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    }
    const handelNextPage = () => {
        if (currentpage < totalpage) {
            setCurrentpage(currentpage + 1);
        }
    }

    const handelChange = (event) => {
        const selectedPerPage = event.target.value;
        setPerpage(selectedPerPage)
    }

    return (
        <>
            <label htmlFor='Per page'>Per Page: </label>
            <select onChange={handelChange}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="12">12</option>
            </select>

            {userdata.map((data) => (
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
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            
            <div className="pagination-line">
                <div className='number' onClick={handelPrevPage}>&laquo;</div>
                {numberofpage.map((number) => (
                    <div key={number} className={`number ${currentpage == number ? 'active' : ''}`} onClick={() => handleChange(number)}>{number}</div>
                ))}
                <div className='number' onClick={handelNextPage}>&raquo;</div>
            </div>

        </>
    )
}
export default Pagination;
