import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegCircleXmark } from "react-icons/fa6";
import { Usercontext } from '../Context/Context';


const style = {
    position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
    width: 300,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 5,
};

export default function BasicModal() {
    const {setShow,show,final}=React.useContext(Usercontext)
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              
      >
              <Box sx={style}>
                  <FaRegCircleXmark className=' absolute top-2 left-2 font-bold text-3xl cursor-pointer' onClick={handleClose}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='flex justify-center absolute top-2 items-center left-12'>
          Preview of Recepiants
                  </Typography><hr className='border  border-b-gray-500'/>
                  
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {
                          final.map((e, i) => {
                              return <h1 className='text-md pb-1' key={i}>{ i+1}.{e}</h1>
                          })
                      }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}