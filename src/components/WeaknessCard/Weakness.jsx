import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

// backend 유저 정보
let name = "이름"
let weaknesses = ["약점 1", "약점 2", "약점 3", "정말로 왼쪽 정렬이 되었는지 확인하기 위한 내용"]

const Weakness = () => {
  const [isOpen, setIsOpen] = useState(false)

  const clickModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex">
      <div className="w-full max-w-[400px] h-full max-h-[250px] rounded-md bg-[#1B4495] shadow-md text-white">
        <div className="static m-5">
          <p className="text-3xl font-bold text-left tracking-normal"> &#x1F44E; 나의 단점은?</p>
        </div>
        <div className="font-semibold tracking-normal">
          <p className="m-3 pl-4 text-lg">{name} 님은...</p>
          <ul>
            {weaknesses.map((a, i) => {
              if (i < 3) {
                return (
                  <li className="m-1 pl-6" key={i}>{a}</li>
                )
              }
              return null;
            })}
          </ul>
        </div>
        <div className="flex justify-end items-end p-4">
          <button
            type="button"
            className="w-[13%] h-[17%] rounded-md bg-white text-sm font-semibold tracking-normal text-[#1B4495]"
            onClick={clickModal}
          >
            더보기
          </button>
        </div>
        {isOpen && <WeaknessModal clickModal={clickModal} isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </div>
  )
}

const WeaknessModal = ({ clickModal, isOpen, setIsOpen }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full h-full max-w-[350px] max-h-[200px] rounded-md bg-[#1B4495] p-12">
            <DialogTitle className="text-3xl font-bold text-white">&#x1F44E; 나의 약점</DialogTitle>
            <ul className="font-semibold tracking-normal text-white ml-2">
              {weaknesses.map((a, i) => (
                <li className="m-1" key={i}>{a}</li>
              ))}
            </ul>
            <div className="flex justify-end items-end">
              <button
                type="button"
                className="w-[8%] h-[14%] rounded-md bg-white text-sm font-semibold tracking-normal text-[#1B4495]"
                onClick={clickModal}
              >
                닫기
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Weakness