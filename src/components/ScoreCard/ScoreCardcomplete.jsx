import React , {useState} from 'react';
import ScoreCard from './ScoreCard';
import Modal from "../Modal"

function ScoreCardcomplete() {
  const [isModalOpen , setIsModalOpen] = useState(false)
  const [content , setcontent ] = useState("내용입니다")

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  return (
      <div>
        <div onClick ={openModal}>
        <ScoreCard score={75} name="김민수" />
        <Modal isOpen={isModalOpen} onClose ={closeModal} contents= {content}/></div>
      </div>
    
  );
}

export default ScoreCardcomplete;