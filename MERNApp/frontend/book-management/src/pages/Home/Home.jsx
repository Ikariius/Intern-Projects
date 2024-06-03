import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import {MdAdd} from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allBooks, setAllBooks] = useState([]);

  const navigate = useNavigate();

  const handleEdit = (bookDetails) => {
    setOpenAddEditModal({isShown: true, data: bookDetails, type: "edit"});
  };

  //get user info

  const getUserInfo = async() => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate("login");
      }
    }
  };

  const getAllBooks = async () => {
    try{
      const response = await axiosInstance.get("/get-all-books");

      if(response.data && response.data.books){
        setAllBooks(response.data.books);
      }
    } catch(error){
      console.log("An unexpected error occurred. Please try again");
    }
  }

  useEffect(() => {
    getAllBooks();
    getUserInfo();
    return()=>{};
  }, []);

  return (
    <>
    <Navbar userInfo={userInfo} />

    <div className='container mx-auto'>
      <div className='grid grid-cols-1 gap-4 mt-8'>
        {allBooks.map((item, index) => (
          <NoteCard
            key={item._id}
            title={item.title}
            date=""
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => {}}
            onPinNote={() => {}}
          />          
        ))};
      </div>
    </div>
    
    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
    onClick={()=>{
      setOpenAddEditModal({isShown: true, type: "add", data: null});
    }}
    >
      <MdAdd className='text-[32px] text-white' />
    </button>

    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      }}
      contentLabel=''
      className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
    >
      <AddEditNotes
        type={openAddEditModal.type}
        bookData={openAddEditModal.data}
        onClose={()=>{setOpenAddEditModal({isShown: false, type: "add", data: null});}}
        getAllBooks={getAllBooks}
      />
    </Modal>
    </>
  );
};

export default Home;
