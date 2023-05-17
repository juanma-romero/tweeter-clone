import { useSession } from "next-auth/react"
import Button from "./Button"
import ProfileImage from "./ProfileImage"
import { useLayoutEffect, useState, useRef, useCallback } from "react"


function updateTextAreaSize(textArea?:HTMLTextAreaElement) {
  if(textArea == null) return
  textArea.style.height = '0px'
  textArea.style.height = `${textArea.scrollHeight}px`
  
}

export default function NewTweetForm () {
  const sesssion =useSession()
  if (sesssion.status !== 'authenticated') return
  return <Form />
}

function Form () {

  const sesssion =useSession()
  const [InputValue, setInputValue] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>()
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea)
    textAreaRef.current = textArea
  }, [])

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current)      
  }, [InputValue])
  

  if(sesssion.status !== 'authenticated') return null

  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2 '>
        <div className='flex gap-4'>
            <ProfileImage src={sesssion.data.user.image} />
            <textarea 
              ref={inputRef}
              className='flex-grow resize-none overflow-hidden p-4 text-lg outline-none'
              placeholder='que pasa pa?'
              style={{height: 0}}
              value={InputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
        <Button className="self-end">
            Tweet
        </Button> 
    </form>
  )

}



