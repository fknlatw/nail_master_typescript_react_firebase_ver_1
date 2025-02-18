export const handleError = (
  text: string, 
  func: (error: string) => void, 
  dur: number = 3000
) => {
    func(text);
    return setTimeout(()=>{
      func("");
    }, dur);
}