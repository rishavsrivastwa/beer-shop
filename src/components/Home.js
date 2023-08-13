import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Navbar from './Navbar'

const Home = () => {
    // UseState
    const [beersAll, setBeersAll] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
    const recordPerPage = 10;
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const npage = Math.ceil(beersAll.length / recordPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const fetchData = async () => {
        try {
            const responseall = await axios.get(`https://api.punkapi.com/v2/beers`);
            setBeersAll(responseall.data);
        } catch (error) {
            console.log('Error in fetching data:', error);
        }
        
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    // Favourite Btn Function
    async function addBtn(url, name, tag, des) {
     
        const data={
            img_url: url,
            name: name,
            tagline: tag,
            description: des 
        }

        try {
        
            const response = await axios.post(`http://localhost:3000/favbeers`,data)
            console.log("respons data",response.data);
    
            alert(name+" is added successfully!");
            
        } catch (error) {
            console.log("Someting went wrong!",error);
        }

    }

    // Pagination functions
    const prePage = () => {
        if(firstIndex >= 1 && currentPage !== firstIndex){
            setCurrentPage(currentPage - 1)
        }
    }
    const changeCPage = (id) => {
        setCurrentPage(id);

    }
    const nextPage = () => {
        if (lastIndex <=20 && currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }


    const filteredBeers = beersAll.filter(beer =>
        beer.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="text-center mt-5 pt-5 font-weight-bold text-uppercase text-primary">Beer Shop</h1>
                <div className='row justify-content-center mt-4'>
                    <input
                        className='form-control w-50'
                        value={searchQuery}
                        type="search"
                        placeholder="Search"
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="row row-cols-1 row-cols-md-3 mt-5">
                    {filteredBeers.length !== 0 ?
                        filteredBeers.slice(firstIndex,lastIndex).map(beer => (
                            <div key={beer.id}>
                                <div className="card w-100 mt-4">
                                    <h6 className='p-2'>{beer.id}</h6>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <img src={beer.image_url} style={{ height: "320px", width: "220px" }} className="p-2" alt="..." />
                                    </div>

                                    <div className="card-body">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <span onClick={()=>addBtn(beer.image_url,beer.name,beer.tagline,beer.description)}>
                                            <ThumbUpIcon/>
                                            </span>
                                        </div>
                                        <h4 className="card-title d-inline">{beer.name.substring(0, 12)}</h4>
                                        <h6 className='text-primary'>{beer.tagline}</h6>
                                        <p className="card-text small">{beer.description.substring(0, 87)}...</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <div className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary">
                            <h1 className="display-1 fw-bold text-white">Not Found</h1>
                        </div>
                    }
                </div>

                {/* pagination */}
                <div className='mt-5 d-flex justify-content-center align-items-center'>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                </li>

                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link' onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home