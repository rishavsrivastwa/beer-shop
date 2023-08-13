import React, { useEffect, useState } from 'react'
import axios from "axios";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Navbar from './Navbar'

const Favourite = () => {

    const [favdata, Setfavdata] = useState([]);
    useEffect(() => {
        getAllData();
    }, [])

    async function getAllData() {
        try {
            const response = await axios.get("http://localhost:3000/favbeers")
            Setfavdata(response.data);
        } catch (error) {
            console.log("Something went wrong!")
        }
    }

    const handleDelete = async id => {
        await axios.delete(`http://localhost:3000/favbeers/${id}`);
        var newfavdata = favdata.filter((item) => {
            return item.id !== id;
        })
        // alert("Remove Successfully!");
        Setfavdata(newfavdata);
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
            <h1 className="text-center mt-5 pt-5 font-weight-bold text-uppercase text-primary">Favourite Items</h1>
                <div className="row row-cols-1 row-cols-md-3 mt-5">
                    {favdata.length !== 0 ?
                        favdata.slice(0,favdata.length).map(item => (
                            <div key={item.id}>
                                <div className="card w-100 mt-4">
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <img src={item.img_url} style={{ height: "320px", width: "220px" }} className="p-2" alt="..." />
                                    </div>

                                    <div className="card-body">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <span onClick={() => handleDelete(item.id)}>
                                                <ThumbDownIcon />
                                            </span>
                                        </div>
                                        <h4 className="card-title d-inline">{item.name.substring(0, 12)}</h4>
                                        <h6 className='text-primary'>{item.tagline}</h6>
                                        <p className="card-text small">{item.description.substring(0, 87)}...</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <div className="d-flex align-items-center justify-content-center vh-100 w-100 bg-primary">
                            <h1 className="display-1 fw-bold text-white">No Items in list</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Favourite