import { useLayoutEffect, useState } from 'react'

const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState([0])
  useLayoutEffect(() => {
    const changeScrollView = () => {
      setScrollHeight([window.scrollY])
    }
    window.addEventListener('scroll', changeScrollView)
    changeScrollView();
    return () => window.removeEventListener('scroll', changeScrollView)
  }, [])
  return scrollHeight
}

export default useScrollHeight
