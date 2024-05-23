export const BlockInput = ({blockPosition, screen, input}) => {
  

  return (
    <div
      style={{
        position: 'absolute',
        left: `${
          screen.screenRefX + blockPosition.left -12
        }px`,
        top: `${
          screen.screenRefY + blockPosition.top + (blockPosition.hSize * input.position) -8
        }px`,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>

  )
}