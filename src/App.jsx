import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  
  const [allData, setData] = useState([]);
  const [user, setUser] = useState();
  const [bioData, setBioData] = useState('')
  const [userJobTitle, setJobTitle] = useState()
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userEmail, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [userSkeletonShow, setShowUserSkeleton] = useState(false)
  useEffect(() => {
    setShowSkeleton(true)
    setErrorMessage('')
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(res => {

        setData(res.data)
        return setShowSkeleton(false)
      })
      .catch(err => {
        setShowSkeleton(false);
        setErrorMessage('No data to show')
        setData([])
        console.log(err.message)
      })
  }, []);
  const handleUserClick = (id) => {
    setShowUserSkeleton(true)
    axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`)
      .then(res => {

        setShowUserSkeleton(false)
        const findData = res?.data
        setEmail(findData?.profile?.email)
        setJobTitle(findData?.jobTitle)
        setBioData(findData?.Bio)
        setFirstName(findData?.profile?.firstName)
        setLastName(findData?.profile?.lastName)
        setUserImage(findData?.avatar)
        return setUser(findData);
      })
      .catch(err => {

        console.log(err.message)
        return setShowUserSkeleton(false)
      });

  }
  return (
    <div className="App">
      <div className="container py-5">
        <div className="row ">
          <div className="col-md-6 position-relative blur blur1">
            <div className="bg-white text-black py-3 px-2 position-sticky top-0 fs-4 fw-bolder rounded">
              USERS LISTS
            </div>
            {errorMessage &&
              <p className="text-danger mt-4 fs-3 fw-bolder">
                {errorMessage}
              </p>}
            {!showSkeleton ? <div className='mt-3 col'>
              {
                allData?.map(singleUser =>
                  <div key={singleUser?.profile.username} onClick={() => handleUserClick(singleUser?.id)} style={{ cursor: 'pointer' }}>
                    <div className="my-2  d-flex align-items-center gap-2 ps-2  py-3 bg-white text-black rounded">
                      {singleUser?.avatar && <img width="50" height="50" className='rounded-circle' src={singleUser?.avatar} alt="" />}


                      <p className='mb-0'>{singleUser?.profile.firstName + ' ' + singleUser?.profile.lastName}</p>
                    </div>

                  </div>)
              }
            </div> : <>
              <Skeleton style={{ height: '64px' }} count={8} />
            </>}
          </div>





          <div className="col-md-5 px-4 fw-bold position-relative blur">
            <div className="position-sticky top-0">
              <div className="bg-white text-black py-3 px-2 fs-4 fw-bolder rounded">
                USERS DETAILS
              </div>
              {!userSkeletonShow && user &&
                <div className="user_info">
                  {userImage && <img src={userImage} className="rounded-circle mt-3" alt="" />}
                  {user?.profile?.username && <p className="bg-white mb-0 mt-2 py-2 rounded text-black">
                    @{user?.profile?.username}
                  </p>}
                  {user &&
                    <Form className='mt-3 text-start '>
                      <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control className="bg-white text-black" readOnly
                          as="textarea" defaultValue={bioData}
                          style={{ height: '100px' }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3" controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control className="bg-white text-black" defaultValue={firstName + ' ' + lastName} readOnly type="text" />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3" controlId="formBasicJobTitle">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control className="bg-white text-red" defaultValue={userJobTitle} readOnly type="text" />
                      </Form.Group>
                      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="bg-white text-black" defaultValue={userEmail} readOnly type="email" />
                      </Form.Group>
                    </Form>}
                </div>
              }
              {userSkeletonShow && <div className="skeleton-div">
            <Skeleton style={{width: '128px', height: '128px'}} className="rounded-circle"></Skeleton>
            <Skeleton style={{height: '30px'}}></Skeleton>
            <Skeleton className='mt-2' style={{height: '100px'}}></Skeleton>
            <Skeleton className='mt-2' style={{height: '40px'}}></Skeleton>
            <Skeleton className='mt-2' style={{height: '40px'}}></Skeleton>
            <Skeleton className='mt-2' style={{height: '40px'}}></Skeleton>
        </div>}

              {!user && !userSkeletonShow && <div className="d-flex flex-column mt-4">
                <div><img src="search.png" alt="" /></div>
                <p className='mb-0 fs-5 mt-2 text-black fw-bold'>Please select user to see details</p>
              </div>
              }

            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App
