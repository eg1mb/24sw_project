'use client'

import {useState} from "react"
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react"

// backend 유저 정보
// 현재는 임의 정보 하드코딩
let name = "이름"
let weaknesses = ["약점 1", "약점 2", "약점 3", "정말로 왼쪽 정렬이 되었는지 확인하기 위한 내용"]

const Weakness = () => {
  // 모달 클릭 유무 저장
  const [isOpen, setIsOpen] = useState(false)

  // 클릭 시 모달 버튼 클릭 유무 설정 함수
  const clickModal = (event) => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex">
      <div className="w-1/4 h-1/3 rounded-md bg-[#1B4495] shadow-md text-white">
        <div className="static m-5">
          <p className="text-3xl font-bold text-left tracking-normal"> &#x1F44E; 나의 단점은?</p>
        </div>
        <div className="font-semibold tracking-normal">
          <p className="m-3 pl-4 text-lg">{name} 님은...</p>
          <ul>
          {
            weaknesses.map((a, i)=>{
              // 일정 개수의 단점만 보이도록 설정
              if(i < 3){
                return(
                  <li className="m-1 pl-6" key={i}>{a}</li>
                )
              } 
            })
          }
        </ul>
        </div>
        <div className="flex justify-end items-end p-4">
          <button type="button"
          className="w-[13%] h-[17%] rounded-md bg-white text-sm font-semibold tracking-normal text-[#1B4495]" 
          onClick={clickModal}>더보기</button>
        </div>
        {isOpen && <WeaknessModal clickModal={clickModal} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      </div>
    </div>
  )
}

const WeaknessModal = ({clickModal, isOpen, setIsOpen}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[72rem] h-[32rem] space-y-4 rounded-md bg-[#1B4495] p-12">
            <DialogTitle className="items-center justify-start text-3xl font-bold text-white">&#x1F44E; 나의 약점</DialogTitle>
            <ul className="items-center justify-start font-semibold tracking-normal text-white ml-2">{
              weaknesses.map((a, i)=>{
                return(
                  <li className="m-1" key={i}>{a}</li>
                )
            })}</ul>
            <div className="w-[67rem] h-[16rem] flex gap-4 justify-end items-end">
              <button type="button" className="w-[8%] h-[14%] rounded-md bg-white text-sm font-semibold tracking-normal text-[#1B4495]" onClick={clickModal}>닫기</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Weakness