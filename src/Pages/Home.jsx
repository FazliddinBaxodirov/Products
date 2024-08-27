import React, { useContext, useEffect, useState } from 'react'
import { useAxios } from '../Hooks/useAxios'
import { Context } from '../Context/Context'
import { Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Circles, InfinitySpin, RotatingLines } from 'react-loader-spinner'

function Home() {
    const { products, setProducts, dispatch, ACTIONS, state } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        useAxios().get('products').then(res => {
            const data = res.data.splice(2, 9)
            setProducts(data)
            setIsLoading(false)
        })
    }, [])
    function handleToSaved(){
        setTimeout(() => {
            navigate('/saved')
        },800)
    }
    return (
        <div >
            <Toaster position="top-right" reverseOrder={false} />
            <div className='flex items-center justify-between px-[50px] '>
                <h1 className='text-center mt-[30px] text-[50px] mb-[50px] text-blue-600'>Products List</h1>
                <Button onClick={handleToSaved} type='primary' size='large'>Saved Products {state.length ? `(${state.length})` : null}</Button>
            </div>
            <ul className='list-none flex flex-wrap justify-between px-[50px] gap-[20px]'>
                {isLoading ? <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'>
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="blue"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
                    : products.map((item, index) => (
                        <li className='relative border-[1px] border-blue-400 w-[30%] rounded-md h-[900px]' key={index}>
                            <img src={item.images[0]} alt="img" className='w-[100%] h-[50%] rounded-tl-md rounded-tr-md' />
                            <div className='p-[20px] flex flex-col items-center space-y-[15px] '>
                                <h2 className='text-center text-blue-700 text-[28px] '>{item.title}</h2>
                                <p className='font-semibold text-[30px] text-blue-800'>Category:{item.category.name}</p>
                                <p className='text-blue-900 text-[25px]'>Price : {item.price}</p>
                                <p className='text-justify text-blue-500'>{item.description}</p>
                            </div>
                            <Button icon={<SaveOutlined />} onClick={() => dispatch({ type: ACTIONS.SAVED, payload: item.id })} type='primary' className='block space-x-[5px] absolute right-[20px] bottom-[15px] font-semibold text-[14px]'>Save</Button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Home
