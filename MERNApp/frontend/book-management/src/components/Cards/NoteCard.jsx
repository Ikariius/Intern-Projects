import React, {useState, useEffect} from 'react';
import { MdCreate, MdDelete} from 'react-icons/md';
import { HiBookmark } from "react-icons/hi2";
import axiosInstance from '../../utils/axiosInstance';
import imagePlaceHolder from '../../assets/No-Image-Placeholder.svg'

const NoteCard = ({title, publishedYear, author, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/get-user');
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return ( 
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out '>
      <div className='flex items-center justify-between'>
        <div>
            <h6 className='text-sm font-bold'>{title}</h6>
            <span className='text-xs text-slate-500'>{publishedYear}</span>
        </div>

        <HiBookmark className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
      </div>

      <p className='text-xs text-slate-600 mt-2'>{author}</p>

      <img src={imagePlaceHolder} alt="Book cover" className="w-full h-auto my-4" />

      <div className='flex-1 my-2'>
        <p className='text-xs text-slate-600'>{content.slice(0, 60)}</p>
      </div>


      <div className='flex items-center justify-between mt-auto'>
      {/* <p className='text-xs text-slate-600 mt-2'>{content.slice(0,60)}</p> */}
        <div className='text-xs text-slate-500'>{tags.map((item)=>`#${item}`)}</div>
          <div>
            {userData && userData.role === 'admin' && (
              <div className="flex items-center gap-2">
                <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
              </div>
            )}
          </div>

      </div>
    </div>
  );
};

export default NoteCard;
