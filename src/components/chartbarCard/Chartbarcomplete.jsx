import React , {useState} from 'react';
import Chartbar from "./Chartbar"
import Modal from "../Modal"

function ScoreCardcomplete() {
  const [isModalOpen , setIsModalOpen] = useState(false)
  const [content , setcontent ] = useState("내용입니다")
  const[prData , setprData] = useState([
    { label: '나의 발화 속도', value: 100 },
    { label: '나의 발화 목소리 크기', value: 70 },
    { label: '나의 발화 전달력', value: 40 },
  ])
  

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  return (
      <div>
        <div onClick ={openModal}>
        <Chartbar prData = {prData} />
        <Modal isOpen={isModalOpen} onClose ={closeModal} contents= {content}/></div>
      </div>
    
  );
}

export default ScoreCardcomplete;