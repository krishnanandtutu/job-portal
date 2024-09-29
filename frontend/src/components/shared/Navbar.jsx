import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { setUser } from '@/redux/authSlice'

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <div><h1 className='text-2xl font-bold '>Job<span className='text-[#F83002]'>Portal</span></h1></div>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )


                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="rounded-xl">Login</Button></Link>
                                <Link to="/signup"> <Button className="bg-[#6A38c2] hover:bg-[#5b30a6] rounded-xl"> Signup</Button> </Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">

                                        {user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="name of user" /> : <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />}
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className=''>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar className="cursor-pointer h-7 w-7">
                                                {user?.profile?.profilePhoto ? <AvatarImage src={user?.profile?.profilePhoto} alt="name of user" /> : <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />}
                                            </Avatar>
                                            <div className='flex flex-col '>
                                                <h4 className='font-medium capitalize'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground capitalize'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role == 'student' && (
                                                    <div className='flex-w-fit items-center gap-2 cursor-pointer flex'>
                                                        <User2 />
                                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>



                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>


        </div>
    )
}

export default Navbar